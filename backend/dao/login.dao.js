import Teacher from '../models/Teachers.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Clave secreta para JWT (asegúrate de usar variables de entorno en producción)
const JWT_SECRET = 'tu_clave_secreta';

export const login = async (req, res) => {
    const { matricula, password } = req.body;

    try {
        // Buscar al profesor por matrícula
        const teacher = await Teacher.findOne({ matricula });
        if (!teacher) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: teacher._id, matricula: teacher.matricula }, JWT_SECRET, {
            expiresIn: '1h',
        });

        // Actualizar el campo `lastAccessed`
        teacher.lastAccessed = new Date();
        await teacher.save();

        res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export const register = async (req, res) => {
    const { name, lastname, matricula, password } = req.body;

    try {
        // Verificar si la matrícula ya existe
        const existingTeacher = await Teacher.findOne({ matricula });
        if (existingTeacher) {
            return res.status(400).json({ message: 'La matrícula ya está registrada' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo profesor
        const newTeacher = new Teacher({
            name,
            lastname,
            matricula,
            password: hashedPassword,
        });

        await newTeacher.save();
        res.status(201).json({ message: 'Registro exitoso', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};