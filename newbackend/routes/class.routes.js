import express from 'express';
import { 
  getAllClasses, 
  getClassById, 
  createNewClass, 
  getClassesByTeacherMatricula 
} from '../controller/class.controller.js';

const classesrouter = express.Router();

// Ruta para obtener todas las clases
classesrouter.get('/', getAllClasses);

// Ruta para obtener una clase por su ID
classesrouter.get('/:id', getClassById);

// Ruta para crear una nueva clase
classesrouter.post('/', createNewClass);

// Ruta para obtener las clases de un maestro por su matrícula
classesrouter.get('/teacher/:teacherMatricula', getClassesByTeacherMatricula);

export default classesrouter;
