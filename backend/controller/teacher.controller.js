import { encryptData, decryptData } from '../utils/crypto.util.js';
import {
    allTeacher,
    oneTeacher,
    createTeacher as createTeacherDAO // Renombramos para claridad
} from '../dao/teachers.dao.js';

export const createTeachers = async (req, res) => {
    try {
        const { name, lastname, matricula, password } = req.body;

        // Validaciones básicas
        if (!name || !lastname || !matricula || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Encriptar solo la contraseña
        const encryptedPassword = encryptData(password);

        // Usar la función del DAO (correcto)
        const newTeacher = await createTeacherDAO({
            name,
            lastname,
            matricula,
            password: encryptedPassword
        });

        // No devolver la contraseña en la respuesta
        const teacherResponse = {
            _id: newTeacher._id,
            name: newTeacher.name,
            lastname: newTeacher.lastname,
            matricula: newTeacher.matricula,
            createdAt: newTeacher.createdAt
        };

        res.status(201).json({
            message: 'Docente creado exitosamente',
            teacher: teacherResponse
        });

    } catch (error) {
        console.error('Error al crear docente:', error);
        
        if (error.code === 11000) { // Error de duplicado en MongoDB
            return res.status(400).json({ error: 'La matrícula ya está registrada' });
        }
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Las otras funciones (getAllTeachers y getTeacherById) deben usar también las funciones del DAO
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await allTeacher(); // Usar la función del DAO
        
        const safeTeachers = teachers.map(teacher => ({
            _id: teacher._id,
            name: teacher.name,
            lastname: teacher.lastname,
            matricula: teacher.matricula,
            createdAt: teacher.createdAt
        }));

        res.status(200).json(safeTeachers);

    } catch (error) {
        console.error('Error al obtener docentes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getTeacherById = async (req, res) => {
    try {
        const teacher = await oneTeacher(req.params.id); // Usar la función del DAO
        
        if (!teacher) {
            return res.status(404).json({ error: 'Docente no encontrado' });
        }

        res.status(200).json({
            _id: teacher._id,
            name: teacher.name,
            lastname: teacher.lastname,
            matricula: teacher.matricula,
            createdAt: teacher.createdAt
        });

    } catch (error) {
        console.error('Error al obtener docente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};