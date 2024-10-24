import express from "express";
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middeware/auth.js"; // Make sure to import this if you're using it

const router = express.Router();

// Ensure authMiddleware is applied
router.use(authMiddleware); // Apply the middleware for all profile routes

router.get("/", profileController.getProfile);
router.put("/", profileController.updateProfile);

export default router;
