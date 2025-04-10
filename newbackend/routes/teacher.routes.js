import express from 'express';
import {
  createTeachers,
  getAllTeachers,
  getTeacherById
} from '../controller/teacher.controller.js';

const teachersRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Docentes
 *   description: Endpoints para la gestión de docentes
 */

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Crear un nuevo docente
 *     tags: [Docentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - matricula
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               lastname:
 *                 type: string
 *                 example: "García"
 *               matricula:
 *                 type: string
 *                 example: "12345"
 *               password:
 *                 type: string
 *                 example: "secreta123"
 *     responses:
 *       201:
 *         description: Docente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Docente creado exitosamente"
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64df2ab8f9e21a..."
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     lastname:
 *                       type: string
 *                       example: "García"
 *                     matricula:
 *                       type: string
 *                       example: "12345"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-09T12:00:00Z"
 *       400:
 *         description: Error de validación o matrícula duplicada
 *       500:
 *         description: Error interno del servidor
 */
teachersRoutes.post('/', createTeachers);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docentes]
 *     responses:
 *       200:
 *         description: Lista de docentes
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
 *                   name:
 *                     type: string
 *                     example: "Carlos López"
 *                   lastname:
 *                     type: string
 *                     example: "López"
 *                   matricula:
 *                     type: string
 *                     example: "54321"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-09T12:00:00Z"
 *       500:
 *         description: Error interno del servidor
 */
teachersRoutes.get('/', getAllTeachers);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Obtener un docente por ID
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del docente
 *     responses:
 *       200:
 *         description: Datos del docente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64df2ab8f9e21a..."
 *                 name:
 *                   type: string
 *                   example: "Ana García"
 *                 lastname:
 *                   type: string
 *                   example: "García"
 *                 matricula:
 *                   type: string
 *                   example: "12345"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-04-09T12:00:00Z"
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
teachersRoutes.get('/:id', getTeacherById);

export default teachersRoutes;
