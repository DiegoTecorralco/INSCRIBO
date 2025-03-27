import { Router } from "express";
import clasesController from "../controller/clases.controlle.js";

const clasesRouter =Router();

clasesRouter.get("/getAll", clasesController.getAll);


export default clasesRouter;