import mongoose from "mongoose"; // Import mongoose
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
