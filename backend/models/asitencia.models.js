import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
  idProgramado: { type: String, required: true }, // Matrícula del estudiante (desde la tarjeta RFID)
  nombre: { type: String, required: true }, // Nombre del estudiante
  materia: { type: String, required: true }, // Materia de la clase
  grupo: { type: String, required: false }, // Grupo del estudiante
  maestro: { type: String, required: false }, // Maestro que da la clase
  horario: { type: String, required: false }, // Horario de la clase
  fecha: { type: Date, default: Date.now }, // Fecha y hora del pase de lista
  tipoAsistencia: { type: String, enum: ["asistencia","retardo","falta"], required: true }
}, { timestamps: true });

export default mongoose.model("Asistencia", asistenciaSchema);
