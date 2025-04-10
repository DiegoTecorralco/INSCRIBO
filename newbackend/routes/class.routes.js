import express from 'express';
import { 
  getAllClasses, 
  getClassById, 
  createNewClass, 
  getClassesByTeacherMatricula 
} from '../controller/class.controller.js';

const classesrouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Endpoints para la gestión de clases
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Obtener todas las clases
 *     tags: [Clases]
 *     responses:
 *       200:
 *         description: Lista de todas las clases
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
 *                   subject:
 *                     type: string
 *                     example: "Matemáticas"
 *                   teacherMatricula:
 *                     type: string
 *                     example: "123456"
 *                   cuatrimestre:
 *                     type: integer
 *                     example: 3
 *                   grupo:
 *                     type: string
 *                     example: "A"
 *       500:
 *         description: Error al obtener las clases
 */
classesrouter.get('/', getAllClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Obtener una clase por su ID
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la clase a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clase encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64df2ab8f9e21a..."
 *                 subject:
 *                   type: string
 *                   example: "Matemáticas"
 *                 teacherMatricula:
 *                   type: string
 *                   example: "123456"
 *                 cuatrimestre:
 *                   type: integer
 *                   example: 3
 *                 grupo:
 *                   type: string
 *                   example: "A"
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error al obtener la clase
 */
classesrouter.get('/:id', getClassById);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Crear una nueva clase
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - teacherMatricula
 *               - cuatrimestre
 *               - grupo
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Matemáticas"
 *               teacherMatricula:
 *                 type: string
 *                 example: "123456"
 *               cuatrimestre:
 *                 type: integer
 *                 example: 3
 *               grupo:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Clase creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64df2ab8f9e21a..."
 *                 subject:
 *                   type: string
 *                   example: "Matemáticas"
 *                 teacherMatricula:
 *                   type: string
 *                   example: "123456"
 *                 cuatrimestre:
 *                   type: integer
 *                   example: 3
 *                 grupo:
 *                   type: string
 *                   example: "A"
 *       400:
 *         description: Datos inválidos al crear la clase
 *       500:
 *         description: Error interno del servidor
 */
classesrouter.post('/', createNewClass);

/**
 * @swagger
 * /api/classes/teacher/{teacherMatricula}:
 *   get:
 *     summary: Obtener las clases de un maestro por su matrícula
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: teacherMatricula
 *         required: true
 *         description: Matrícula del maestro para obtener sus clases
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de clases del maestro
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
 *                   subject:
 *                     type: string
 *                     example: "Matemáticas"
 *                   teacherMatricula:
 *                     type: string
 *                     example: "123456"
 *                   cuatrimestre:
 *                     type: integer
 *                     example: 3
 *                   grupo:
 *                     type: string
 *                     example: "A"
 *       404:
 *         description: Maestro no encontrado o no tiene clases asignadas
 *       500:
 *         description: Error al obtener las clases del maestro
 */
classesrouter.get('/teacher/:teacherMatricula', getClassesByTeacherMatricula);

export default classesrouter;
