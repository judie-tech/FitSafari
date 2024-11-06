import User from "../models/user.js";
import { generateToken } from "../utilis/jwtUtils.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    // const token = generateToken(res, user);
    // console.log("Token generated:", token);
    // res.json({ token });
    generateToken(res, user); // No need to assign token since cookie is set in `generateToken`
    console.log("Token cookie set successfully");
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};
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
