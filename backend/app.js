import express from 'express';
import morgan from 'morgan';

import cors from 'cors';
import http from 'http';
import {Server} from "socket.io"

import lecturaRouter from './routes/lectura.routes.js';
import tarjetaRouter from './routes/tarjeta.routes.js';
import clasesRouter from './routes/clases.routes.js';
import routerGrupo from "./routes/grupos.routes.js";
import asistenciaRouter from './routes/routes.asistencia.js';
import sesionsRouter from './routes/sesions.routes.js';
import teachersRoutes from './routes/teacher.routes.js'
import authRouter from './routes/auth.routes.js';
import './cron/sessions.js';


// Configuración de la aplicación
const app = express();


//Servidor HTTP
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log(" Cliente conectado a WebSockets");
    
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

// Middlewares
app.use(express.json()); // Para que entienda json
app.use(express.urlencoded({ extended: true })); // Para leer formularios
app.use(morgan('dev')); // Para loguear las peticiones

// Configura CORS para permitir solicitudes de cualquier origen
app.use(cors());

// Rutas
app.use('/api/aa/',lecturaRouter); // Prefijo /api/acceso para las rutas del Control
app.use('/api/',tarjetaRouter); // Prefijo /api/leer el control 
app.use('/api/clases/',clasesRouter);
app.use('/api/alum/',routerGrupo);
app.use('/api/asistencia/', asistenciaRouter);
app.use('/api/login',sesionsRouter)
app.use('/api/teachers', teachersRoutes)
app.use('/api/auth', authRouter);

// Configuración del puerto
app.set('port', process.env.PORT || 6000);

export default app;
