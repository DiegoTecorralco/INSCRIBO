import { Router } from 'express';
import {
  getAllAttendance,
  getAttendanceByDate,
  createNewAttendance,
  updateStudentAttendance,
  updateAttendanceStatus,
  updateAttendanceFromRFID
} from '../controller/attendance.controller.js';

const attendanceRoutes = Router();

attendanceRoutes.get('/', getAllAttendance); // GET /api/attendance
attendanceRoutes.get('/by-date', getAttendanceByDate); // GET /api/attendance/by-date?classId=...&date=...
attendanceRoutes.post('/:matricula', createNewAttendance); // POST /api/attendance
attendanceRoutes.put('/update-status', updateAttendanceStatus); // PUT /api/attendance/update-status
attendanceRoutes.put('/:attendanceId/students/:studentId', updateStudentAttendance);
attendanceRoutes.put('/rfid/:matricula', updateAttendanceFromRFID);

export default attendanceRoutes;
