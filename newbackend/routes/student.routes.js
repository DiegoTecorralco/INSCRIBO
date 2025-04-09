import express from 'express';
import {
  getAllStudents,
  getStudentByMatricula,
  getStudentsByGroup,
  createNewStudent,
  updateStudentByMatricula
} from '../controller/student.controller.js';  // Asegúrate de que la ruta sea correcta

const studentRouter = express.Router();

// Ruta para obtener todos los estudiantes
studentRouter.get('/', getAllStudents);

// Ruta para obtener un estudiante por matrícula
studentRouter.get('/:matricula', getStudentByMatricula);

// Ruta para obtener estudiantes por cuatrimestre y grupo
studentRouter.get('/group', getStudentsByGroup);

// Ruta para crear un nuevo estudiante
studentRouter.post('/', createNewStudent);

// Ruta para actualizar un estudiante por matrícula
studentRouter.put('/:matricula', updateStudentByMatricula);

export default studentRouter;
