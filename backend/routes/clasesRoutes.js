import { Router } from 'express';
import clasesController from '../controller/clasesController.js';

const clasesRouter = Router();

clasesRouter.get('/', clasesController.getClases);
clasesRouter.get('/:id', clasesController.getClaseById);
clasesRouter.post('/', clasesController.createClase);
clasesRouter.put('/:id', clasesController.updateClase);
clasesRouter.delete('/:id', clasesController.deleteClase);

export default clasesRouter;
