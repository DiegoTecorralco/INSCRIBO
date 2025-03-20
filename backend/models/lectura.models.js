import mongoose from "mongoose";
import moment from 'moment-timezone';

const lecturaSchema = new mongoose.Schema({
    tarjeta: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarjeta",
        required: true 
        },
    idProgramado: { 
        type: String, 
        required: true 
    },    idClase: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clase",
        required: true 
    },
    createdAt: { 
            type: Date, 
            default: () => moment().tz("America/Mexico_City").toDate() 
        }
}, { timestamps: true });

export default mongoose.model("Lectura", lecturaSchema);