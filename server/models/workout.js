import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    totalDuration: {
      type: Number,
      default: 0,
    },
    totalWeight: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true } }
);

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((prev, curr) => prev + curr.duration, 0);
});

workoutSchema.virtual("totalWeight").get(function () {
  return this.exercises.reduce((prev, curr) => prev + (curr.weight || 0), 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
