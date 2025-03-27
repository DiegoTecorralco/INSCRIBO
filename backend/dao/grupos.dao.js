import Grupo from "../models/grupos.models.js";

const GrupoDAO = {
  async obtenerGrupos() {
    return await Grupo.find();
  },

  async crearGrupo(datos) {
    const nuevoGrupo = new Grupo(datos);
    return await nuevoGrupo.save();
  },

  async obtenerGrupoPorNombre(nombre) {
    return await Grupo.findOne({ nombre });
  },

  async actualizarGrupo(nombre, nuevosDatos) {
    return await Grupo.findOneAndUpdate({ nombre }, nuevosDatos, { new: true });
  },

  async eliminarGrupo(nombre) {
    return await Grupo.findOneAndDelete({ nombre });
  },

  // Nueva función para buscar un estudiante por su matrícula
  async buscarEstudiantePorMatricula(matricula) {
    // Buscar el grupo que contiene al estudiante con la matrícula proporcionada
    const grupo = await Grupo.findOne({
      "estudiantes.matricula": matricula,  // Busca el estudiante en cualquier grupo
    });
  
    console.log("Grupo encontrado:", grupo);  // Agrega este log para verificar qué devuelve MongoDB
  
    if (grupo) {
      // Si el grupo es encontrado, buscamos al estudiante dentro del array 'estudiantes'
      const estudiante = grupo.estudiantes.find(est => est.matricula === matricula);
      console.log("Estudiante encontrado:", estudiante);  // Agrega este log para verificar al estudiante
      return estudiante;  // Devolvemos el estudiante encontrado
    }
    console.log("Estudiante no encontrado en ningún grupo");
    return null;  // Si no se encuentra el estudiante
  }
  
};

export default GrupoDAO;
