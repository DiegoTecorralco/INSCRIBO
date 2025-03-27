import Clases from "../models/clases.models.js";

const clasesDAO = {};

// Función para obtener todas las clases de un día específico
clasesDAO.obtenerClasesPorDia = async (dia) => {
  try {
    console.log("Inicio de obtenerClasesPorDia"); // Verifica si la función fue llamada
    console.log("Día recibido para la consulta:", dia); // Verifica el valor del día recibido

    const clases = await Clases.find({ dia: dia });
    console.log("Resultado de la consulta a la base de datos:", clases); // Muestra el resultado de la consulta

    return clases;
  } catch (error) {
    console.error("Error al obtener clases por día:", error); // Mensaje de error específico
    throw new Error("No se pudieron obtener las clases por día");
  }
};

// Otras funciones
clasesDAO.getAll = async () => {
  console.log("Inicio de getAll"); // Verifica si la función fue llamada

  const clases = await Clases.find();
  console.log("Todas las clases obtenidas:", clases); // Verifica el resultado de la consulta

  return clases;
};

clasesDAO.insert = async (clases) => {
  try {
    console.log("Inicio de insert"); // Verifica si la función fue llamada
    console.log("Clases recibidas para insertar:", clases); // Muestra los datos que se van a insertar

    const resultado = await Clases.create(clases);
    console.log("Resultado de la inserción:", resultado); // Verifica el resultado de la operación

    return resultado;
  } catch (error) {
    console.error("Error al insertar clases:", error); // Mensaje de error específico
    throw new Error("No se pudo insertar las clases");
  }
};

export default clasesDAO;

