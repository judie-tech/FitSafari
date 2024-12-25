import Meal from "../models/meals.js";

// 1. Plan a meal
export const planMeal = async (req, res) => {
  try {
    const meal = new Meal({ userId: req.user.id, ...req.body });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get meals for a specific date
export const getMealsByDate = async (req, res) => {
  try {
    const meals = await Meal.find({
      userId: req.user.id,
      date: req.params.date,
    });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Track daily calories and macronutrients
export const trackCalories = async (req, res) => {
  try {
    const meals = await Meal.find({
      userId: req.user.id,
      date: req.params.date,
    });
    const total = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.macronutrients.protein;
        acc.carbs += meal.macronutrients.carbs;
        acc.fats += meal.macronutrients.fats;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Set nutritional goals
export const setNutritionalGoals = async (req, res) => {
  try {
    const { calorieGoal, proteinGoal, carbGoal, fatGoal } = req.body;
    const updatedMeal = await Meal.findOneAndUpdate(
      { userId: req.user.id, date: req.params.date },
      {
        $set: {
          nutritionalGoals: { calorieGoal, proteinGoal, carbGoal, fatGoal },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
