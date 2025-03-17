import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/dbPracticas')
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar con MongoDB:', error));


export default mongoose;