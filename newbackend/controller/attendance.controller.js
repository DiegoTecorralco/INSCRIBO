import * as AttendanceDAO from '../daos/AttendanceDAO.js';
import { getSocketInstance } from '../socket.js';

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

const createNewAttendance = async (req, res) => {
  try {
    const newAttendance = await AttendanceDAO.createAttendance(req.body);

    // Emitir evento por sockets al frontend para actualizar datos en tiempo real
    const io = getSocketInstance();
    io.emit('asistencia-creada', newAttendance);

    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear asistencia', details: err.message });
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
  updateAttendanceStatus
};
