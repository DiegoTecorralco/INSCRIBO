import lecturaDAO from "../dao/lectura.dao.js";
import asistenciaController from "./asistencia.controller.js"; // Importamos el controlador de asistencia

const lecturaController = {};

lecturaController.getAll = (req, res) => {
    lecturaDAO.getAll()
        .then(lecturas => res.json({ data: lecturas }))
        .catch(error => res.status(500).json({ message: error.message }));
};
lecturaController.insert = async (req, res) => {
    const { idProgramado, uid } = req.body;

    try {
        // Insertar la lectura en la base de datos
        const lectura = await lecturaDAO.insert({ idProgramado, uid });

        // Llamar a asistenciaController para registrar la asistencia automáticamente
        console.log(`Registrando asistencia para el idProgramado: ${idProgramado}`);
        const resultAsistencia = await asistenciaController.registrarAsistenciaInterno(idProgramado);

        if (resultAsistencia.error) {
            return res.status(404).json({ message: resultAsistencia.error });
        }

        res.status(201).json({ message: "Lectura registrada y asistencia verificada", lectura });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
lecturaController.insert = async (req, res) => {
    const { idProgramado, uid } = req.body;

    try {
        // Insertar la lectura en la base de datos
        const lectura = await lecturaDAO.insert({ idProgramado, uid });

        // Llamar a asistenciaController para registrar la asistencia automáticamente
        console.log(`Registrando asistencia para el idProgramado: ${idProgramado}`);
        const resultAsistencia = await asistenciaController.registrarAsistenciaInterno(idProgramado);

        if (resultAsistencia.error) {
            return res.status(404).json({ message: resultAsistencia.error });
        }

        // Responder con la lectura y el estado del LED
        res.status(201).json({
            message: "Lectura registrada y asistencia verificada",
            lectura,
            estadoLED: resultAsistencia.estadoLED || "verde",  // Asegúrate de incluir el estadoLED
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default lecturaController;
