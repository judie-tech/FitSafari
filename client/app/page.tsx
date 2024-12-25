"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  BarChart2,
  Calendar,
  Home,
  PieChartIcon,
  Settings,
  Utensils,
  Target,
  User,
  LogOut,
  Dumbbell,
  Clock,
  Lightbulb,
  Users,
  Bell,
} from "lucide-react";
import WorkoutLogger from "@/components/workout-logger";
import DietPlanner from "@/components/diet-planner";
import ProgressTracker from "@/components/progress-tracker";
import { Auth } from "@/components/auth";
import { ProfileSetup } from "@/components/profile-setup";
import ExerciseDatabase from "@/components/exercise-database";
import WorkoutSuggestions from "@/components/workout-suggestions";
import ProgressReports from "@/components/progress-reports";
import CommunityChallenges from "@/components/community-challenges";
import NotificationsReminders from "@/components/notifications-reminders";

const data = [
  { name: "Mon", calories: 2400, weight: 185 },
  { name: "Tue", calories: 2200, weight: 184 },
  { name: "Wed", calories: 2500, weight: 184 },
  { name: "Thu", calories: 2100, weight: 183 },
  { name: "Fri", calories: 2300, weight: 183 },
  { name: "Sat", calories: 2600, weight: 182 },
  { name: "Sun", calories: 2400, weight: 182 },
];

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hardest lift of all is lifting your butt off the couch.",
  "You don't have to be extreme, just consistent.",
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const goalData = [
  { name: "Completed", value: 68 },
  { name: "Remaining", value: 32 },
];

const recentWorkouts = [
  { name: "Upper Body Strength", duration: "45 min", date: "2023-06-10" },
  { name: "HIIT Cardio", duration: "30 min", date: "2023-06-09" },
  { name: "Leg Day", duration: "60 min", date: "2023-06-07" },
];

const recentMeals = [
  { name: "Grilled Chicken Salad", calories: 350, date: "2023-06-10" },
  { name: "Protein Smoothie", calories: 250, date: "2023-06-10" },
  { name: "Salmon with Quinoa", calories: 450, date: "2023-06-09" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-2xl font-bold text-center py-4 text-blue-600 dark:text-blue-400">
            FitTrack
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("overview")}
                isActive={activeTab === "overview"}
              >
                <Home className="mr-2 text-blue-500" />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("workouts")}
                isActive={activeTab === "workouts"}
              >
                <Activity className="mr-2 text-green-500" />
                <span>Workouts</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("diet")}
                isActive={activeTab === "diet"}
              >
                <Utensils className="mr-2 text-orange-500" />
                <span>Diet</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("progress")}
                isActive={activeTab === "progress"}
              >
                <BarChart2 className="mr-2 text-purple-500" />
                <span>Progress</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("exercises")}
                isActive={activeTab === "exercises"}
              >
                <Dumbbell className="mr-2 text-indigo-500" />
                <span>Exercises</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("suggestions")}
                isActive={activeTab === "suggestions"}
              >
                <Lightbulb className="mr-2 text-yellow-500" />
                <span>Suggestions</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("reports")}
                isActive={activeTab === "reports"}
              >
                <BarChart2 className="mr-2 text-red-500" />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("community")}
                isActive={activeTab === "community"}
              >
                <Users className="mr-2 text-green-500" />
                <span>Community</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveTab("notifications")}
                isActive={activeTab === "notifications"}
              >
                <Bell className="mr-2 text-purple-500" />
                <span>Notifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Fitness & Diet Tracker
            </h1>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700 dark:text-gray-300">
                Hi, {userName}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt={userName} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userName.toLowerCase()}@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
                <CardHeader>
                  <CardTitle>Motivational Quote</CardTitle>
                </CardHeader>
                <CardContent className="h-32 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl font-semibold text-center"
                    >
                      {motivationalQuotes[quoteIndex]}
                    </motion.p>
                  </AnimatePresence>
                </CardContent>
              </Card>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-red-400 to-pink-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Calories Burned
                    </CardTitle>
                    <PieChartIcon className="h-4 w-4 text-red-100" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,345</div>
                    <p className="text-xs text-red-100">
                      +20.1% from last week
                    </p>
                    <Progress
                      value={65}
                      className="mt-2 bg-red-200 [&>div]:bg-white"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Workouts Completed
                    </CardTitle>
                    <Activity className="h-4 w-4 text-green-100" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-green-100">+3 from last week</p>
                    <Progress
                      value={80}
                      className="mt-2 bg-green-200 [&>div]:bg-white"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Weight
                    </CardTitle>
                    <BarChart2 className="h-4 w-4 text-yellow-100" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">182 lbs</div>
                    <p className="text-xs text-yellow-100">
                      -3 lbs from last month
                    </p>
                    <Progress
                      value={75}
                      className="mt-2 bg-yellow-200 [&>div]:bg-white"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Goal Progress
                    </CardTitle>
                    <Settings className="h-4 w-4 text-blue-100" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-blue-100">
                      +12% from last month
                    </p>
                    <Progress
                      value={68}
                      className="mt-2 bg-blue-200 [&>div]:bg-white"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>
                      Your calories and weight trends for the week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="calories"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="weight"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Progress</CardTitle>
                    <CardDescription>
                      Your overall goal completion
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={goalData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {goalData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                    <CardDescription>
                      Your latest exercise sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentWorkouts.map((workout, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Dumbbell className="mr-2 h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{workout.name}</p>
                              <p className="text-sm text-gray-500">
                                {workout.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-gray-400" />
                            <span className="text-sm">{workout.duration}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Meals</CardTitle>
                    <CardDescription>
                      Your latest recorded meals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentMeals.map((meal, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Utensils className="mr-2 h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">{meal.name}</p>
                              <p className="text-sm text-gray-500">
                                {meal.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <PieChartIcon className="mr-1 h-4 w-4 text-gray-400" />
                            <span className="text-sm">{meal.calories} cal</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Current Goals</CardTitle>
                  <CardDescription>
                    Your active fitness and diet goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Lose 5kg by July 1st</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-green-500" />
                      <span>Run 5km under 30 minutes</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="mr-2 h-5 w-5 text-orange-500" />
                      <span>Maintain a daily calorie deficit of 500 kcal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {activeTab === "workouts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WorkoutLogger />
            </motion.div>
          )}
          {activeTab === "diet" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DietPlanner />
            </motion.div>
          )}
          {activeTab === "progress" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressTracker />
            </motion.div>
          )}
          {activeTab === "exercises" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ExerciseDatabase />
            </motion.div>
          )}
          {activeTab === "suggestions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WorkoutSuggestions />
            </motion.div>
          )}
          {activeTab === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressReports />
            </motion.div>
          )}
          {activeTab === "community" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CommunityChallenges />
            </motion.div>
          )}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NotificationsReminders />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
