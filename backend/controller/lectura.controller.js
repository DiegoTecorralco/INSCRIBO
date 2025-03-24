/*import tarjetaDAO from "../dao/tarjeta.dao.js";
import lecturaDAO from "../dao/lectura.dao.js";

const lecturaController = {};

lecturaController.getAll = (req, res) => {
    lecturaDAO.getAll()
        .then(lecturas => res.json({ data: lecturas }))
        .catch(error => res.status(500).json({ message: error.message }));
};

lecturaController.insert = (req, res) => {
    const { uid, idProgramado } = req.body;

    tarjetaDAO.getOne(uid)
        .then(tarjeta => {
            if (!tarjeta) {
                return tarjetaDAO.insert({ uid, idProgramado })
                    .then(nuevaTarjeta => {
                        return lecturaDAO.insert({ tarjeta: nuevaTarjeta._id, idProgramado })
                            .then(lectura => res.status(201).json({ message: "Lectura registrada con nueva tarjeta", lectura }));
                    });
            }
            return lecturaDAO.insert({ tarjeta: tarjeta._id, idProgramado })
                .then(lectura => res.status(201).json({ message: "Lectura registrada", lectura }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
};

export default lecturaController;*/

import tarjetaDAO from "../dao/tarjeta.dao.js";
import lecturaDAO from "../dao/lectura.dao.js";
import claseDAO from "../dao/clasesDao.js";
import moment from 'moment-timezone';

const lecturaController = {};

lecturaController.insert = async (req, res) => {
    const { uid, idClase, idProgramado } = req.body;
    console.log("📌 Datos recibidos en el request:", req.body);

    try {
        const tarjeta = await tarjetaDAO.getOne(uid);
        if (!tarjeta) {
            console.log("🚨 Tarjeta no encontrada:", uid);
            return res.status(404).json({ message: "Tarjeta no encontrada" });
        }
        console.log("✅ Tarjeta encontrada:", tarjeta);

        const clase = await claseDAO.obtenerClasePorId(idClase);
        if (!clase) {
            console.log("🚨 Clase no encontrada:", idClase);
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        console.log("✅ Clase encontrada:", clase);

        // Obtener la hora actual en México
        const horaActual = moment().tz("America/Mexico_City").format("HH:mm:ss");
        console.log("⏰ Hora actual en México:", horaActual);

        // Registrar la lectura
        const nuevaLectura = await lecturaDAO.insert({
            tarjeta: tarjeta._id,
            idClase,
            idProgramado,
            createdAt: moment().tz("America/Mexico_City").toDate()
        });

        console.log("✅ Lectura guardada exitosamente:", nuevaLectura);

        // Registrar asistencia en la clase
        clase.asistencias.push({
            tarjeta: tarjeta._id,
            fecha: new Date(),
            tipo: "asistencia"
        });

        await clase.save();

        res.status(201).json({ 
            message: "Registro exitoso", 
            clase,
            horaActual  // Devolver la hora actual en la respuesta
        });
    } catch (error) {
        console.error("🚨 Error al registrar asistencia:", error);
        res.status(500).json({ message: "Error al registrar asistencia", error });
    }
};

export default lecturaController;
