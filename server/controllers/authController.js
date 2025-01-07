import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilis/jwtUtils.js";

// Register function
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const salt = await bcrypt.genSalt(10);

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user with hashed password
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration failed:", error.message);

    // Handle potential database errors such as unique constraint violations
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    res.status(400).json({ message: "Registration failed" });
  }
};

// Login function
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

    // Generate token (using your existing utility function for token generation)
    generateToken(res, user); // Token is set in the response cookie
    console.log("Token cookie set successfully");

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

// Check user authentication
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
