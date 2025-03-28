import express from 'express';
import { login, logout, checkSession } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/session/:sessionID', checkSession);

export default authRouter;  