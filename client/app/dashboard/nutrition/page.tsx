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
import {
  Apple,
  Beef,
  CroissantIcon as Bread,
  Fish,
  Calendar,
  Filter,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NutritionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState("all");

  const meals = [
    {
      name: "Breakfast",
      calories: 400,
      protein: 20,
      carbs: 50,
      fat: 15,
      time: "8:00 AM",
      diet: "vegan",
    },
    {
      name: "Lunch",
      calories: 600,
      protein: 30,
      carbs: 70,
      fat: 20,
      time: "12:30 PM",
      diet: "keto",
    },
    {
      name: "Dinner",
      calories: 500,
      protein: 25,
      carbs: 60,
      fat: 18,
      time: "7:00 PM",
      diet: "gluten-free",
    },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const calorieGoal = 2000;

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Nutrition Tracker
              </h1>
              <div className="flex space-x-4">
                <Select defaultValue="all" onValueChange={setSelectedDiet}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Dietary Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Meals</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Meal Plan
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Daily Nutrition Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Calories</span>
                        <span className="text-emerald-600 font-medium">
                          {totalCalories} / {calorieGoal}
                        </span>
                      </div>
                      <Progress
                        value={(totalCalories / calorieGoal) * 100}
                        className="h-2 bg-emerald-100"
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
                <Tabs defaultValue="log" className="w-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Track Nutrition</CardTitle>
                      <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                        <TabsTrigger value="log">Log Meal</TabsTrigger>
                        <TabsTrigger value="quick">Quick Add</TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="log">
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="meal-name">Meal Name</Label>
                          <Input
                            id="meal-name"
                            placeholder="e.g., Grilled Chicken Salad"
                            className="border-emerald-200 focus:ring-emerald-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="meal-time">Time</Label>
                            <Select defaultValue="breakfast">
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="breakfast">
                                  Breakfast
                                </SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="dinner">Dinner</SelectItem>
                                <SelectItem value="snack">Snack</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="diet-type">Diet Type</Label>
                            <Select defaultValue="none">
                              <SelectTrigger>
                                <SelectValue placeholder="Select diet" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="keto">Keto</SelectItem>
                                <SelectItem value="gluten-free">
                                  Gluten-Free
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-2">
                            <Label htmlFor="protein">Protein (g)</Label>
                            <Input
                              id="protein"
                              type="number"
                              placeholder="20"
                              className="border-emerald-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="carbs">Carbs (g)</Label>
                            <Input
                              id="carbs"
                              type="number"
                              placeholder="30"
                              className="border-emerald-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fat">Fat (g)</Label>
                            <Input
                              id="fat"
                              type="number"
                              placeholder="10"
                              className="border-emerald-200"
                            />
                          </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Log Meal
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="quick">
                      <div className="space-y-4">
                        <Input
                          placeholder="Search foods..."
                          className="border-emerald-200 focus:ring-emerald-500"
                        />
                        <div className="h-[200px] overflow-y-auto space-y-2">
                          {/* Quick add food items would go here */}
                          <div className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span>Banana</span>
                              <span className="text-sm text-emerald-600">
                                105 cal
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Today's Meals</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Plan Week
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {meals.map((meal, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-100 hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Clock className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-gray-500">
                            {meal.time} • {meal.diet} • P: {meal.protein}g | C:{" "}
                            {meal.carbs}g | F: {meal.fat}g
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-emerald-600">
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-emerald-100">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-emerald-500" />
        <span className="text-sm font-medium">
          {value}g / {goal}g
        </span>
      </div>
      <Progress value={progress} className="h-2 bg-emerald-100" />
      <p className="mt-2 text-sm font-medium">{name}</p>
    </div>
  );
}
