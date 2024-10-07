import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./utilis/jwtUtils.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
