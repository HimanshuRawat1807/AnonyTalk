import express from "express";

import { createPost,getAllPosts, getSinglePost } from "../controllers/posts.controller.js";


const router =  express.Router();


// to get all post

router.post("/", createPost);

router.get("/", getAllPosts);

router.get("/:id", getSinglePost)


export default router;