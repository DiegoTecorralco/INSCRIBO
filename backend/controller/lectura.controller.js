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

    try {
        const tarjeta = await tarjetaDAO.getOne(uid);

        if (!tarjeta) {
            return res.status(404).json({ message: "Tarjeta no encontrada" });
        }

        const clase = await claseDAO.obtenerClasePorId(idClase);
        if (!clase) {
            return res.status(404).json({ message: "Clase no encontrada" });
        }

        // Obtener la hora actual y la hora de la clase
        const horaActual = moment().tz("America/Mexico_City").format("HH:mm");
        const horaClase = clase.horario; // "HH:mm"

        // Convertir a objetos de tiempo para comparar
        const horaActualObj = moment(horaActual, "HH:mm");
        const horaClaseObj = moment(horaClase, "HH:mm");

        // Calcular la diferencia en minutos
        const diferenciaMinutos = horaActualObj.diff(horaClaseObj, 'minutes');

        let tipoAsistencia = "asistencia"; // Valor por defecto

        if (diferenciaMinutos > 5) {
            tipoAsistencia = "retardo"; // Si es más de 5 min tarde, se marca como "retardo"
        }

        // Registrar la lectura y la asistencia
        const nuevaLectura = await lecturaDAO.insert({
            tarjeta: tarjeta._id,
            idClase,
            idProgramado
        });

        // Agregar asistencia en la clase con el tipo adecuado
        clase.asistencias.push({
            tarjeta: tarjeta._id,
            fecha: new Date(),
            tipo: tipoAsistencia
        });

        await clase.save();

        res.status(201).json({ message: `Registro exitoso: ${tipoAsistencia}`, clase });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar asistencia", error });
    }
};

export default lecturaController;
