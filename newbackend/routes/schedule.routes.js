import express from 'express';
import * as ScheduleController from '../controller/schedule.controller.js';

const schedulesRouter = express.Router();

// Ruta para obtener todos los horarios
schedulesRouter.get('/schedules', ScheduleController.getAllSchedules);

// Ruta para obtener el horario por día
schedulesRouter.get('/schedules/:day', ScheduleController.getScheduleByDay);

// Ruta para crear un nuevo horario
schedulesRouter.post('/schedules', ScheduleController.createNewSchedule);

export default schedulesRouter;
