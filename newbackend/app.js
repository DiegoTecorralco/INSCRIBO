import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import {Server} from "socket.io"

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
app.use(cors({
    origin: ['http://localhost:4200', 'http://10.10.60.2:4200'],
    credentials: true
  }));

// Rutas
app.use('/api/teachers', teachersRoutes)
app.use('/api/auth', authRouter);

// Configuración del puerto
app.set('port', process.env.PORT || 3000);

export default app;
