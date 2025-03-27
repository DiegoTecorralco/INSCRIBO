import Lectura from "../models/lectura.models.js";

const lecturaDAO = {};

lecturaDAO.getAll = async () => {
    // Elimina la población de "tarjeta" ya que no es necesaria
    return await Lectura.find();
};

lecturaDAO.insert = async (lectura) => {
    return await Lectura.create(lectura);
};

export default lecturaDAO;