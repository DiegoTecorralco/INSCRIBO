import express from 'express';
import * as SubjectController from '../controller/subject.controller.js';

const subjectRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Endpoints para la gestión de materias
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Obtener todas las materias
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de todas las materias
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
 *                     example: "Matemáticas"
 *       500:
 *         description: Error al obtener las materias
 */
subjectRouter.get('/', SubjectController.getAllSubjects);

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Crear una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Física"
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
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
 *                   example: "Física"
 *       400:
 *         description: Error al crear la materia o nombre vacío
 *       500:
 *         description: Error interno del servidor
 */
subjectRouter.post('/', SubjectController.createNewSubject);

export default subjectRouter;
