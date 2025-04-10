import express from 'express';
import * as ScheduleController from '../controller/schedule.controller.js';

const schedulesRouter = express.Router();

// Ruta para obtener todos los horarios
schedulesRouter.get('/', ScheduleController.getAllSchedules);

// Ruta para obtener el horario por día
schedulesRouter.get('/:day', ScheduleController.getScheduleByDay);

// Ruta para crear un nuevo horario
schedulesRouter.post('/', ScheduleController.createNewSchedule);

export default schedulesRouter;
