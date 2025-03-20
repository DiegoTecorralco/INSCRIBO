import Clase from '../models/Clase.js';

const obtenerClases = async () => await Clase.find();
const obtenerClasePorId = async (id) => await Clase.findById(id);
const crearClase = async (data) => new Clase(data).save();
const actualizarClase = async (id, data) => await Clase.findByIdAndUpdate(id, data, { new: true });
const eliminarClase = async (id) => await Clase.findByIdAndDelete(id);

export default {
    obtenerClases,
    obtenerClasePorId,
    crearClase,
    actualizarClase,
    eliminarClase
};
