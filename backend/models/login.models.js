import mongoose from "mongoose";
const { Schema, model } = mongoose;

const loginSchema = new Schema({
    nombre: String,
    apellido: String,
    contraseña: Number,
    correo: String,
    fechaHora: { type: Date, default: Date.now }
});

export default model('Login', loginSchema);