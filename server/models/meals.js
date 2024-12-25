import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  meals: [
    {
      type: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snack"],
        required: true,
      },
      name: String,
      calories: Number,
      macronutrients: {
        protein: Number,
        carbs: Number,
        fats: Number,
      },
      dietaryPreferences: [String], // e.g., ["vegan", "keto"]
    },
  ],
  nutritionalGoals: {
    calorieGoal: Number,
    proteinGoal: Number,
    carbGoal: Number,
    fatGoal: Number,
  },
});

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
