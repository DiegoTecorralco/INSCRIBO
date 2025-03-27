import { Router } from "express";
import asistenciaController from "../controller/asistencia.controller.js";

const asistenciaRouter = Router();

// Ruta para registrar la asistencia de un estudiante
asistenciaRouter.post("/pase-lista", asistenciaController.registrarAsistencia);

// Ruta para obtener las asistencias de un estudiante por su matrícula
asistenciaRouter.get("/pase-lista/estudiante/:idProgramado", async (req, res) => {
  const { idProgramado } = req.params;
  
  try {
    const result = await asistenciaController.registrarAsistenciaInterno(idProgramado);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(200).json({ message: "Asistencia obtenida", asistencia: result });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la asistencia", error });
  }
});

// Ruta para obtener las asistencias de un grupo específico
asistenciaRouter.get("/pase-lista/grupo/:grupo", async (req, res) => {
  const { grupo } = req.params;
  
  try {
    // Suponiendo que hay una función en tu DAO que obtiene todas las asistencias de un grupo
    const result = await asistenciaDAO.obtenerAsistenciasPorGrupo(grupo);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay asistencias registradas para este grupo" });
    }

    res.status(200).json({ message: "Asistencias del grupo obtenidas", asistencias: result });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las asistencias del grupo", error });
  }
});

export default asistenciaRouter;
