import * as ClassDAO from '../dao/class.dao.js';
import *as TeacherDAO from '../dao/teachers.dao.js'
const getAllClasses = async (req, res) => {
  try {
    const classes = await ClassDAO.allClasses();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clases', details: err.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classData = await ClassDAO.classById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    res.status(200).json(classData);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar clase', details: err.message });
  }
};

const createNewClass = async (req, res) => {
  try {
    const { subject, teacherMatricula, cuatrimestre, grupo } = req.body;

    // Validación para asegurarse de que los campos no estén vacíos
    if (!subject || !teacherMatricula || !cuatrimestre || !grupo) {
      return res.status(400).json({ error: 'Todos los campos (subject, teacherMatricula, cuatrimestre, grupo) son obligatorios.' });
    }

    // Validación para el cuatrimestre (debe ser un número)
    if (typeof cuatrimestre !== 'number' || cuatrimestre <= 0) {
      return res.status(400).json({ error: 'El cuatrimestre debe ser un número positivo.' });
    }

    // Validación para el grupo (debe ser uno de los valores permitidos)
    if (!['A', 'B', 'C'].includes(grupo)) {
      return res.status(400).json({ error: 'El grupo debe ser uno de los siguientes: A, B, C.' });
    }

    // Buscar al maestro por su matrícula
    const teacher = await TeacherDAO.oneTeacher(teacherMatricula);

    // Validación para asegurarse de que el maestro exista
    if (!teacher) {
      return res.status(400).json({ error: 'No se encontró un maestro con esa matrícula.' });
    }

    // Crear nueva clase
    const newClass = await ClassDAO.createClass({
      subject,
      teacher: teacher._id,  // Usamos el ObjectId del maestro
      teacherMatricula,      // También guardamos la matrícula del maestro
      cuatrimestre,
      grupo
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear clase', details: err.message });
  }
};


const getClassesByTeacherMatricula = async (req, res) => {
  try {
    const teacherMatricula = req.params.matricula; // Recibe la matrícula del maestro desde los parámetros de la URL

    // Verifica si el maestro con la matrícula existe
    const teacher = await TeacherDAO.oneTeacher(teacherMatricula);
    if (!teacher) {
      return res.status(404).json({ error: 'Maestro no encontrado con esa matrícula.' });
    }

    // Ahora obtenemos todas las clases donde el maestro está asignado
    const classes = await ClassDAO.classesByTeacher(teacher._id); // Aquí usamos el _id del maestro para filtrar las clases

    // Retornamos las clases del maestro
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clases del maestro', details: err.message });
  }
};


export {
  getAllClasses,
  getClassById,
  createNewClass,
  getClassesByTeacherMatricula
};
