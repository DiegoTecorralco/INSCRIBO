import mongoose from 'mongoose';
import moment from 'moment-timezone';

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { 
    type: Date, 
    default: () => moment().tz("America/Mexico_City").startOf('day').toDate() 
  },
  records: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { 
      type: String, 
      enum: ['Asistencia', 'Retardo', 'Falta', 'Justificado'], 
      required: true 
    }
  }]
});

export default mongoose.model('Attendance', attendanceSchema);
