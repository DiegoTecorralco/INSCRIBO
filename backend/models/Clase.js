const mongoose = require('mongoose');

const ClaseSchema = new mongoose.Schema({
    materia: { type: String, required: true },
    horario: { type: String, required: true },
    laboratorio3: { type: Boolean, default: false },
    maestro: { type: String, required: true }
}, { timestamps: true });

const Clase = mongoose.model('Clase', ClaseSchema);
module.exports = Clase;
