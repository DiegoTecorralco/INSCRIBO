import Student from '../models/Student.js';

const allStudents = async () => {
  return Student.find().exec();
};

const studentsByGroup = async (cuatrimestre, grupo) => {
  return Student.find({ cuatrimestre, grupo }).exec();
};

const oneStudent = async (matricula) => {
  return Student.findOne({ matricula }).exec();
};

const createStudent = async (studentData) => {
  const newStudent = new Student(studentData);
  return newStudent.save();
};

const updateStudent = async (matricula, updateData) => {
  return Student.findOneAndUpdate({ matricula }, updateData, { new: true }).exec();
};

export {
  allStudents,
  oneStudent,
  createStudent,
  updateStudent,
  studentsByGroup
};
