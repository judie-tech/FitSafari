"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Dumbbell, PlayCircle } from 'lucide-react'

// Mock data for exercises
const exercises = [
  { id: 1, name: "Push-ups", category: "strength", bodyPart: "chest", description: "A classic bodyweight exercise for chest, shoulders, and triceps.", videoUrl: "https://example.com/pushup-video" },
  { id: 2, name: "Squats", category: "strength", bodyPart: "legs", description: "A compound exercise that targets the legs and core.", videoUrl: "https://example.com/squat-video" },
  { id: 3, name: "Plank", category: "core", bodyPart: "core", description: "An isometric core exercise that also engages the shoulders and back.", videoUrl: "https://example.com/plank-video" },
  // Add more exercises...
]

export default function ExerciseDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("")

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || exercise.category === selectedCategory) &&
    (selectedBodyPart === "" || exercise.bodyPart === selectedBodyPart)
  )

  return (
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
          <Select onValueChange={setSelectedBodyPart}>
            <SelectTrigger>
              <SelectValue placeholder="Body Part" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Body Parts</SelectItem>
              <SelectItem value="chest">Chest</SelectItem>
              <SelectItem value="back">Back</SelectItem>
              <SelectItem value="legs">Legs</SelectItem>
              <SelectItem value="arms">Arms</SelectItem>
              <SelectItem value="shoulders">Shoulders</SelectItem>
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
  )
}

