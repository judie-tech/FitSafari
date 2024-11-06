import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  intensity: { type: String, required: true },
  notes: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
// In this file, we have defined a schema for a workout. It has a reference to a user, a type, duration, intensity, notes, and date. The user field is a reference to the User model. We then create a model using the schema and export it.
