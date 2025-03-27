import { Router } from 'express';
import tarjetaController from '../controller/tarjeta.controller.js';

const tarjetaRouter = Router();

tarjetaRouter.get('/getAll', tarjetaController.getAll);
tarjetaRouter.get('/getOne/:uid', tarjetaController.getOne);
tarjetaRouter.post('/lectura', tarjetaController.insert);
tarjetaRouter.put('/updateOne/:uid', tarjetaController.updateOne);
tarjetaRouter.delete('/deleteOne/:uid', tarjetaController.deleteOne);

export default tarjetaRouter;
