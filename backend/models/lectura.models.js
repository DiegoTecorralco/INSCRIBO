import mongoose from "mongoose";

const lecturaSchema = new mongoose.Schema({
    tarjeta: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarjeta",
        required: true 
        },
    idProgramado: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

export default mongoose.model("Lectura", lecturaSchema);