import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';

import { initSocket } from './socket.js';
import teachersRoutes from './routes/teacher.routes.js';
import authRouter from './routes/auth.routes.js';
import attendanceRoutes from './routes/attendance.routes.js'; 
import { defaultMaxListeners } from 'events';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4200', 'http://10.10.60.2:4200'],
    credentials: true
  }
});

// Inicializa el socket global
initSocket(io);

// Middleware Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:4200', 'http://10.10.60.2:4200'],
  credentials: true
}));

// Rutas de la API
app.use('/api/attendance', attendanceRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/auth', authRouter);
app.use('/api/attendance', attendanceRoutes); // Agrega tus rutas adicionales aquí

// WebSocket Events
io.on('connection', (socket) => {
  console.log('Cliente conectado a WebSockets');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

export default app;