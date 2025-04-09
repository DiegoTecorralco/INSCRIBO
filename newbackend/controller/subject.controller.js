import * as SubjectDAO from '../dao/subject.dao.js';

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await SubjectDAO.allSubjects();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las materias', details: err.message });
  }
};

const createNewSubject = async (req, res) => {
  try {
    const { name } = req.body;

    // Validación para asegurarse de que el nombre no esté vacío
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre de la materia es obligatorio y no puede estar vacío.' });
    }

    const newSubject = await SubjectDAO.createSubject(req.body);
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la materia', details: err.message });
  }
};

export {
  getAllSubjects,
  createNewSubject
};
