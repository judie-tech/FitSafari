"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, BarChart2, Home, Utensils, User, LogOut, Dumbbell, Users, Bell } from 'lucide-react'
import Dashboard from "./components/dashboard"
import WorkoutAndExercises from "./components/workout-and-exercises"
import DietPlanner from "./components/diet-planner"
import ProgressTracker from "./components/progress-tracker"
import CommunityHub from "./components/community-hub"
import Notifications from "./components/notifications"
import { Auth } from "./components/auth"
import { ProfileSetup } from "./components/profile-setup"

const navItems = [
  { icon: Home, label: "Dashboard", value: "dashboard" },
  { icon: Dumbbell, label: "Workouts & Exercises", value: "workouts" },
  { icon: Utensils, label: "Diet", value: "diet" },
  { icon: BarChart2, label: "Progress", value: "progress" },
  { icon: Users, label: "Community", value: "community" },
  { icon: Bell, label: "Notifications", value: "notifications" },
]

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [userName, setUserName] = useState("")

  const handleAuthSuccess = (name: string) => {
    setIsAuthenticated(true)
    setUserName(name)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsProfileComplete(false)
    setUserName("")
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    )
  }

  if (!isProfileComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <ProfileSetup onComplete={() => setIsProfileComplete(true)} />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-blue-900 text-white">
      {/* Sidebar */}
      <nav className="w-64 bg-blue-800 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-yellow-400 font-poppins">FitTrack</h1>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.value}>
              <Button
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className="w-full justify-start text-white"
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-blue-800 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold font-poppins text-white">{navItems.find(item => item.value === activeTab)?.label}</h2>
          <div className="flex items-center space-x-4">
            <span className="font-roboto text-white">Hi, {userName}</span>
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "workouts" && <WorkoutAndExercises />}
              {activeTab === "diet" && <DietPlanner />}
              {activeTab === "progress" && <ProgressTracker />}
              {activeTab === "community" && <CommunityHub />}
              {activeTab === "notifications" && <Notifications />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

