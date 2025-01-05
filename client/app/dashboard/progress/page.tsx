"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Calendar } from "lucide-react";

export default function ProgressPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const weightData = [
    { date: "1/1", weight: 70 },
    { date: "1/8", weight: 69.5 },
    { date: "1/15", weight: 69 },
    { date: "1/22", weight: 68.5 },
    { date: "1/29", weight: 68.2 },
    { date: "2/5", weight: 67.8 },
    { date: "2/12", weight: 67.5 },
  ];

  const measurementData = [
    { date: "1/1", chest: 95, waist: 80, hips: 100 },
    { date: "1/15", chest: 94, waist: 79, hips: 99 },
    { date: "1/29", chest: 93, waist: 78, hips: 98 },
    { date: "2/12", chest: 92, waist: 77, hips: 97 },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Progress Tracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      weight: {
                        label: "Weight",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="var(--color-weight)"
                          name="Weight (kg)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      chest: {
                        label: "Chest",
                        color: "hsl(var(--chart-1))",
                      },
                      waist: {
                        label: "Waist",
                        color: "hsl(var(--chart-2))",
                      },
                      hips: {
                        label: "Hips",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={measurementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="chest"
                          stroke="var(--color-chest)"
                          name="Chest (cm)"
                        />
                        <Line
                          type="monotone"
                          dataKey="waist"
                          stroke="var(--color-waist)"
                          name="Waist (cm)"
                        />
                        <Line
                          type="monotone"
                          dataKey="hips"
                          stroke="var(--color-hips)"
                          name="Hips (cm)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Log Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="68.5"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Input id="date" type="date" className="pl-10" />
                        <Calendar
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chest">Chest (cm)</Label>
                      <Input id="chest" type="number" placeholder="95" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist">Waist (cm)</Label>
                      <Input id="waist" type="number" placeholder="80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hips">Hips (cm)</Label>
                      <Input id="hips" type="number" placeholder="100" />
                    </div>
                  </div>
                  <Button className="w-full">Log Progress</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
