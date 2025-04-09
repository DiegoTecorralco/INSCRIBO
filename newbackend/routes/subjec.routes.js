import express from 'express';
import * as SubjectController from '../controller/subject.controller.js';

const subjectRouter = express.Router();

// Ruta para obtener todas las materias
subjectRouter.get('/subjects', SubjectController.getAllSubjects);

// Ruta para crear una nueva materia
subjectRouter.post('/subjects', SubjectController.createNewSubject);

export default subjectRouter;
