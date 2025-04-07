import { v4 as uuidv4 } from 'uuid';
import { encryptData, decryptData } from '../utils/crypto.util.js';
import Teacher from '../models/Teachers.js';
import Session from '../models/Sesions.js';

export const login = async (req, res) => {
    const { matricula, password } = req.body;
    
    if (!matricula || !password) {
        return res.status(400).json({ 
            success: false,
            error: 'Matrícula y contraseña son requeridas' 
        });
    }

    try {
        // 1. Buscar docente por matrícula
        const teacher = await Teacher.findOne({ matricula });
        
        if (!teacher) {
            return res.status(404).json({
                success: false,
                error: 'Matrícula no registrada'
            });
        }

        // 2. Verificar contraseña
        const decryptedPassword = decryptData(teacher.password);
        
        if (password !== decryptedPassword) {
            return res.status(401).json({
                success: false,
                error: 'Contraseña incorrecta'
            });
        }

        // 3. Crear sesión
        const sessionID = uuidv4();
        const newSession = new Session({
            sessionID,
            teacher: teacher._id,
            matricula,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });

        await newSession.save();

        // 4. Actualizar último acceso del docente
        teacher.lastAccessed = new Date();
        await teacher.save();

        // 5. Responder con datos seguros
        res.status(200).json({
            success: true,
            sessionID,
            teacher: {
                _id: teacher._id,
                name: teacher.name,
                lastname: teacher.lastname,
                matricula: teacher.matricula
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            error: 'Error en el servidor'
        });
    }
};

export const logout = async (req, res) => {
    const { sessionID } = req.body;

    try {
        const session = await Session.findOneAndUpdate(
            { sessionID, status: 'Activa' },
            { status: 'Cerrada' },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'Sesión no encontrada o ya cerrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });

    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cerrar sesión'
        });
    }
};

export const checkSession = async (req, res) => {
    const { sessionID } = req.params;

    try {
        const session = await Session.findOne({ sessionID })
            .populate('teacher', 'name lastname matricula')
            .exec();

        if (!session || session.status !== 'Activa') {
            return res.status(401).json({
                success: false,
                error: 'Sesión inválida o expirada'
            });
        }

        // Verificar inactividad (20 minutos)
        const inactiveTime = (new Date() - session.lastAccessed) / (1000 * 60);
        
        if (inactiveTime > 20) {
            session.status = 'Expirada';
            await session.save();
            return res.status(401).json({
                success: false,
                error: 'Sesión expirada por inactividad'
            });
        }

        // Actualizar último acceso
        session.lastAccessed = new Date();
        await session.save();

        res.status(200).json({
            success: true,
            session: {
                id: session._id,
                status: session.status,
                teacher: session.teacher
            }
        });

    } catch (error) {
        console.error('Error verificando sesión:', error);
        res.status(500).json({
            success: false,
            error: 'Error al verificar sesión'
        });
    }
};