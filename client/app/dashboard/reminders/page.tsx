"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Calendar, Clock, Trash2 } from "lucide-react";

export default function RemindersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const reminders = [
    {
      id: 1,
      title: "Morning Workout",
      time: "07:00 AM",
      days: ["Mon", "Wed", "Fri"],
      active: true,
    },
    {
      id: 2,
      title: "Take Vitamins",
      time: "08:00 AM",
      days: ["Every day"],
      active: true,
    },
    {
      id: 3,
      title: "Evening Run",
      time: "06:00 PM",
      days: ["Tue", "Thu"],
      active: false,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Reminders</h1>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Reminder</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-title">Reminder Title</Label>
                    <Input
                      id="reminder-title"
                      placeholder="e.g., Take Vitamins"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reminder-time">Time</Label>
                      <Input id="reminder-time" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reminder-frequency">Frequency</Label>
                      <Select>
                        <SelectTrigger id="reminder-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Add Reminder</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {reminders.map((reminder) => (
                    <li
                      key={reminder.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <Bell
                          className={`w-6 h-6 ${
                            reminder.active
                              ? "text-indigo-500"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{reminder.title}</h3>
                          <p className="text-sm text-gray-500">
                            <Clock className="inline w-4 h-4 mr-1" />
                            {reminder.time} |
                            <Calendar className="inline w-4 h-4 mx-1" />
                            {reminder.days.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Switch checked={reminder.active} />
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-5 h-5 text-gray-500" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
