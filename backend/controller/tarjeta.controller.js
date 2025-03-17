import tarjetaDAO from "../dao/tarjeta.dao.js";

const tarjetaController = {};

tarjetaController.getAll = (req, res) => {
    tarjetaDAO.getAll()
        .then(tarjetas => res.json({ data: tarjetas }))
        .catch(error => res.status(500).json({ message: error.message }));
};

tarjetaController.getOne = (req, res) => {
    tarjetaDAO.getOne(req.params.uid)
        .then(tarjeta => {
            if (tarjeta) res.json({ data: tarjeta });
            else res.status(404).json({ message: "Tarjeta no encontrada" });
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

tarjetaController.insert = (req, res) => {
    tarjetaDAO.getOne(req.body.uid)
        .then(existingTarjeta => {
            if (existingTarjeta) {
                return res.status(400).json({ message: "La tarjeta ya está registrada" });
            }
            return tarjetaDAO.insert(req.body)
                .then(tarjeta => res.status(201).json({ message: "Tarjeta registrada", tarjeta }))
                .catch(error => res.status(500).json({ message: error.message }));
        });
};

tarjetaController.updateOne = (req, res) => {
    tarjetaDAO.updateOne(req.params.uid, req.body)
        .then(tarjeta => res.json({ message: "Tarjeta actualizada", tarjeta }))
        .catch(error => res.status(500).json({ message: error.message }));
};

tarjetaController.deleteOne = (req, res) => {
    tarjetaDAO.deleteOne(req.params.uid)
        .then(tarjeta => res.json({ message: "Tarjeta eliminada", tarjeta }))
        .catch(error => res.status(500).json({ message: error.message }));
};

export default tarjetaController;