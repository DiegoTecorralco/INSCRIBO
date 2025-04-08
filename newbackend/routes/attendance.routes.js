import { Router } from 'express';
import {
  getAllAttendance,
  getAttendanceByDate,
  createNewAttendance,
  updateAttendanceStatus
} from '../controllers/attendance.controller.js';

const attendanceRoutes = Router();

attendanceRoutes.get('/', getAllAttendance); // GET /api/attendance
attendanceRoutes.get('/by-date', getAttendanceByDate); // GET /api/attendance/by-date?classId=...&date=...
attendanceRoutes.post('/', createNewAttendance); // POST /api/attendance
attendanceRoutes.put('/update-status', updateAttendanceStatus); // PUT /api/attendance/update-status

export default attendanceRoutes;
