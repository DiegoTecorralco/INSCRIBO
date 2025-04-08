import mongoose from "mongoose";

mongoose.connect('mongodb+srv://agustin:230365@clusteragus.avopn.mongodb.net/Inscribo?retryWrites=true&w=majority&appName=ClusterAgus')
  .then(() => console.log('😎Conexión exitosa a MongoDB'))
  .catch((error) => console.error('🥹😞😭Error al conectar con MongoDB:', error));


export default mongoose;