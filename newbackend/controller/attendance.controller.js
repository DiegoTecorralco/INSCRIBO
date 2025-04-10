import * as AttendanceDAO from '../dao/attendance.dao.js';
import { getSocketInstance } from '../socket.js';
import moment from 'moment-timezone';
import Attendance from '../models/Attendance.js';
import Teacher from '../models/Teachers.js';
import Schedule from '../models/Schedule.js';
import Class from '../models/Class.js';
import Student from '../models/Student.js';

const createNewAttendance = async (req, res) => {
  try {
    const { matricula } = req.params;

    // 1. Obtener día y hora actual en zona horaria de México
    const now = moment().tz("America/Mexico_City");
    const currentDay = now.format('dddd'); // Ej: "Wednesday"
    const currentTime = now.format('HH:mm');

    // Convertir a español si es necesario
    const daysMap = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes'
    };
    const dia = daysMap[currentDay];

    // 2. Buscar al maestro por matrícula
    const teacher = await Teacher.findOne({ matricula });
    if (!teacher) return res.status(404).json({ error: 'Maestro no encontrado' });

    // 3. Buscar todos los horarios de ese día
    const schedules = await Schedule.find({ day: dia })
      .populate({
        path: 'class',
        populate: ['teacher', 'subject']
      })
      .exec();

    // 4. Verificar si el maestro tiene clase a esa hora
    const activeSchedule = schedules.find(schedule => {
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const nowMinutes = now.hours() * 60 + now.minutes();

      return (
        String(schedule.class.teacher._id) === String(teacher._id) &&
        nowMinutes >= startMinutes && nowMinutes <= endMinutes
      );
    });

    if (!activeSchedule) {
      return res.status(400).json({ error: 'No hay clase activa para el maestro en este horario' });
    }

    const clase = activeSchedule.class;

    // 5. Obtener los alumnos de esa clase
    const students = await Student.find({ cuatrimestre: clase.cuatrimestre, grupo: clase.grupo }).exec();

    // 6. Preparar los registros de asistencia
    const records = students.map(student => ({
      student: student._id,
      status: 'Falta' // por defecto
    }));

    // 7. Crear asistencia
    const newAttendance = new Attendance({
      class: clase._id,
      teacher: teacher._id,
      date: now.startOf('day').toDate(),
      records
    });

    await newAttendance.save();

    // Emitir evento socket
    const io = getSocketInstance();
    io.emit('asistencia-creada', newAttendance);

    res.status(201).json(newAttendance);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error al crear asistencia', details: err.message });
  }
};

const updateStudentAttendance = async (req, res) => {
  try {
    const { attendanceId, studentId } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ error: 'Asistencia no encontrada' });

    const record = attendance.records.find(r => String(r.student) === studentId);
    if (!record) return res.status(404).json({ error: 'Alumno no encontrado en esta asistencia' });

    record.status = status;
    await attendance.save();

    const io = getSocketInstance();
    io.emit('asistencia-actualizada', { attendanceId, studentId, status });

    res.json({ success: true, record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar asistencia', details: err.message });
  }
};

const updateAttendanceFromRFID = async (req, res) => {
  try {
    const { matricula } = req.params;

    const now = moment().tz("America/Mexico_City");
    const currentDay = now.format('dddd');
    const currentTime = now.format('HH:mm');

    const daysMap = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes'
    };
    const dia = daysMap[currentDay];

    const student = await Student.findOne({ matricula });
    if (!student) return res.status(404).json({ error: 'Alumno no encontrado' });

    const schedules = await Schedule.find({ day: dia })
      .populate({
        path: 'class',
        populate: ['teacher', 'subject']
      }).exec();

    const nowMinutes = now.hours() * 60 + now.minutes();

    const activeSchedule = schedules.find(schedule => {
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      const clase = schedule.class;
      return (
        student.cuatrimestre === clase.cuatrimestre &&
        student.grupo === clase.grupo &&
        nowMinutes >= startMinutes &&
        nowMinutes <= endMinutes
      );
    });

    if (!activeSchedule) {
      return res.status(404).json({ error: 'El alumno no tiene clase activa en este horario' });
    }

    const clase = activeSchedule.class;
    const today = now.startOf('day').toDate();

    let attendance = await Attendance.findOne({ class: clase._id, date: today });

    // Si no existe el pase de lista, crearlo automáticamente con todos los alumnos de la clase
    if (!attendance) {
      const studentsInClass = await Student.find({
        cuatrimestre: clase.cuatrimestre,
        grupo: clase.grupo
      }).exec();

      const records = studentsInClass.map(s => ({
        student: s._id,
        status: String(s._id) === String(student._id) ? 'Asistencia' : 'Falta'
      }));

      attendance = new Attendance({
        class: clase._id,
        teacher: clase.teacher._id,
        date: today,
        records
      });

      await attendance.save();

      // Emitir evento nuevo pase de lista
      const io = getSocketInstance();
      io.emit('asistencia-creada', attendance);

      return res.status(201).json({ success: true, message: 'Pase de lista creado y asistencia registrada', attendanceId: attendance._id });
    }

    // Si ya existe, solo actualiza el estado del alumno
    const record = attendance.records.find(r => String(r.student) === String(student._id));
    if (!record) {
      return res.status(404).json({ error: 'El alumno no está en este pase de lista' });
    }

    // Cálculo de los minutos de retraso
    const [startHour, startMin] = activeSchedule.startTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const minutesLate = nowMinutes - startMinutes;

    // Asignar estado basado en el tiempo de retraso
    if (minutesLate <= 5) {
      record.status = 'Asistencia';
    } else if (minutesLate <= 10) {
      record.status = 'Retardo';
    } else {
      record.status = 'Falta';
    }

    await attendance.save();

    const io = getSocketInstance();
    io.emit('asistencia-actualizada', {
      attendanceId: attendance._id,
      studentId: student._id,
      status: record.status
    });

    res.status(200).json({ success: true, message: 'Asistencia actualizada', status: record.status, attendanceId: attendance._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar asistencia', details: err.message });
  }
};


const getAllAttendance = async (req, res) => {
  try {
    const attendance = await AttendanceDAO.allAttendance();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener registros de asistencia', details: err.message });
  }
};

const getAttendanceByDate = async (req, res) => {
  try {
    const { classId, date } = req.query;

    if (!classId || !date) {
      return res.status(400).json({ message: 'classId y date son requeridos en query params' });
    }

    const result = await AttendanceDAO.attendanceByDate(classId, date);
    if (!result) {
      return res.status(404).json({ message: 'No se encontró asistencia para esa clase y fecha' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar asistencia', details: err.message });
  }
};


const updateAttendanceStatus = async (req, res) => {
  try {
    const { attendanceId, studentId, status } = req.body;

    if (!attendanceId || !studentId || !status) {
      return res.status(400).json({ message: 'attendanceId, studentId y status son requeridos' });
    }

    const updated = await AttendanceDAO.updateAttendanceRecord(attendanceId, studentId, status);
    if (!updated) {
      return res.status(404).json({ message: 'Registro de asistencia no encontrado o sin cambios' });
    }

    // Emitir evento para actualizar la UI en tiempo real
    const io = getSocketInstance();
    io.emit('asistencia-actualizada', { attendanceId, studentId, status });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar estado de asistencia', details: err.message });
  }
};

export {
  getAllAttendance,
  getAttendanceByDate,
  createNewAttendance,
  updateAttendanceStatus,
  updateStudentAttendance,
  updateAttendanceFromRFID
};
