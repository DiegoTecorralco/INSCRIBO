import * as ScheduleDAO from '../dao/schedule.dao.js';

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

const createNewSchedule = async (req, res) => {
  try {
    const newSchedule = await ScheduleDAO.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear horario', details: err.message });
  }
};

export {
  getAllSchedules,
  getScheduleByDay,
  createNewSchedule
};
