import app from './app.js'; // Importa la configuración de la app
import './config/databases.js'

// Levanta el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
