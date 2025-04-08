import Subject from '../models/Subject.js';

const allSubjects = async () => {
  return Subject.find().exec();
};

const createSubject = async (subjectData) => {
  const newSubject = new Subject(subjectData);
  return newSubject.save();
};

export {
  allSubjects,
  createSubject
};
