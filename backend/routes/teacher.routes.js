import express from 'express';
import {
    createTeachers,
    getAllTeachers,
    getTeacherById
} from '../controller/teacher.controller.js';

const teachersRoutes = express.Router();

teachersRoutes.post('/', createTeachers);
teachersRoutes.get('/', getAllTeachers);
teachersRoutes.get('/:id', getTeacherById);

export default teachersRoutes;