import mongoose from "mongoose";
import moment from 'moment-timezone';

const tarjetaSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    idProgramado: { type: String, required: true },
    createdAt: { 
            type: Date, 
            default: () => moment().tz("America/Mexico_City").toDate() 
        }
}, { timestamps: true });

export default mongoose.model("Tarjeta", tarjetaSchema);