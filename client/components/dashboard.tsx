"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Flame, Droplet, Scale, Utensils, Dumbbell } from 'lucide-react'

const data = [
  { name: 'Mon', calories: 2400, weight: 185 },
  { name: 'Tue', calories: 2200, weight: 184 },
  { name: 'Wed', calories: 2500, weight: 184 },
  { name: 'Thu', calories: 2100, weight: 183 },
  { name: 'Fri', calories: 2300, weight: 183 },
  { name: 'Sat', calories: 2600, weight: 182 },
  { name: 'Sun', calories: 2400, weight: 182 },
]

const statCards = [
  { title: "Daily Steps", value: "8,439", icon: Activity, color: "text-green-400" },
  { title: "Calories Burned", value: "384", icon: Flame, color: "text-orange-400" },
  { title: "Water Intake", value: "2.5L", icon: Droplet, color: "text-blue-400" },
  { title: "Current Weight", value: "182 lbs", icon: Scale, color: "text-purple-400" },
]

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hardest lift of all is lifting your butt off the couch.",
]

const recentWorkouts = [
  { name: "Morning Run", duration: "30 mins" },
  { name: "Yoga Session", duration: "45 mins" },
  { name: "Weight Training", duration: "60 mins" },
]

const recentMeals = [
  { name: "Healthy Breakfast", calories: 350 },
  { name: "Protein-packed Lunch", calories: 450 },
  { name: "Light Dinner", calories: 300 },
]

export default function Dashboard() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % motivationalQuotes.length)
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-blue-400">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
            <p className="text-white text-lg">
              {motivationalQuotes[currentQuote]}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-blue-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <Progress value={70} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-blue-800">
          <CardHeader>
            <CardTitle className="text-white">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" stroke="#e2e8f0" />
                  <YAxis yAxisId="left" stroke="#e2e8f0" />
                  <YAxis yAxisId="right" orientation="right" stroke="#e2e8f0" />
                  <Tooltip contentStyle={{ backgroundColor: '#2a4365', border: 'none' }} />
                  <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-blue-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 text-white"
                  >
                    <Dumbbell className="h-6 w-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">{workout.name}</p>
                      <p className="text-sm text-gray-300">Duration: {workout.duration}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-blue-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentMeals.map((meal, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 text-white"
                  >
                    <Utensils className="h-6 w-6 text-yellow-400" />
                    <div>
                      <p className="font-semibold">{meal.name}</p>
                      <p className="text-sm text-gray-300">Calories: {meal.calories}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-blue-800">
        <CardHeader>
          <CardTitle className="text-white">Goal Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Daily Step Goal</span>
                <span>8,439 / 10,000</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Weekly Workout Goal</span>
                <span>4 / 5 days</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-white mb-1">
                <span>Weight Loss Goal</span>
                <span>7 / 10 lbs</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

