import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  matricula: { type: String, required: true, unique: true, trim: true },
  cuatrimestre: { type: Number, required: true, min: 1, max: 11 },
  grupo: { type: String, required: true, enum: ['A', 'B', 'C'] }
});

export default mongoose.model('Student', studentSchema);
