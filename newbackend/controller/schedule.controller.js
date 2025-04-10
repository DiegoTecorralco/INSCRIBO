import * as ScheduleDAO from '../dao/schedule.dao.js';
import { classById } from '../dao/class.dao.js'; 

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await ScheduleDAO.allSchedules();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener horarios', details: err.message });
  }
};

const getScheduleByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const schedules = await ScheduleDAO.scheduleByDay(day);
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener horario por día', details: err.message });
  }
};


import Class from '../models/Class.js'; // o donde tengas tu modelo de Class

const createNewSchedule = async (req, res) => {
  try {
    const classId = req.body.class;

    // Validamos que el ID de la clase exista en la colección
    const existingClass = await Class.findById(classId);

    if (!existingClass) {
      return res.status(404).json({ 
        error: 'La clase con el ID proporcionado no existe' 
      });
    }

    // Si la clase existe, creamos el nuevo horario
    const newSchedule = await ScheduleDAO.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (let field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }

      return res.status(400).json({
        error: 'Error de validación al crear horario',
        details: validationErrors
      });
    }

    res.status(400).json({ 
      error: 'Error al crear horario', 
      details: err.message 
    });
  }
};

export {
  getAllSchedules,
  getScheduleByDay,
  createNewSchedule
};
