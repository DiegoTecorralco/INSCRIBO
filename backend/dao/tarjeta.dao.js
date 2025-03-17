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

export default tarjetaDAO;