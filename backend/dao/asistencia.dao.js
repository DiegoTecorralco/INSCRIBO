import  Asistencia  from "../models/asitencia.models.js";



const asistenciaDAO = {
  registrarAsistencia: async (asistencia) => {
    return await Asistencia.create(asistencia);
  },

  obtenerAsistenciasPorEstudiante: async (idProgramado) => {
    return await Asistencia.find({ idProgramado }).sort({ fecha: -1 });
  },

  obtenerAsistenciasPorGrupo: async (grupo) => {
    return await Asistencia.find({ grupo }).sort({ fecha: -1 });
  }
};

export default asistenciaDAO;


