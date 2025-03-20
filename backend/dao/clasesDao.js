const Clase = require('../models/Clase');

const obtenerClases = async () => {
    return await Clase.find();
};

const obtenerClasePorId = async (id) => {
    return await Clase.findById(id);
};

const crearClase = async (data) => {
    const nuevaClase = new Clase(data);
    return await nuevaClase.save();
};

const actualizarClase = async (id, data) => {
    return await Clase.findByIdAndUpdate(id, data, { new: true });
};

const eliminarClase = async (id) => {
    return await Clase.findByIdAndDelete(id);
};

module.exports = {
    obtenerClases,
    obtenerClasePorId,
    crearClase,
    actualizarClase,
    eliminarClase
};
