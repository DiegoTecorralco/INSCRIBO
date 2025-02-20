import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Control from './models/Control.js'; // Importamos el modelo

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

// Ruta para registrar accesos (Entrada/Salida)
app.post('/acceso', async (req, res) => {
    const { studentID, tipo } = req.body; // El lector RFID enviará estos datos
    
    try {
      // Buscar estudiante o maestro en la base de datos
      const usuario = await Control.findOne({ studentID });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Verificar si el usuario está activo
      if (usuario.status !== "Activo") {
        return res.status(403).json({ message: "Acceso denegado, usuario inactivo" });
      }
  
      // Registrar el acceso en el historial
      usuario.accessLogs.push({ type: tipo });
      await usuario.save();
  
      res.json({ message: `Acceso registrado: ${usuario.name} - ${tipo}` });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error });
    }
  });

export default app;