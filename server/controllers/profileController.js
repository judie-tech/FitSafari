import User from "../models/user.js";

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to update profile" });
  }
};

export default {
  getProfile,
  updateProfile,
};
