import { Router } from 'express';
import lecturaController from '../controller/lectura.controller.js';
const lecturaRouter = Router();

lecturaRouter.get('/getAll', lecturaController.getAll);
lecturaRouter.post('/insert', lecturaController.insert);

export default lecturaRouter;
