import * as StudentDAO from '../dao/student.dao.js';

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
  const { name, lastname, matricula, cuatrimestre, grupo } = req.body;

  // Validation checks
  if (!name || !lastname || !matricula || !cuatrimestre || !grupo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validate cuatrimestre: should be a number between 1 and 11
  if (typeof cuatrimestre !== 'number' || cuatrimestre < 1 || cuatrimestre > 11) {
    return res.status(400).json({ error: 'El cuatrimestre debe ser un número entre 1 y 11' });
  }

  // Validate grupo: should be one of 'A', 'B', or 'C'
  if (!['A', 'B', 'C'].includes(grupo)) {
    return res.status(400).json({ error: 'El grupo debe ser "A", "B" o "C"' });
  }

  try {
    // Check if matricula already exists
    const existingStudent = await StudentDAO.findStudentByMatricula(matricula);
    if (existingStudent) {
      return res.status(400).json({ error: 'La matrícula ya está registrada' });
    }

    // Proceed to create new student
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
