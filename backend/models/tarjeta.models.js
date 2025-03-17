import mongoose from "mongoose";

const tarjetaSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    idProgramado: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Tarjeta", tarjetaSchema);
