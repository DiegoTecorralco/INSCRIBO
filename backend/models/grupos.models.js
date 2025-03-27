import mongoose from "mongoose";

const EstudianteSchema = new mongoose.Schema({
  matricula: { type: String, required: true },
  nombre: { type: String, required: true }
});   

const GrupoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estudiantes: { type: [EstudianteSchema], default: [] }
});

export default mongoose.model("Grupo", GrupoSchema);
