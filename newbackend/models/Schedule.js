import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  day: { type: String, required: true, enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true }    
});

export default mongoose.model('Schedule', scheduleSchema);
