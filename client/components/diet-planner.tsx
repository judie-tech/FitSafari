"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Utensils, Calendar, FileText } from 'lucide-react'

export default function DietPlanner() {
  const [meals, setMeals] = useState([])
  const [newMeal, setNewMeal] = useState({ name: "", type: "", calories: "", notes: "" })
  const [mealPlan, setMealPlan] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMeal((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setNewMeal((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMeals((prev) => [...prev, newMeal])
    setNewMeal({ name: "", type: "", calories: "", notes: "" })
  }

  const generateMealPlan = () => {
    const mockMealPlan = [
      { day: "Monday", breakfast: "Oatmeal with berries", lunch: "Grilled chicken salad", dinner: "Salmon with roasted vegetables" },
      { day: "Tuesday", breakfast: "Greek yogurt with granola", lunch: "Vegetable soup with whole grain bread", dinner: "Stir-fry tofu with mixed vegetables" },
    ]
    setMealPlan(mockMealPlan)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Log a Meal</CardTitle>
          <CardDescription>Record your meals and track your calorie intake</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Meal Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newMeal.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Grilled Chicken Salad"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Meal Type</Label>
                <Select onValueChange={handleSelectChange} value={newMeal.type}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={newMeal.calories}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newMeal.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about your meal"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Log Meal</Button>
        </CardFooter>
      </Card>
      {/* Rest of the component remains the same */}
    </div>
  )
}

