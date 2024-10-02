import { model, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fitnessGoals: { type: String },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  activityLevel: { type: String },
  dietaryPreferences: { type: String },
});

export const User = model("User", userSchema);
