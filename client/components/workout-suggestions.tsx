"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Dumbbell } from 'lucide-react'

// Mock data for workout suggestions
const workoutSuggestions = [
  { id: 1, name: "Full Body Strength", duration: "45 min", difficulty: "Intermediate", exercises: ["Squats", "Push-ups", "Rows", "Lunges", "Plank"] },
  { id: 2, name: "HIIT Cardio", duration: "30 min", difficulty: "Advanced", exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees", "Jumping Jacks"] },
  { id: 3, name: "Yoga Flow", duration: "60 min", difficulty: "Beginner", exercises: ["Sun Salutations", "Warrior Poses", "Downward Dog", "Tree Pose", "Corpse Pose"] },
  // Add more workout suggestions...
]

export default function WorkoutSuggestions() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout)
    // Here you would typically save the selected workout to the user's schedule
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Suggestions</CardTitle>
        <CardDescription>Personalized workout recommendations based on your goals and fitness level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workoutSuggestions.map(workout => (
            <motion.div key={workout.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card className={`cursor-pointer transition-all ${selectedWorkout?.id === workout.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleSelectWorkout(workout)}>
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
                  <Button className="mt-4 w-full" onClick={() => handleSelectWorkout(workout)}>
                    <Calendar className="mr-2" />
                    Add to Schedule
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

