import { Router } from "express";
import { postController } from "../controllers/postController.js";


const postRoutes = new Router();

// GET ALL POSTS
postRoutes.get("/posts",postController.posts);

// GET POST
postRoutes.get("/post",postController.post);

// posts com comentarios
postRoutes.get("/postcomentarios",postController.postsComComentarios);

// CREATE POST
postRoutes.post("/postcreate",postController.postCreate);

// UPDATE POST
postRoutes.put("/postupdate",postController.postUpdate);

// GET POSTS AND COMENTS
postRoutes.get("/postscoments",postController.postscoments);

// DELETE POST
postRoutes.delete("/postdelete",postController.postDelete)

export default postRoutes;
