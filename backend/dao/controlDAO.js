import Control from '../models/Control.js';

const findUserByStudentID = async (studentID) => {
  return await Control.findOne({ studentID });
};

const saveAccessLog = async (usuario, tipo) => {
  usuario.accessLogs.push({ type: tipo });
  return await usuario.save();
};

export { findUserByStudentID, saveAccessLog };
