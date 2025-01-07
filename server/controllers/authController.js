// authController.js
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Login function
export const login = async (req, res) => {
  // ... login logic ...
};

// Register function
export const register = async (req, res) => {
  // ... register logic ...
};

// Check auth function
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// If you want to use default export as well
const authController = {
  login,
  register,
  checkAuth,
};

export default authController;
