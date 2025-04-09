import mongoose from "mongoose";

mongoose.connect('mongodb+srv://marcos:mrcojdr25@tiendavirtual.ua0tv.mongodb.net/Inscribo?retryWrites=true&w=majority&appName=TiendaVirtual')
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));


export default mongoose;