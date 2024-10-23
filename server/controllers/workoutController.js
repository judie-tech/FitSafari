const Workout = require("../models/Workout");

exports.logWorkout = async (req, res) => {
  try {
    const workout = new Workout({ ...req.body, userId: req.user.userId });
    await workout.save();
    res.status(201).json({ message: "Workout logged successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to log workout" });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (error) {
    res.status(404).json({ message: "Workouts not found" });
  }
};
