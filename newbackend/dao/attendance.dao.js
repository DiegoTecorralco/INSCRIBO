import Attendance from '../models/Attendance.js';

const allAttendance = async () => {
  return Attendance.find()
    .populate('class')
    .populate('teacher')
    .populate('records.student')
    .exec();
};

const attendanceByDate = async (classId, date) => {
  return Attendance.findOne({ class: classId, date })
    .populate('records.student')
    .exec();
};

const createAttendance = async (attendanceData) => {
  const newAttendance = new Attendance(attendanceData);
  return newAttendance.save();
};

const updateAttendanceRecord = async (attendanceId, studentId, newStatus) => {
  return Attendance.findOneAndUpdate(
    { _id: attendanceId, 'records.student': studentId },
    { $set: { 'records.$.status': newStatus } },
    { new: true }
  ).exec();
};

export {
  allAttendance,
  attendanceByDate,
  createAttendance,
  updateAttendanceRecord
};
