import mongoose from "mongoose";

const {Schema , model} = mongoose;

const usuariosSchema = new Schema({

    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    fechaRegistro: { type: Date, default: Date.now }
})


export default model('usuarios', usuariosSchema);