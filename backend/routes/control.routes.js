import { Router } from 'express';
import registerAccess from '../controller/ControlController.js'; 


const accessRouter = Router();

// Ruta para registrar accesos (Entrada/Salida)
accessRouter.post('/acceso', registerAccess);

export default accessRouter;
