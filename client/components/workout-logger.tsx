"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Clock, FileText } from 'lucide-react'

export default function WorkoutLogger() {
  const [workouts, setWorkouts] = useState([])
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: "", notes: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewWorkout((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setWorkouts((prev) => [...prev, newWorkout])
    setNewWorkout({ name: "", duration: "", notes: "" })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Log a Workout</CardTitle>
          <CardDescription>Record your latest workout session</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newWorkout.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder="e.g., 45"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newWorkout.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about your workout"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Log Workout</Button>
        </CardFooter>
      </Card>
      <Card>
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
                    <Clock className="mr-2" />
                    Duration: {workout.duration} minutes
                  </p>
                  <p className="text-sm flex items-center">
                    <FileText className="mr-2" />
                    {workout.notes}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

