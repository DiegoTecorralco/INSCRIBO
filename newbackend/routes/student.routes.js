import express from 'express';
import {
  getAllStudents,
  getStudentByMatricula,
  getStudentsByGroup,
  createNewStudent,
  updateStudentByMatricula
} from '../controller/student.controller.js';

const studentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Endpoints para la gestión de estudiantes
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de todos los estudiantes
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
 *                     example: "Carlos"
 *                   lastname:
 *                     type: string
 *                     example: "Pérez"
 *                   matricula:
 *                     type: string
 *                     example: "201800123"
 *                   cuatrimestre:
 *                     type: integer
 *                     example: 3
 *                   grupo:
 *                     type: string
 *                     example: "A"
 *       500:
 *         description: Error al obtener los estudiantes
 */
studentRouter.get('/', getAllStudents);

/**
 * @swagger
 * /api/students/{matricula}:
 *   get:
 *     summary: Obtener un estudiante por matrícula
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula del estudiante a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante encontrado
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
 *                   example: "Carlos"
 *                 lastname:
 *                   type: string
 *                   example: "Pérez"
 *                 matricula:
 *                   type: string
 *                   example: "201800123"
 *                 cuatrimestre:
 *                   type: integer
 *                   example: 3
 *                 grupo:
 *                   type: string
 *                   example: "A"
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al obtener el estudiante
 */
studentRouter.get('/:matricula', getStudentByMatricula);

/**
 * @swagger
 * /api/students/group:
 *   get:
 *     summary: Obtener estudiantes por cuatrimestre y grupo
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: cuatrimestre
 *         required: true
 *         description: Cuatrimestre del estudiante
 *         schema:
 *           type: integer
 *       - in: query
 *         name: grupo
 *         required: true
 *         description: Grupo del estudiante
 *         schema:
 *           type: string
 *           enum: [A, B, C]
 *     responses:
 *       200:
 *         description: Lista de estudiantes del grupo y cuatrimestre
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
 *                     example: "Carlos"
 *                   lastname:
 *                     type: string
 *                     example: "Pérez"
 *                   matricula:
 *                     type: string
 *                     example: "201800123"
 *       400:
 *         description: Parámetros de búsqueda incorrectos
 *       500:
 *         description: Error al buscar los estudiantes
 */
studentRouter.get('/group', getStudentsByGroup);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
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
 *               - cuatrimestre
 *               - grupo
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos"
 *               lastname:
 *                 type: string
 *                 example: "Pérez"
 *               matricula:
 *                 type: string
 *                 example: "201800123"
 *               cuatrimestre:
 *                 type: integer
 *                 example: 3
 *               grupo:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
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
 *                   example: "Carlos"
 *                 lastname:
 *                   type: string
 *                   example: "Pérez"
 *                 matricula:
 *                   type: string
 *                   example: "201800123"
 *       400:
 *         description: Error al crear el estudiante o datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
studentRouter.post('/', createNewStudent);

/**
 * @swagger
 * /api/students/{matricula}:
 *   put:
 *     summary: Actualizar los datos de un estudiante por matrícula
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula del estudiante a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos"
 *               lastname:
 *                 type: string
 *                 example: "Pérez"
 *               cuatrimestre:
 *                 type: integer
 *                 example: 3
 *               grupo:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *       400:
 *         description: Error al actualizar el estudiante o datos inválidos
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */
studentRouter.put('/:matricula', updateStudentByMatricula);

export default studentRouter;
