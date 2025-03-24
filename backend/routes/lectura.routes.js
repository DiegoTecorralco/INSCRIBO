import { Router } from 'express';
import lecturaController from '../controller/lectura.controller.js';
import lecturaDAO from '../dao/lectura.dao.js';

const lecturaRouter = Router();

// Ruta para registrar una lectura (desde el Arduino)
lecturaRouter.post('/lecturas', lecturaController.insert);

// Ruta para obtener todas las lecturas
lecturaRouter.get('/lecturas', async (req, res) => {
    try {
        const lecturas = await lecturaDAO.getAll();
        res.json(lecturas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lecturas", error });
    }
});

export default lecturaRouter;
