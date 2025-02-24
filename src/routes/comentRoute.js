import { Router } from "express";
import { comentController } from "../controllers/comentController.js";


const comentRoutes = new Router();


// GET ALL COMENTS
comentRoutes.get("/coments",comentController.coments);

// GET COMENT
comentRoutes.get("/coment",comentController.coment)

// CREATE COMENT
comentRoutes.post("/comentcreate",comentController.comentCreate);

// UPDATE COMENT
comentRoutes.put("/comentupdate",comentController.comentUpdate)

// DELETE
comentRoutes.delete("/comentdelete",comentController.comentDelete)

export default comentRoutes;