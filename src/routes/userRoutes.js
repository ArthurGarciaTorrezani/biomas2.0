import { Router } from "express";
import { userController } from "../controllers/userController.js";
import {authenticateSession} from "../middlewares/auth"

const userRoutes = Router();

// GET ALL USERS
userRoutes.get("/users",userController.users);

// GET USER
userRoutes.get("/user",userController.user)

// CREATE USER
userRoutes.post("/usercreate",userController.userCreate);

// UPDATE USER
userRoutes.put("/userupdate",userController.userUpdate);

userRoutes.post("/userdelete",authenticateSession,userController.userDelete)

export default userRoutes;