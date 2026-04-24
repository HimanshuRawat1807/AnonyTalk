import express from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser, registerUser, loginUser } from "../controllers/users.controller.js";

const router = express.Router()

// user routes
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// registered and login user
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router