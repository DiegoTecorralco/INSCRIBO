import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  teacherMatricula: { type: String, required: true },
  cuatrimestre: { type: Number, required: true },
  grupo: { type: String, required: true, enum: ['A', 'B', 'C'] }
});

export default mongoose.model('Class', classSchema);
