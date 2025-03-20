import mongoose from "mongoose";
import moment from 'moment-timezone';

const {Schema , model} = mongoose;

const usuariosSchema = new Schema({

    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    fechaRegistro: { type: Date, default: Date.now },
    createdAt: { 
            type: Date, 
            default: () => moment().tz("America/Mexico_City").toDate() 
        }
})


export default model('usuarios', usuariosSchema);