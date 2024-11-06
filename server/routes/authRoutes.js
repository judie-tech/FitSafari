import express from "express";
// import { verifyToken } from "../utilis/jwtUtils.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Use the imported functions directly
router.post("/register", register);
router.post("/login", login);
//router.post("/verifyToken/:Token", verifyToken);

export default router;
