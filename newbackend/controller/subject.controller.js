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
