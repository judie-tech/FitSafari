import Workout from "../models/workout.js";

// Log a new workout
export const logWorkout = async (req, res) => {
  try {
    const { type, duration, intensity, notes } = req.body;

    const workout = new Workout({
      user: req.user._id,
      type,
      duration,
      intensity,
      notes,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all workouts for a user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
