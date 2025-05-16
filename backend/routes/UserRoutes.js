import { registerUser, loginUser } from "../controller/UserController.js";
import express from "express";
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
