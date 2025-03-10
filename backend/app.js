import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import controlRoutes from './routes/control.routes.js'; // Ruta para el modelo Control

// Configuración de la aplicación
const app = express();

// Middlewares
app.use(express.json()); // Para que entienda json
app.use(express.urlencoded({ extended: true })); // Para leer formularios
app.use(morgan('dev')); // Para loguear las peticiones

// Configura CORS para permitir solicitudes de cualquier origen
app.use(cors());

// Rutas
app.use('/api/acceso', controlRoutes); // Prefijo /api/acceso para las rutas del Control

// Configuración del puerto
app.set('port', process.env.PORT || 6000);

export default app;
