import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import {Server} from "socket.io"
import lecturaRouter from './routes/lectura.routes.js';
import tarjetaRouter from './routes/tarjeta.routes.js';
import Administrador from './models/Administrador.js';
import clasesRoutes from './routes/clasesRoutes.js';


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


app.post('/login', async (req, res) => {
    const { name, pass } = req.body;

    // Buscar el usuario en la base de datos que coincida con el nombre y la contraseña
    const administrador = await Administrador.findOne({ name, pass });

    if (administrador) {
        return res.json({ message: 'Login exitoso', administrador });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});


// Rutas
app.use('/api/',lecturaRouter); // Prefijo /api/acceso para las rutas del Control
app.use('/api/',tarjetaRouter); // Prefijo /api/leer el control 
app.use('/api/clases', clasesRoutes);

// Configuración del puerto
app.set('port', process.env.PORT || 6000);

export default app;