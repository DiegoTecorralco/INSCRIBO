import app from './app.js'; // Importa la configuración de la app
import mongoose from 'mongoose';
// Conexión a la base de datos (MongoDB)
mongoose.connect('mongodb://127.0.0.1:27017/acces_control', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión a la base de datos✅'))
  .catch((error) => console.error('❎ Error al conectar a la base de datos:', error));

// Levanta el servidor
const PORT = app.get('port');
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
