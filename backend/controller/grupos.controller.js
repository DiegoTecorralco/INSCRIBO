import GrupoDAO from "../dao/grupos.dao.js"


const GrupoController = {
  async obtenerGrupos(req, res) {
    try {
      const grupos = await GrupoDAO.obtenerGrupos();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los grupos', error });
    }
  },

  async crearGrupo(req, res) {
    try {
      const datos = req.body;
      const grupoCreado = await GrupoDAO.crearGrupo(datos);
      res.status(201).json(grupoCreado);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el grupo', error });
    }
  },

  async obtenerGrupoPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      const grupo = await GrupoDAO.obtenerGrupoPorNombre(nombre);
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el grupo', error });
    }
  },

  async actualizarGrupo(req, res) {
    try {
      const { nombre } = req.params;
      const nuevosDatos = req.body;
      const grupoActualizado = await GrupoDAO.actualizarGrupo(nombre, nuevosDatos);
      res.json(grupoActualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el grupo', error });
    }
  },

  async eliminarGrupo(req, res) {
    try {
      const { nombre } = req.params;
      await GrupoDAO.eliminarGrupo(nombre);
      res.json({ message: 'Grupo eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el grupo', error });
    }
  },

  async buscarEstudiantePorMatricula(req, res) {
    try {
        const { matricula } = req.params;
        console.log("📌 Buscando estudiante con matrícula:", matricula);

        const estudiante = await GrupoDAO.buscarEstudiantePorMatricula(matricula);

        if (!estudiante) {
            console.log("❌ Estudiante no encontrado.");
            return res.status(404).json({ message: "Estudiante no encontrado en ningún grupo" });
        }

        console.log("✅ Estudiante encontrado:", estudiante);
        res.json(estudiante);
    } catch (error) {
        console.error("❌ Error al buscar estudiante:", error);
        res.status(500).json({ message: "Error interno al buscar estudiante", error });
    }
}

};

export default GrupoController;
