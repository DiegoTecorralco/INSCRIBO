import GrupoController from "../controller/grupos.controller.js"
import { Router } from "express";

const routerGrupo = Router();
routerGrupo.get('/grupos', GrupoController.obtenerGrupos);
routerGrupo.post('/grupos', GrupoController.crearGrupo);
routerGrupo.get('/grupos/:nombre', GrupoController.obtenerGrupoPorNombre);
routerGrupo.put('/grupos/:nombre', GrupoController.actualizarGrupo);
routerGrupo.delete('/grupos/:nombre', GrupoController.eliminarGrupo);
routerGrupo.get("/estudiante/:matricula", GrupoController.buscarEstudiantePorMatricula);


export default routerGrupo;
