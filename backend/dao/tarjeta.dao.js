import Tarjeta from "../models/tarjeta.models.js";

const tarjetaDAO = {};

tarjetaDAO.getAll = async () => {
    return await Tarjeta.find();
};

tarjetaDAO.getOne = async (uid) => {
    return await Tarjeta.findOne({ uid });
};

tarjetaDAO.insert = async (tarjeta) => {
    return await Tarjeta.create(tarjeta);
};

tarjetaDAO.updateOne = async (uid, tarjeta) => {
    return await Tarjeta.findOneAndUpdate({ uid }, tarjeta, { new: true });
};

tarjetaDAO.deleteOne = async (uid) => {
    return await Tarjeta.findOneAndDelete({ uid });
};
tarjetaDAO.getByUid = async (uid) => {
    try {
        // Busca la tarjeta en la colección por su uid
        return await Tarjeta.findOne({ uid });
    } catch (error) {
        throw new Error("Error al buscar tarjeta: " + error.message);
    }
};


export default tarjetaDAO;
