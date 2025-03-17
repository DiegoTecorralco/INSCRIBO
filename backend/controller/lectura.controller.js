import tarjetaDAO from "../dao/tarjeta.dao.js";
import lecturaDAO from "../dao/lectura.dao.js";

const lecturaController = {};

lecturaController.getAll = (req, res) => {
    lecturaDAO.getAll()
        .then(lecturas => res.json({ data: lecturas }))
        .catch(error => res.status(500).json({ message: error.message }));
};

lecturaController.insert = (req, res) => {
    const { uid, idProgramado } = req.body;

    tarjetaDAO.getOne(uid)
        .then(tarjeta => {
            if (!tarjeta) {
                return tarjetaDAO.insert({ uid, idProgramado })
                    .then(nuevaTarjeta => {
                        return lecturaDAO.insert({ tarjeta: nuevaTarjeta._id, idProgramado })
                            .then(lectura => res.status(201).json({ message: "Lectura registrada con nueva tarjeta", lectura }));
                    });
            }
            return lecturaDAO.insert({ tarjeta: tarjeta._id, idProgramado })
                .then(lectura => res.status(201).json({ message: "Lectura registrada", lectura }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

export default lecturaController;
