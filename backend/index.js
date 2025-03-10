import app from './app.js'; // Importa la configuración de la app

// Conexión a la base de datos (MongoDB)
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
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
