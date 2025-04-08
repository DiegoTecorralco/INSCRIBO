import mongoose from 'mongoose';
import moment from 'moment-timezone';

const teacherSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    lastname: {  
        type: String, 
        required: true,
        trim: true
    },
    matricula: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
    },
    createdAt: { 
        type: Date, 
        immutable: true,  // No puede modificarse
        default: () => moment().tz("America/Mexico_City").toDate() 
    },
    lastAccessed: { 
        type: Date, 
        default: () => moment().tz("America/Mexico_City").toDate() 
    }
});


export default mongoose.model('Teacher', teacherSchema);