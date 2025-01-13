// controllers/profileController.js
import User from "../models/user.js";
import Profile from "../models/profile.js";

export const getProfile = async (req, res) => {
  try {
    // First get the user to get firstName and lastName
    const user = await User.findById(req.userId).select("-password");

    // Then get or create the profile
    let profile = await Profile.findOne({ user: req.userId });

    if (!profile) {
      // If no profile exists, create an empty one
      profile = await Profile.create({
        user: req.userId,
      });
    }

    // Combine user and profile data
    const combinedData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ...profile.toObject(),
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      height,
      weight,
      fitnessGoal,
      dietaryPreference,
    } = req.body;

    // Update user information
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update or create profile
    let profile = await Profile.findOne({ user: req.userId });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.userId },
        {
          dateOfBirth,
          height,
          weight,
          fitnessGoal,
          dietaryPreference,
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.userId,
        dateOfBirth,
        height,
        weight,
        fitnessGoal,
        dietaryPreference,
      });
    }

    // Combine user and profile data for response
    const combinedData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ...profile.toObject(),
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ message: "Failed to update profile" });
  }
};
