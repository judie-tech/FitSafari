// routes/profileRoutes.js
import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middeware/auth.js";

const router = express.Router();

// Apply auth middleware to all profile routes
router.use(authMiddleware);

router.get("/", getProfile);
router.post("/updateProfile", updateProfile);

export default router;
