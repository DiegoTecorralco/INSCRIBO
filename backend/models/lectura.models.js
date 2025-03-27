import mongoose from "mongoose";

const lecturaSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    
    idProgramado: { type: String, required: true },
    fechaLectura: { type: Date, default: Date.now }  // Nuevo campo
}, { timestamps: true });

export default mongoose.model("Lectura", lecturaSchema);
