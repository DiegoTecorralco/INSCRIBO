import { findUserByStudentID, saveAccessLog } from '../dao/controlDAO.js';

const registerAccess = async (req, res) => {
  const { studentID, tipo } = req.body; // Datos enviados por el lector RFID

  try {
    // Buscar usuario en la base de datos
    const usuario = await findUserByStudentID(studentID);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario está activo
    if (usuario.status !== 'Activo') {
      return res.status(403).json({ message: 'Acceso denegado, usuario inactivo' });
    }

    // Registrar el acceso en el historial
    await saveAccessLog(usuario, tipo);

    res.json({ message: `Acceso registrado: ${usuario.name} - ${tipo}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export { registerAccess };
