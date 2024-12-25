"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Droplet, Trophy } from 'lucide-react'

export default function NotificationsReminders() {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: false,
    hydrationReminders: true,
    goalMilestones: true,
  })

  const [customReminder, setCustomReminder] = useState("")

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddCustomReminder = () => {
    // Here you would typically save the custom reminder
    console.log("Custom reminder added:", customReminder)
    setCustomReminder("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications & Reminders</CardTitle>
        <CardDescription>Manage your alerts and reminders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
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
              <Bell className="w-4 h-4" />
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
              <Droplet className="w-4 h-4" />
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
              <Trophy className="w-4 h-4" />
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
  )
}

