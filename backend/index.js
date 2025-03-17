import app from './app.js'; // Importa la configuración de la app
import './databases.js'

// Levanta el servidor
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});