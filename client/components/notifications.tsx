"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Droplet, Trophy, X } from 'lucide-react'

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: false,
    hydrationReminders: true,
    goalMilestones: true,
  })

  const [customReminder, setCustomReminder] = useState("")
  const [customReminders, setCustomReminders] = useState<string[]>([])

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddCustomReminder = () => {
    if (customReminder.trim() !== "") {
      setCustomReminders(prev => [...prev, customReminder.trim()])
      setCustomReminder("")
    }
  }

  const handleRemoveCustomReminder = (index: number) => {
    setCustomReminders(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-400">Notifications & Reminders</CardTitle>
          <CardDescription>Manage your alerts and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <Label htmlFor="workout-reminders">Workout Reminders</Label>
              </div>
              <Switch
                id="workout-reminders"
                checked={notifications.workoutReminders}
                onCheckedChange={() => handleNotificationChange('workoutReminders')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-yellow-400" />
                <Label htmlFor="meal-reminders">Meal Reminders</Label>
              </div>
              <Switch
                id="meal-reminders"
                checked={notifications.mealReminders}
                onCheckedChange={() => handleNotificationChange('mealReminders')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplet className="w-4 h-4 text-yellow-400" />
                <Label htmlFor="hydration-reminders">Hydration Reminders</Label>
              </div>
              <Switch
                id="hydration-reminders"
                checked={notifications.hydrationReminders}
                onCheckedChange={() => handleNotificationChange('hydrationReminders')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <Label htmlFor="goal-milestones">Goal Milestones</Label>
              </div>
              <Switch
                id="goal-milestones"
                checked={notifications.goalMilestones}
                onCheckedChange={() => handleNotificationChange('goalMilestones')}
              />
            </div>
            <div className="pt-4">
              <Label htmlFor="custom-reminder">Add Custom Reminder</Label>
              <div className="flex mt-1.5">
                <Input
                  id="custom-reminder"
                  value={customReminder}
                  onChange={(e) => setCustomReminder(e.target.value)}
                  placeholder="Enter your custom reminder"
                  className="flex-grow"
                />
                <Button onClick={handleAddCustomReminder} className="ml-2">Add</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {customReminders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-yellow-400">Custom Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.ul className="space-y-2">
              {customReminders.map((reminder, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between bg-navy-blue-light p-2 rounded-md"
                >
                  <span>{reminder}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCustomReminder(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

