import express from 'express';
import * as ScheduleController from '../controller/schedule.controller.js';

const schedulesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Horarios
 *   description: Endpoints para la gestión de horarios
 */

/**
 * @swagger
 * /api/schedule:
 *   get:
 *     summary: Obtener todos los horarios
 *     tags: [Horarios]
 *     responses:
 *       200:
 *         description: Lista de todos los horarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64df2ab8f9e21a..."
 *                   class:
 *                     type: string
 *                     example: "64df2ab8f9e21a..."
 *                   day:
 *                     type: string
 *                     example: "Lunes"
 *                   time:
 *                     type: string
 *                     example: "08:00 - 10:00"
 *       500:
 *         description: Error al obtener los horarios
 */
schedulesRouter.get('/', ScheduleController.getAllSchedules);

/**
 * @swagger
 * /api/schedule/{day}:
 *   get:
 *     summary: Obtener el horario por día
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: day
 *         required: true
 *         description: Día de la semana para obtener los horarios (por ejemplo, "Lunes")
 *         schema:
 *           type: string
 *           example: "Lunes"
 *     responses:
 *       200:
 *         description: Horarios del día solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64df2ab8f9e21a..."
 *                   class:
 *                     type: string
 *                     example: "64df2ab8f9e21a..."
 *                   day:
 *                     type: string
 *                     example: "Lunes"
 *                   time:
 *                     type: string
 *                     example: "08:00 - 10:00"
 *       404:
 *         description: No se encontraron horarios para el día especificado
 *       500:
 *         description: Error al obtener los horarios por día
 */
schedulesRouter.get('/:day', ScheduleController.getScheduleByDay);

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Crear un nuevo horario
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - class
 *               - day
 *               - time
 *             properties:
 *               class:
 *                 type: string
 *                 example: "64df2ab8f9e21a..."
 *               day:
 *                 type: string
 *                 example: "Lunes"
 *               time:
 *                 type: string
 *                 example: "08:00 - 10:00"
 *     responses:
 *       201:
 *         description: Horario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64df2ab8f9e21a..."
 *                 class:
 *                   type: string
 *                   example: "64df2ab8f9e21a..."
 *                 day:
 *                   type: string
 *                   example: "Lunes"
 *                 time:
 *                   type: string
 *                   example: "08:00 - 10:00"
 *       400:
 *         description: Datos inválidos al crear el horario
 *       500:
 *         description: Error al crear el horario
 */
schedulesRouter.post('/', ScheduleController.createNewSchedule);

export default schedulesRouter;
