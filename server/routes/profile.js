import express from "express";
import User from "../models/users.js";

import authMiddleware from "../middleware/auth.js"; // Implement this middleware for token validation
const router = express.Router();

// Get Profile
router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// Update Profile
router.put("/", authMiddleware, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

export default router;
