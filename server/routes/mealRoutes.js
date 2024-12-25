import express from "express";
import {
  planMeal,
  getMealsByDate,
  trackCalories,
  setNutritionalGoals,
} from "../controllers/mealController.js";
import authMiddleware from "../middeware/auth.js";

const router = express.Router();

// Plan a meal (requires authentication)
router.post("/plan", authMiddleware, planMeal);

// Get meals by date (requires authentication)
router.get("/:date", authMiddleware, getMealsByDate);

// Track daily calories (requires authentication)
router.get("/track/:date", authMiddleware, trackCalories);

// Set nutritional goals (requires authentication)
router.put("/goals/:date", authMiddleware, setNutritionalGoals);

export default router;
