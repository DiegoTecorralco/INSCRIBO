import axios from 'axios'
import { Asistencia } from '../models/asistencia'
const URL_API_ASISTENCIA = "http://192.168.137.91:6000/api/asistencia/"


    export const getAsistencia = async () => {
        try {
            const response = await axios.get(`${URL_API_ASISTENCIA}getAll`);
            console.log("📥 Datos recibidos de la API:", response.data);
            return response.data.data as Asistencia[];
        } catch (error) {
            console.error("Error en la llamada a la API:", error.response ? error.response.data : error.message);
            throw new Error("No se pudo conectar con el servidor o la estructura de la respuesta no es válida");
        }
    };