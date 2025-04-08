import mongoose from 'mongoose';
import moment from 'moment-timezone';

const sessionSchema = new mongoose.Schema({
    sessionID: { 
        type: String, 
        required: true, 
        unique: true 
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
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
        enum: ["Activa", "Inactiva", "Cerrada", "Expirada"], 
        default: "Activa" 
    },
    ip: String,
    userAgent: String
});

export default mongoose.model('Session', sessionSchema);