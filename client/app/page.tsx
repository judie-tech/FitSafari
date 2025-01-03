// page
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  BarChart2,
  Home,
  Utensils,
  User,
  LogOut,
  Dumbbell,
  Users,
  Bell,
} from "lucide-react";

import Auth from "@/components/auth";
import { ProfileSetup } from "@/components/profile-setup";
import Dashboard from "@/components/dashboard";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const navItems = [
  { icon: Home, label: "Dashboard", value: "dashboard" },
  { icon: Dumbbell, label: "Workouts & Exercises", value: "workouts" },
  { icon: Utensils, label: "Diet", value: "diet" },
  { icon: BarChart2, label: "Progress", value: "progress" },
  { icon: Users, label: "Community", value: "community" },
  { icon: Bell, label: "Notifications", value: "notifications" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [userName, setUserName] = useState("");

  const handleAuthSuccess = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    setUserName("");
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (!isProfileComplete) {
    return <ProfileSetup onComplete={() => setIsProfileComplete(true)} />;
  }

  return (
    <div className="flex h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 opacity-50" />
      </div>

      {/* Sidebar */}
      <nav className="w-64 bg-emerald-950/50 backdrop-blur-lg p-4 relative z-10 border-r border-emerald-500/20">
        <div className="mb-8 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="p-2 bg-emerald-500/20 rounded-full"
          >
            <Dumbbell className="h-6 w-6 text-emerald-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-emerald-400 font-poppins">
            FitSafari
          </h1>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <motion.li
              key={item.value}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.value
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "text-emerald-100 hover:bg-emerald-500/10"
                }`}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="absolute bottom-4 w-[calc(100%-2rem)]"
          whileHover={{ scale: 1.02 }}
        >
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-emerald-100 hover:bg-emerald-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto relative z-10">
        <header className="bg-emerald-950/50 backdrop-blur-lg p-4 flex justify-between items-center border-b border-emerald-500/20">
          <h2 className="text-xl font-semibold font-poppins text-emerald-400">
            {navItems.find((item) => item.value === activeTab)?.label}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="font-roboto text-emerald-100">Hi, {userName}</span>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt={userName} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
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
              className="bg-emerald-950/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20"
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
  );
}
