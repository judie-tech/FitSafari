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
import { Dumbbell, Plus } from "lucide-react";

export default function WorkoutsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const workouts = [
    { name: "Morning Cardio", duration: "30 min", calories: 300 },
    { name: "Strength Training", duration: "45 min", calories: 200 },
    { name: "Yoga", duration: "60 min", calories: 150 },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Workouts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Workout Planner</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="log">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="log">Log Workout</TabsTrigger>
                      <TabsTrigger value="schedule">
                        Schedule Workout
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="log">
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="workout-name">Workout Name</Label>
                          <Input
                            id="workout-name"
                            placeholder="e.g., Morning Run"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input id="duration" type="number" placeholder="30" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="calories">Calories Burned</Label>
                          <Input
                            id="calories"
                            type="number"
                            placeholder="200"
                          />
                        </div>
                        <Button>Log Workout</Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="schedule">
                      <div className="space-y-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                        <Button className="w-full">Schedule Workout</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {workouts.map((workout, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Dumbbell className="w-5 h-5 mr-3 text-indigo-500" />
                          <div>
                            <p className="font-medium">{workout.name}</p>
                            <p className="text-sm text-gray-500">
                              {workout.duration}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-indigo-600">
                          {workout.calories} cal
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" /> Add Workout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
