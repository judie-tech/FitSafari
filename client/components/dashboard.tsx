import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Activity,
  Dumbbell,
  Target,
  Flame,
  Trophy,
  TrendingUp,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  // Sample data - in a real app, this would come from your backend
  const stats = [
    {
      label: "Workouts Completed",
      value: "12",
      icon: Activity,
      trend: "+2 this week",
    },
    {
      label: "Active Minutes",
      value: "360",
      icon: Flame,
      trend: "+45 from last week",
    },
    {
      label: "Current Streak",
      value: "5 days",
      icon: Trophy,
      trend: "Personal best!",
    },
    { label: "Goals Met", value: "8/10", icon: Target, trend: "80% complete" },
  ];

  const recentWorkouts = [
    { name: "Upper Body Strength", date: "2 days ago", duration: "45 mins" },
    { name: "HIIT Cardio", date: "3 days ago", duration: "30 mins" },
    { name: "Core Workout", date: "Yesterday", duration: "20 mins" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-300">
            Welcome to Your Fitness Journey
          </h1>
          <p className="text-emerald-200 mt-1">
            Track your progress and crush your goals
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/50 p-2 rounded-lg">
          <Dumbbell className="h-5 w-5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">
            Fitness Level: Intermediate
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-emerald-900/50 border-emerald-600/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-800/50 rounded-lg">
                  <stat.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <span className="text-sm text-emerald-400">{stat.trend}</span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-emerald-300">
                  {stat.value}
                </p>
                <p className="text-sm text-emerald-400">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-emerald-900/50 border-emerald-600/20">
        <CardHeader>
          <CardTitle className="text-emerald-300">Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-emerald-800/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-700/50 rounded-full">
                    <Dumbbell className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">
                      {workout.name}
                    </p>
                    <p className="text-sm text-emerald-400">{workout.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">{workout.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <Card className="bg-emerald-900/50 border-emerald-600/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-emerald-300">Weekly Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-emerald-400">
            Progress chart will be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
