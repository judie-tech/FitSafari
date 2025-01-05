"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Apple, Beef, CroissantIcon as Bread, Fish } from "lucide-react";

export default function NutritionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const meals = [
    { name: "Breakfast", calories: 400, protein: 20, carbs: 50, fat: 15 },
    { name: "Lunch", calories: 600, protein: 30, carbs: 70, fat: 20 },
    { name: "Dinner", calories: 500, protein: 25, carbs: 60, fat: 18 },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieGoal = 2000;

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Nutrition Tracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Daily Nutrition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Calories</span>
                        <span>
                          {totalCalories} / {calorieGoal}
                        </span>
                      </div>
                      <Progress
                        value={(totalCalories / calorieGoal) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <NutrientCard
                        name="Protein"
                        value={75}
                        goal={100}
                        icon={Fish}
                      />
                      <NutrientCard
                        name="Carbs"
                        value={180}
                        goal={250}
                        icon={Bread}
                      />
                      <NutrientCard
                        name="Fat"
                        value={53}
                        goal={65}
                        icon={Beef}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Log Meal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meal-name">Meal Name</Label>
                      <Input
                        id="meal-name"
                        placeholder="e.g., Grilled Chicken Salad"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input id="calories" type="number" placeholder="300" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="protein">Protein (g)</Label>
                        <Input id="protein" type="number" placeholder="20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carbs">Carbs (g)</Label>
                        <Input id="carbs" type="number" placeholder="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fat">Fat (g)</Label>
                        <Input id="fat" type="number" placeholder="10" />
                      </div>
                    </div>
                    <Button className="w-full">Log Meal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {meals.map((meal, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-gray-500">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                        </p>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">
                        {meal.calories} cal
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function NutrientCard({ name, value, goal, icon: Icon }) {
  const progress = (value / goal) * 100;
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-indigo-500" />
        <span className="text-sm font-medium">
          {value}g / {goal}g
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="mt-2 text-sm font-medium">{name}</p>
    </div>
  );
}
