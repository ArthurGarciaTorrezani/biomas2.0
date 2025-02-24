import { Router } from "express";
import { biomaController } from "../controllers/biomaController.js";

const biomaRoutes = new Router();

biomaRoutes.get("/biomas",biomaController.biomas);

export default biomaRoutes