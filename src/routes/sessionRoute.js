import { Router } from "express";
import {sessionController} from "../controllers/sessionController.js";

const sessionRoutes = Router();

sessionRoutes.post("/session", sessionController.sessionCreate);

sessionRoutes.delete("/sessionoff", sessionController.sessionLogout);

export default sessionRoutes; 
