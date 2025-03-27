import mongoose from 'mongoose';
import moment from 'moment-timezone';

const sessionSchema = new mongoose.Schema({
    sessionID: { type: String, required: true, unique: true },
    createdAt: { 
        type: Date, 
        default: () => moment().tz("America/Mexico_City").toDate() 
    },
    lastAccessed: { 
        type: Date, 
        default: () => moment().tz("America/Mexico_City").toDate() 
    },
    status: { 
        type: String, 
        enum: ["Activa", "Inactiva", "Finalizada por el Usuario", "Finalizada por Falla de Sistema"], 
        default: "Activa" 
    }
});

export default mongoose.model('Session', sessionSchema);