import { Router } from 'express';
import { registerAccess } from '../controllers/ControlController.js'; // Importa el controlador

const router = Router();

// Ruta para registrar accesos (Entrada/Salida)
router.post('/', registerAccess);

export default router;
