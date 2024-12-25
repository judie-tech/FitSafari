import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import Workout from "./routes/workoutRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import cookieParser from "cookie-parser";
//import { verifyToken } from "./utilis/jwtUtils.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workouts", Workout);
app.use("/api/meals", mealRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
