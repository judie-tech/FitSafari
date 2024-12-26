"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Scale, Ruler, Target } from 'lucide-react'

export function ProfileSetup({ onComplete }: { onComplete: () => void }) {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    dietaryPreferences: "",
  })

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[400px] bg-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-400 font-poppins">Complete Your Profile</CardTitle>
          <CardDescription className="text-gray-300">Help us personalize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-blue-700 text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={profile.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="bg-blue-700 text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={profile.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="bg-blue-700 text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={profile.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="bg-blue-700 text-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select onValueChange={(value) => handleChange("goal", value)}>
                  <SelectTrigger id="goal" className="bg-blue-700 text-white">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-700 text-white">
                    <SelectItem value="lose_weight">Lose Weight</SelectItem>
                    <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                    <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="activity">Activity Level</Label>
                <Select onValueChange={(value) => handleChange("activityLevel", value)}>
                  <SelectTrigger id="activity" className="bg-blue-700 text-white">
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-700 text-white">
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly_active">Lightly Active</SelectItem>
                    <SelectItem value="moderately_active">Moderately Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                    <SelectItem value="extra_active">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Select onValueChange={(value) => handleChange("dietaryPreferences", value)}>
                  <SelectTrigger id="dietaryPreferences" className="bg-blue-700 text-white">
                    <SelectValue placeholder="Select your dietary preferences" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-700 text-white">
                    <SelectItem value="no_preference">No Specific Preference</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                    <SelectItem value="gluten_free">Gluten-free</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-500" onClick={handleSubmit}>Complete Profile</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

