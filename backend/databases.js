import mongoose from "mongoose";

mongoose.connect('mongodb+srv://marcos:marcos@tiendavirtual.ua0tv.mongodb.net/?retryWrites=true&w=majority&appName=TiendaVirtual')
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar con MongoDB: 😩', error));


export default mongoose;