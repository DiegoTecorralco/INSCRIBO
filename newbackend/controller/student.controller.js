import * as StudentDAO from '../daos/StudentDAO.js';

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentDAO.allStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alumnos', details: err.message });
  }
};

const getStudentByMatricula = async (req, res) => {
  try {
    const student = await StudentDAO.oneStudent(req.params.matricula);
    if (!student) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar alumno', details: err.message });
  }
};

const getStudentsByGroup = async (req, res) => {
  const { cuatrimestre, grupo } = req.query;
  try {
    const students = await StudentDAO.studentsByGroup(cuatrimestre, grupo);
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar alumnos por grupo', details: err.message });
  }
};

const createNewStudent = async (req, res) => {
  try {
    const newStudent = await StudentDAO.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear alumno', details: err.message });
  }
};

const updateStudentByMatricula = async (req, res) => {
  try {
    const updatedStudent = await StudentDAO.updateStudent(req.params.matricula, req.body);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Alumno no encontrado para actualizar' });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar alumno', details: err.message });
  }
};

export {
  getAllStudents,
  getStudentByMatricula,
  getStudentsByGroup,
  createNewStudent,
  updateStudentByMatricula
};
