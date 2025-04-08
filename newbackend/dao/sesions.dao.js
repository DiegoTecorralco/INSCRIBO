import Session from '../models/Sesions.js';

const createSession = async (sessionData) => {
    const newSession = new Session(sessionData);
    return newSession.save();
}

const findActiveSession = async (sessionID) => {
    return Session.findOne({ sessionID, status: 'Activa' })
        .populate('teacher', 'name lastname matricula')
        .exec();
}

const updateSession = async (sessionID, updateData) => {
    return Session.findOneAndUpdate({ sessionID }, updateData, { new: true });
}

export {
    createSession,
    findActiveSession,
    updateSession
}