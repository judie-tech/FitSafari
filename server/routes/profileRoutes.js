import express from "express";
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middeware/auth.js"; // Make sure to import this if you're using it
import { updateProfile } from "../controllers/profileController.js";
import { checkAuth } from "../controllers/authController.js";

const router = express.Router();

// Ensure authMiddleware is applied
router.use(authMiddleware); // Apply the middleware for all profile routes

router.get("/", profileController.getProfile);
router.get("/check-auth", authMiddleware, checkAuth);
//router.put("/", profileController.updateProfile);
router.post("/updateProfile", updateProfile);

export default router;
