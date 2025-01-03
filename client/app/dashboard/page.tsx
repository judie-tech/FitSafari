"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Progress,
} from "@/components/ui";
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
import { Activity, Utensils, Droplet, Moon } from "lucide-react";

const activityData = [
  { name: "Mon", calories: 2400, steps: 10000 },
  { name: "Tue", calories: 1398, steps: 8000 },
  { name: "Wed", calories: 9800, steps: 15000 },
  { name: "Thu", calories: 3908, steps: 12000 },
  { name: "Fri", calories: 4800, steps: 11000 },
  { name: "Sat", calories: 3800, steps: 9000 },
  { name: "Sun", calories: 4300, steps: 10500 },
];

const nutritionData = [
  { name: "Protein", value: 30 },
  { name: "Carbs", value: 50 },
  { name: "Fat", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [motivationalQuote, setMotivationalQuote] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Simulating fetching a motivational quote
    const quotes = [
      "The only bad workout is the one that didn't happen.",
      "Your body can stand almost anything. It's your mind that you have to convince.",
      "The hardest lift of all is lifting your butt off the couch.",
      "Fitness is not about being better than someone else. It's about being better than you used to be.",
      "Wake up with determination. Go to bed with satisfaction.",
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {greeting}, John!
          </h2>
          <p className="text-gray-600">Here's your fitness summary for today</p>
        </div>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="lg"
          className="w-16 h-16"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-400 to-emerald-600">
            <CardBody className="text-white">
              <Activity className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold">1,234</h3>
              <p>Calories Burned</p>
            </CardBody>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600">
            <CardBody className="text-white">
              <Utensils className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold">1,800</h3>
              <p>Calories Consumed</p>
            </CardBody>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-400 to-purple-600">
            <CardBody className="text-white">
              <Droplet className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold">6/8</h3>
              <p>Water Intake (cups)</p>
            </CardBody>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-indigo-400 to-indigo-600">
            <CardBody className="text-white">
              <Moon className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold">7h 30m</h3>
              <p>Sleep Duration</p>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Weekly Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
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
                      dataKey="steps"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Nutrition Breakdown</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Goal Progress</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Weight Loss</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} color="success" className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Workout Frequency</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} color="primary" className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Nutrition Plan Adherence
                  </span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} color="warning" className="h-2" />
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8"
      >
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-700">
          <CardBody>
            <p className="text-center text-xl font-semibold text-white italic">
              "{motivationalQuote}"
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
