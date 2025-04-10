import express from 'express';
import {
  getAllAttendance,
  getAttendanceByDate,
  createNewAttendance,
  updateStudentAttendance,
  updateAttendanceStatus,
  updateAttendanceFromRFID
} from '../controller/attendance.controller.js';

const attendanceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asistencia
 *   description: Endpoints para la gestión de registros de asistencia
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Obtener todos los registros de asistencia
 *     tags: [Asistencia]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de asistencia
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
 *                   matriculaMaestro:
 *                     type: string
 *                     example: "201800123"
 *                   fecha:
 *                     type: string
 *                     example: "2025-04-09"
 *                   estado:
 *                     type: string
 *                     example: "Asistencia"
 *       500:
 *         description: Error al obtener los registros de asistencia
 */
attendanceRouter.get('/', getAllAttendance);

/**
 * @swagger
 * /api/attendance/by-date:
 *   get:
 *     summary: Obtener registros de asistencia por fecha y clase
 *     tags: [Asistencia]
 *     parameters:
 *       - in: query
 *         name: classId
 *         required: true
 *         description: ID de la clase para filtrar los registros
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         description: Fecha de la clase
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de registros de asistencia filtrados por clase y fecha
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
 *                   matriculaMaestro:
 *                     type: string
 *                     example: "201800123"
 *                   estado:
 *                     type: string
 *                     example: "Asistencia"
 *       400:
 *         description: Parámetros faltantes en la consulta
 *       404:
 *         description: No se encontraron registros para esa clase y fecha
 *       500:
 *         description: Error al obtener los registros
 */
attendanceRouter.get('/by-date', getAttendanceByDate);

/**
 * @swagger
 * /api/attendance/{matricula}:
 *   post:
 *     summary: Crear un nuevo registro de asistencia para un maestro
 *     tags: [Asistencia]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula del maestro
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Asistencia creada exitosamente
 *       400:
 *         description: No hay clase activa para el maestro en este horario
 *       404:
 *         description: Maestro no encontrado
 *       500:
 *         description: Error al crear el registro de asistencia
 */
attendanceRouter.post('/:matricula', createNewAttendance);

/**
 * @swagger
 * /api/attendance/update-status:
 *   put:
 *     summary: Actualizar el estado de asistencia de un estudiante
 *     tags: [Asistencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attendanceId:
 *                 type: string
 *               studentId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Asistencia, Retardo, Falta]
 *     responses:
 *       200:
 *         description: Estado de asistencia actualizado correctamente
 *       400:
 *         description: Faltan parámetros requeridos
 *       404:
 *         description: No se encontró el registro de asistencia o el estudiante
 *       500:
 *         description: Error al actualizar el estado de asistencia
 */
attendanceRouter.put('/update-status', updateAttendanceStatus);

/**
 * @swagger
 * /api/attendance/{attendanceId}/students/{studentId}:
 *   put:
 *     summary: Actualizar la asistencia de un estudiante en un registro específico
 *     tags: [Asistencia]
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         description: ID del registro de asistencia
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID del estudiante
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Asistencia, Retardo, Falta]
 *     responses:
 *       200:
 *         description: Asistencia del estudiante actualizada correctamente
 *       400:
 *         description: Faltan parámetros requeridos
 *       404:
 *         description: No se encontró el registro de asistencia o el estudiante
 *       500:
 *         description: Error al actualizar la asistencia del estudiante
 */
attendanceRouter.put('/:attendanceId/students/:studentId', updateStudentAttendance);

/**
 * @swagger
 * /api/attendance/rfid/{matricula}:
 *   put:
 *     summary: Actualizar la asistencia de un estudiante mediante RFID
 *     tags: [Asistencia]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula del estudiante para registrar su asistencia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia del estudiante registrada exitosamente
 *       404:
 *         description: Estudiante no encontrado o no tiene clase activa en este horario
 *       500:
 *         description: Error al registrar la asistencia mediante RFID
 */
attendanceRouter.put('/rfid/:matricula', updateAttendanceFromRFID);

export default attendanceRouter;
