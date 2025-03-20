import mongoose from 'mongoose';

const ClaseSchema = new mongoose.Schema({
    materia: { type: String, required: true },
    horario: { type: String, required: true },
    laboratorio3: { type: Boolean, default: false },
    maestro: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Clase', ClaseSchema);
