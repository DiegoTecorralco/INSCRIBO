import Lectura from "../models/lectura.models.js";

const lecturaDAO = {};

lecturaDAO.getAll = async () => {
    return await Lectura.find().populate("tarjeta");
};

lecturaDAO.insert = async (lectura) => {
    return await Lectura.create(lectura);
};

export default lecturaDAO;
