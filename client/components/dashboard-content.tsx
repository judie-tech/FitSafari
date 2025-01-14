import {
  Activity,
  TrendingUp,
  Zap,
  Target,
  Clock,
  Flame,
  Apple,
} from "lucide-react";
import { ProgressChart } from "./progress-chart";
import { WorkoutLog } from "./workout-log";
import { MealPlan } from "./meal-plan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

export function DashboardContent() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "The hard days are the best because that's when champions are made.",
    "Your health is an investment, not an expense.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const recentWorkouts = [
    {
      day: "Today",
      name: "Upper Body Strength",
      duration: "45 mins",
      calories: 320,
    },
    {
      day: "Yesterday",
      name: "HIIT Cardio",
      duration: "30 mins",
      calories: 400,
    },
    {
      day: "2 days ago",
      name: "Yoga Flow",
      duration: "60 mins",
      calories: 250,
    },
    {
      day: "3 days ago",
      name: "Lower Body",
      duration: "50 mins",
      calories: 380,
    },
  ];

  const recentMeals = [
    {
      time: "Breakfast",
      name: "Oatmeal with Berries",
      calories: 320,
      protein: "15g",
    },
    {
      time: "Lunch",
      name: "Grilled Chicken Salad",
      calories: 450,
      protein: "35g",
    },
    { time: "Snack", name: "Protein Smoothie", calories: 220, protein: "20g" },
  ];

  const goals = [
    { name: "Weekly Workouts", current: 3, target: 5 },
    { name: "Monthly Weight Loss", current: 2, target: 3 },
    { name: "Daily Protein Goal", current: 80, target: 120 },
    { name: "Water Intake (L)", current: 2.5, target: 3 },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mb-6 bg-emerald-800 dark:bg-emerald-900 p-3 rounded-lg">
        <p className="text-emerald-100 text-sm font-medium text-center italic animate-fade-in">
          "{motivationalQuotes[quoteIndex]}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={Activity}
              label="Daily Steps"
              value="8,439"
              target="10,000"
            />
            <StatCard
              icon={TrendingUp}
              label="Weight"
              value="68 kg"
              target="65 kg"
            />
            <StatCard
              icon={Zap}
              label="Calories Burned"
              value="487"
              target="600"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Workouts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-emerald-900 dark:text-emerald-100">
                          {workout.name}
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                          {workout.day}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                        <span>{workout.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Flame className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                        <span>{workout.calories} cal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Recent Meals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-emerald-900 dark:text-emerald-100">
                        {meal.time}
                      </span>
                      <span className="text-sm text-emerald-600 dark:text-emerald-400">
                        {meal.calories} cal
                      </span>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {meal.name}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Protein: {meal.protein}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 md:col-span-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Goal Completion Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {goals.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-emerald-900 dark:text-emerald-100">
                        {goal.name}
                      </span>
                      <span className="text-sm text-emerald-600 dark:text-emerald-400">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2">
                      <div
                        className="bg-emerald-500 dark:bg-emerald-400 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(goal.current / goal.target) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, target }) {
  const progress = (parseInt(value) / parseInt(target)) * 100;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900">
              <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              {label}
            </span>
          </div>
          <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {value}
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-emerald-600 dark:text-emerald-400">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100 dark:bg-emerald-900">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 dark:bg-emerald-400 transition-all duration-300"
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardContent;
