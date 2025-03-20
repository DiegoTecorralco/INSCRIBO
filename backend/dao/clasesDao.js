import Clase from '../models/Clase.js';

const claseDAO = {};

claseDAO.obtenerClases = async () => await Clase.find();
claseDAO.obtenerClasePorId = async (id) => await Clase.findById(id);
claseDAO.crearClase = async (data) => new Clase(data).save();
claseDAO.actualizarClase = async (id, data) => await Clase.findByIdAndUpdate(id, data, { new: true });
claseDAO.eliminarClase = async (id) => await Clase.findByIdAndDelete(id);
claseDAO.getByHorario = async (horario) => {
    return await Clase.findOne({ horario });
};

export default claseDAO;