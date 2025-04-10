import axios  from "axios";
import { teacher } from "../models/login";

const URL_API_LOGIN = "http://192.168.1.78:3000/api/auth/login";

/**
 * Función para iniciar sesión.
 * @param teacherData - Objeto con los datos del docente (matrícula y contraseña).
 * @returns Respuesta de la API con los datos de la sesión.
 */

export const login = async (teacherData: Pick<teacher, "matricula" | "password">) => {
    try {
      const response = await axios.post(URL_API_LOGIN, teacherData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || "Error en la solicitud");
      } else {
        throw new Error("Error al conectar con el servidor");
      }
    }
  };
  