const express = require('express');
const clasesController = require('../controllers/clasesController');

const clasesrouter = express.Router();

clasesrouter.get('/', clasesController.getClases);
clasesrouter.get('/:id', clasesController.getClaseById);
clasesrouter.post('/', clasesController.createClase);
clasesrouter.put('/:id', clasesController.updateClase);
clasesrouter.delete('/:id', clasesController.deleteClase);

export default clasesrouter;
