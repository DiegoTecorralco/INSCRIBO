import claseDAO from '../dao/clasesDao.js';

const claseController = {};

claseController.getClases = async (req, res) => {
    try {
        const clases = await claseDAO.obtenerClases();
        res.json(clases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las clases', error });
    }
};

claseController.getClaseById = async (req, res) => {
    try {
        const clase = await claseDAO.obtenerClasePorId(req.params.id);
        if (!clase) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json(clase);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la clase', error });
    }
};

claseController.createClase = async (req, res) => {
    try {
        const nuevaClase = await claseDAO.crearClase(req.body);
        res.status(201).json(nuevaClase);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la clase', error });
    }
};

claseController.updateClase = async (req, res) => {
    try {
        const claseActualizada = await claseDAO.actualizarClase(req.params.id, req.body);
        if (!claseActualizada) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json(claseActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la clase', error });
    }
};

claseController.deleteClase = async (req, res) => {
    try {
        const claseEliminada = await claseDAO.eliminarClase(req.params.id);
        if (!claseEliminada) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json({ message: 'Clase eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la clase', error });
    }
};

export default claseController;
