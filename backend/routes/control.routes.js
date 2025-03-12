import { Router } from 'express';
import  registerAccess  from '../controller/ControlController.js'; // Importa el controlador

const router = Router();

// Ruta para registrar accesos (Entrada/Salida)
router.post('/', registerAccess);

export default router;
