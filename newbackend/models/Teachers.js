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
        type: String, 
        immutable: true,
        default: () => moment().tz("America/Mexico_City").format() 
    },
    lastAccessed: { 
        type: String, 
        default: () => moment().tz("America/Mexico_City").format() 
    }
});


export default mongoose.model('Teacher', teacherSchema);