"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, Search, PlayCircle } from 'lucide-react'

export default function WorkoutAndExercises() {
  const [workouts, setWorkouts] = useState([])
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: "", notes: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleWorkoutInputChange = (e) => {
    const { name, value } = e.target
    setNewWorkout((prev) => ({ ...prev, [name]: value }))
  }

  const handleWorkoutSubmit = (e) => {
    e.preventDefault()
    setWorkouts((prev) => [...prev, newWorkout])
    setNewWorkout({ name: "", duration: "", notes: "" })
  }

  // Mock data for exercises
  const exercises = [
    { id: 1, name: "Push-ups", category: "strength", bodyPart: "chest", description: "A classic bodyweight exercise for chest, shoulders, and triceps.", videoUrl: "https://example.com/pushup-video" },
    { id: 2, name: "Squats", category: "strength", bodyPart: "legs", description: "A compound exercise that targets the legs and core.", videoUrl: "https://example.com/squat-video" },
    { id: 3, name: "Plank", category: "core", bodyPart: "core", description: "An isometric core exercise that also engages the shoulders and back.", videoUrl: "https://example.com/plank-video" },
    // Add more exercises...
  ]

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || exercise.category === selectedCategory)
  )

  // Mock data for workout suggestions
  const workoutSuggestions = [
    { id: 1, name: "Full Body Strength", duration: "45 min", difficulty: "Intermediate", exercises: ["Squats", "Push-ups", "Rows", "Lunges", "Plank"] },
    { id: 2, name: "HIIT Cardio", duration: "30 min", difficulty: "Advanced", exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees", "Jumping Jacks"] },
    { id: 3, name: "Yoga Flow", duration: "60 min", difficulty: "Beginner", exercises: ["Sun Salutations", "Warrior Poses", "Downward Dog", "Tree Pose", "Corpse Pose"] },
    // Add more workout suggestions...
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 font-poppins">Workouts & Exercises</h2>
      <Tabs defaultValue="logger" className="w-full">
        <TabsList>
          <TabsTrigger value="logger">Workout Logger</TabsTrigger>
          <TabsTrigger value="exercises">Exercise Database</TabsTrigger>
          <TabsTrigger value="suggestions">Workout Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value="logger">
          <Card>
            <CardHeader>
              <CardTitle>Log a Workout</CardTitle>
              <CardDescription>Record your latest workout session</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWorkoutSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Workout Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newWorkout.name}
                      onChange={handleWorkoutInputChange}
                      placeholder="e.g., Upper Body Strength"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={newWorkout.duration}
                      onChange={handleWorkoutInputChange}
                      placeholder="e.g., 45"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={newWorkout.notes}
                      onChange={handleWorkoutInputChange}
                      placeholder="Any additional notes about your workout"
                    />
                  </div>
                </div>
                <Button type="submit">Log Workout</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
              <CardDescription>Your logged workout sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {workouts.length === 0 ? (
                <p>No workouts logged yet.</p>
              ) : (
                <ul className="space-y-4">
                  {workouts.map((workout, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b pb-2"
                    >
                      <h3 className="font-semibold flex items-center">
                        <Dumbbell className="mr-2" />
                        {workout.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <span className="mr-2">Duration:</span> {workout.duration} minutes
                      </p>
                      <p className="text-sm">{workout.notes}</p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Database</CardTitle>
              <CardDescription>Browse and learn about various exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search exercises"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredExercises.map(exercise => (
                  <motion.div key={exercise.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Dumbbell className="mr-2" />
                          {exercise.name}
                        </CardTitle>
                        <CardDescription>{exercise.category} | {exercise.bodyPart}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2">{exercise.description}</p>
                        <a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline">
                          <PlayCircle className="mr-1" />
                          Watch Video
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Workout Suggestions</CardTitle>
              <CardDescription>Personalized workout recommendations based on your goals and fitness level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workoutSuggestions.map(workout => (
                  <motion.div key={workout.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Dumbbell className="mr-2" />
                          {workout.name}
                        </CardTitle>
                        <CardDescription>{workout.duration} | {workout.difficulty}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside">
                          {workout.exercises.map((exercise, index) => (
                            <li key={index}>{exercise}</li>
                          ))}
                        </ul>
                        <Button className="mt-4 w-full">
                          Add to Schedule
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

