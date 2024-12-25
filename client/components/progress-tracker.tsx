"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar, Weight, Percent } from 'lucide-react'

export default function ProgressTracker() {
  const [measurements, setMeasurements] = useState([])
  const [newMeasurement, setNewMeasurement] = useState({ date: "", weight: "", bodyFat: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMeasurement((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMeasurements((prev) => [...prev, newMeasurement])
    setNewMeasurement({ date: "", weight: "", bodyFat: "" })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Log Progress</CardTitle>
          <CardDescription>Record your weight and body fat percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newMeasurement.date}
                    onChange={handleInputChange}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <div className="relative">
                  <Weight className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={newMeasurement.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 150"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bodyFat">Body Fat %</Label>
                <div className="relative">
                  <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="bodyFat"
                    name="bodyFat"
                    type="number"
                    value={newMeasurement.bodyFat}
                    onChange={handleInputChange}
                    placeholder="e.g., 15"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Log Progress</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress Chart</CardTitle>
          <CardDescription>Visualize your weight and body fat percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          {measurements.length === 0 ? (
            <p>No progress data logged yet.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={measurements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

