import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  fitnessGoal: {
    type: String,
    enum: ["loseWeight", "gainMuscle", "improveStamina", "generalFitness"],
  },
  dietaryPreference: {
    type: String,
    enum: ["vegan", "vegetarian", "pescatarian", "keto", "noPreference"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
profileSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Profile", profileSchema);
