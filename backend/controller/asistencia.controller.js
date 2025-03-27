import asistenciaDAO from "../dao/asistencia.dao.js";
import GrupoDAO from "../dao/grupos.dao.js";
import moment from "moment-timezone";

const asistenciaController = {};

asistenciaController.registrarAsistenciaInterno = async (idProgramado) => {
   try {
     console.log("📌 Buscando al estudiante con matrícula:", idProgramado);
     
     const estudiante = await GrupoDAO.buscarEstudiantePorMatricula(idProgramado);
     if (!estudiante) {
       console.log("❌ Estudiante no encontrado.");
       return { error: "Estudiante no encontrado en ningún grupo" };
     }
     
     console.log("✅ Estudiante encontrado:", estudiante);
     
     // Obtener la hora actual
     const horaActual = moment().tz("America/Mexico_City");
     console.log("⏰ Hora actual:", horaActual.format("HH:mm"));
     
     // Establecer la hora de entrada (en este caso, 03:00)
     const horaEntrada = moment().tz("America/Mexico_City").set({ hour: 10, minute: 51  , second: 0 });
     console.log("🕒 Hora de entrada:", horaEntrada.format("HH:mm"));
     
     // Calcular la diferencia de minutos entre la hora actual y la hora de entrada
     const diferenciaMinutos = horaActual.diff(horaEntrada, "minutes");
     console.log("⏳ Diferencia en minutos:", diferenciaMinutos);
     
     // Determinar el tipo de asistencia y estado del LED
     let tipoAsistencia = "asistencia";
     let estadoLED = "verde";  // Asistencia por defecto (LED verde)
     
     // Comparar con los márgenes de 2 y 5 minutos
     if (diferenciaMinutos > 5) {
       tipoAsistencia = "falta";
       estadoLED = "rojo";  // Falta si más de 5 minutos tarde
     } else if (diferenciaMinutos > 2) {
       tipoAsistencia = "retardo";
       estadoLED = "amarillo";  // Retardo si más de 2 minutos tarde
     }
     
     console.log("📌 Tipo de asistencia:", tipoAsistencia);
     console.log("💡 Estado del LED:", estadoLED);
     
     // Registrar la asistencia en la base de datos
     const asistencia = await asistenciaDAO.registrarAsistencia({
       idProgramado,
       nombre: estudiante.nombre,
       grupo: estudiante.grupo || "Desconocido",
       materia: "Sin materia",
       horario: "Sin horario",
       tipoAsistencia,
     });
     
     console.log("✅ Asistencia registrada exitosamente:", asistencia);
     
     // Devolver la asistencia y el estado del LED
     return { asistencia, estadoLED };
   } catch (error) {
     console.error("❌ Error al registrar asistencia:", error);
     return { error: "Error interno del servidor" };
   }
};

asistenciaController.registrarAsistencia = async (req, res) => {
   console.log("📥 Recibiendo solicitud de asistencia...");
   const { idProgramado } = req.body;
   if (!idProgramado) {
     return res.status(400).json({ error: "Falta el ID programado" });
   }
   
   const result = await asistenciaController.registrarAsistenciaInterno(idProgramado);
   
   if (result.error) {
     console.log("❌ Error al registrar asistencia:", result.error);
     return res.status(404).json({ message: result.error });
   }
   
   console.log("✅ Asistencia registrada con éxito:", result);
   
   // Devolver la respuesta con el estadoLED
   return res.status(201).json({
     message: "Lectura registrada y asistencia verificada",
     lectura: result.asistencia,
     estadoLED: result.estadoLED || "verde"  // Si no se recibe un estadoLED, se asigna "verde"
   });
};

export default asistenciaController;

