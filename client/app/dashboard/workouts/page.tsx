"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dumbbell,
  Plus,
  Flame,
  Clock,
  Target,
  Search,
  PlayCircle,
} from "lucide-react";

export default function WorkoutsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const workouts = [
    {
      name: "HIIT Cardio",
      duration: "30 min",
      calories: 300,
      intensity: "High",
    },
    {
      name: "Upper Body Strength",
      duration: "45 min",
      calories: 200,
      intensity: "Medium",
    },
    { name: "Yoga Flow", duration: "60 min", calories: 150, intensity: "Low" },
  ];

  const suggestedWorkouts = [
    {
      name: "Core Strength",
      duration: "20 min",
      target: "Abs & Core",
      difficulty: "Medium",
    },
    {
      name: "Lower Body Power",
      duration: "40 min",
      target: "Legs",
      difficulty: "Hard",
    },
    {
      name: "Recovery Stretch",
      duration: "25 min",
      target: "Full Body",
      difficulty: "Easy",
    },
  ];

  const exerciseDatabase = [
    {
      name: "Bench Press",
      category: "Chest",
      difficulty: "Medium",
      equipment: "Barbell",
    },
    {
      name: "Deadlift",
      category: "Back",
      difficulty: "Hard",
      equipment: "Barbell",
    },
    {
      name: "Bodyweight Squats",
      category: "Legs",
      difficulty: "Easy",
      equipment: "None",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Workouts
              </h1>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" /> New Workout
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Workout Logger */}
              <Card className="lg:col-span-2">
                <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
                  <CardTitle className="text-emerald-800 dark:text-emerald-100">
                    Workout Planner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="log" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-emerald-100 dark:bg-emerald-900">
                      <TabsTrigger
                        value="log"
                        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                      >
                        Log Workout
                      </TabsTrigger>
                      <TabsTrigger
                        value="schedule"
                        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                      >
                        Schedule Workout
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="log">
                      <form className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="workout-type">Workout Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cardio">Cardio</SelectItem>
                                <SelectItem value="strength">
                                  Strength Training
                                </SelectItem>
                                <SelectItem value="yoga">Yoga</SelectItem>
                                <SelectItem value="hiit">HIIT</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="intensity">Intensity Level</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select intensity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                              id="duration"
                              type="number"
                              placeholder="30"
                              className="border-emerald-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="calories">Calories Burned</Label>
                            <Input
                              id="calories"
                              type="number"
                              placeholder="200"
                              className="border-emerald-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sets">Sets/Reps</Label>
                            <Input
                              id="sets"
                              placeholder="3x12"
                              className="border-emerald-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Input
                            id="notes"
                            placeholder="Add workout notes..."
                            className="border-emerald-200"
                          />
                        </div>

                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Log Workout
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="schedule">
                      <div className="space-y-4 mt-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border border-emerald-200"
                        />
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          Schedule Workout
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Right Column - Recent & Suggested Workouts */}
              <div className="space-y-6">
                {/* Recent Workouts */}
                <Card>
                  <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
                    <CardTitle className="text-emerald-800 dark:text-emerald-100">
                      Recent Workouts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {workouts.map((workout, index) => (
                        <li
                          key={index}
                          className="p-3 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-lg">
                                <Dumbbell className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                                  {workout.name}
                                </p>
                                <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{workout.duration}</span>
                                  <Flame className="w-3 h-3 ml-2 mr-1" />
                                  <span>{workout.calories} cal</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300">
                              {workout.intensity}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Exercise Database Quick Access */}
                <Card>
                  <CardHeader className="border-b border-emerald-100 dark:border-emerald-800">
                    <CardTitle className="text-emerald-800 dark:text-emerald-100">
                      Exercise Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {["All", "Chest", "Back", "Legs", "Arms", "Core"].map(
                        (category) => (
                          <Button
                            key={category}
                            variant="outline"
                            size="sm"
                            className={`flex-shrink-0 ${
                              selectedCategory === category.toLowerCase()
                                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                : "border-emerald-200 text-emerald-600"
                            }`}
                            onClick={() =>
                              setSelectedCategory(category.toLowerCase())
                            }
                          >
                            {category}
                          </Button>
                        )
                      )}
                    </div>
                    <ul className="space-y-3">
                      {exerciseDatabase.map((exercise, index) => (
                        <li
                          key={index}
                          className="p-3 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-emerald-900 dark:text-emerald-100">
                                {exercise.name}
                              </p>
                              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                {exercise.category} • {exercise.equipment}
                              </p>
                            </div>
                            <PlayCircle className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
