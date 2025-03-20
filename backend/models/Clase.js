import mongoose from 'mongoose';
import moment from 'moment-timezone';

const ClaseSchema = new mongoose.Schema({
    materia: { type: String, required: true },
    horario: { type: String, required: true }, // Horario en formato "HH:mm"
    laboratorio3: { type: Boolean, default: false },
    maestro: { type: String, required: true },
    asistencias: [{
        tarjeta: { type: mongoose.Schema.Types.ObjectId, ref: "Tarjeta" },
        fecha: { 
            type: Date, 
            default: () => moment().tz("America/Mexico_City").toDate() 
        },
        tipo: { type: String, enum: ["asistencia", "retardo"], required: true } // Nuevo campo
    }]
}, { timestamps: true });

export default mongoose.model('Clase', ClaseSchema);
