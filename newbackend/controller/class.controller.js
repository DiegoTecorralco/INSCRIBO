import * as ClassDAO from '../daos/ClassDAO.js';

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
    const newClass = await ClassDAO.createClass(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear clase', details: err.message });
  }
};

const getClassesByTeacher = async (req, res) => {
  try {
    const classes = await ClassDAO.classesByTeacher(req.params.teacherId);
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clases del maestro', details: err.message });
  }
};

export {
  getAllClasses,
  getClassById,
  createNewClass,
  getClassesByTeacher
};
