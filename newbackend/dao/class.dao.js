import Class from '../models/Class.js';

const allClasses = async () => {
  return Class.find()
    .populate('subject')
    .populate('teacher')
    .exec();
};

const classById = async (id) => {
  return Class.findById(id)
    .populate('subject')
    .populate('teacher')
    .exec();
};

const createClass = async (classData) => {
  const newClass = new Class(classData);
  return newClass.save();
};

const classesByTeacher = async (teacherId) => {
  return Class.find({ teacher: teacherId }).populate('subject').exec();
};

export {
  allClasses,
  classById,
  createClass,
  classesByTeacher
};
