import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

//SETTINGS
const app= express();
const PORT= 6000;
app.listen(PORT, ()=>{
    console.log(`app listen on port ${PORT}`);
});

//MIDDLEWARES
app.use(express.json()); //para que entienda json
app.use(express.urlencoded({extended:true})); //para que pueda entender formularios html
app.use(morgan('dev')); //para que llevemos la bitacora de de las peticiones que llegan al servidor

export default app;