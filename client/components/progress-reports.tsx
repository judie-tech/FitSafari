"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

// Mock data for progress reports
const weeklyData = [
  { day: "Mon", weight: 180, calories: 2200, workouts: 1 },
  { day: "Tue", weight: 179.5, calories: 2100, workouts: 1 },
  { day: "Wed", weight: 179, calories: 2300, workouts: 0 },
  { day: "Thu", weight: 178.5, calories: 2000, workouts: 1 },
  { day: "Fri", weight: 178, calories: 2400, workouts: 1 },
  { day: "Sat", weight: 177.5, calories: 2500, workouts: 0 },
  { day: "Sun", weight: 177, calories: 2200, workouts: 1 },
]

const monthlyData = [
  { month: "Jan", weight: 185, workoutsCompleted: 20, calorieGoalMet: 25 },
  { month: "Feb", weight: 183, workoutsCompleted: 22, calorieGoalMet: 24 },
  { month: "Mar", weight: 181, workoutsCompleted: 25, calorieGoalMet: 28 },
  { month: "Apr", weight: 179, workoutsCompleted: 23, calorieGoalMet: 26 },
  // Add more months...
]

export default function ProgressReports() {
  const [activeTab, setActiveTab] = useState("weekly")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Reports</CardTitle>
        <CardDescription>Track your fitness journey over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="weight" fill="#8884d8" />
                <Bar dataKey="workoutsCompleted" fill="#82ca9d" />
                <Bar dataKey="calorieGoalMet" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

