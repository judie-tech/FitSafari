import User from "../models/user.js";

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
      runValidators: true, // This ensures validation rules are applied
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ message: "Failed to update profile" });
  }
};

export default {
  getProfile,
};
