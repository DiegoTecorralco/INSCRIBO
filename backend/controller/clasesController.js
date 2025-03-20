const clasesDao = require('../dao/clasesDao');

const getClases = async (req, res) => {
    try {
        const clases = await clasesDao.obtenerClases();
        res.json(clases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las clases', error });
    }
};

const getClaseById = async (req, res) => {
    try {
        const clase = await clasesDao.obtenerClasePorId(req.params.id);
        if (!clase) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json(clase);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la clase', error });
    }
};

const createClase = async (req, res) => {
    try {
        const nuevaClase = await clasesDao.crearClase(req.body);
        res.status(201).json(nuevaClase);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la clase', error });
    }
};

const updateClase = async (req, res) => {
    try {
        const claseActualizada = await clasesDao.actualizarClase(req.params.id, req.body);
        if (!claseActualizada) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json(claseActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la clase', error });
    }
};

const deleteClase = async (req, res) => {
    try {
        const claseEliminada = await clasesDao.eliminarClase(req.params.id);
        if (!claseEliminada) return res.status(404).json({ message: 'Clase no encontrada' });
        res.json({ message: 'Clase eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la clase', error });
    }
};

module.exports = {
    getClases,
    getClaseById,
    createClase,
    updateClase,
    deleteClase
};
