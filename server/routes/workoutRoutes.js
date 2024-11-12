import express from "express";
import { logWorkout, getWorkouts } from "../controllers/workoutController.js";
import authMiddleware from "../middeware/auth.js";

export const router = express.Router();

router.post("/log", authMiddleware, logWorkout);
router.get("/", authMiddleware, getWorkouts);

export default router;
