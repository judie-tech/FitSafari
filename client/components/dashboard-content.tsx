import { Activity, TrendingUp, Zap } from 'lucide-react'
import { ProgressChart } from './progress-chart'
import { WorkoutLog } from './workout-log'
import { MealPlan } from './meal-plan'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Activity} label="Daily Steps" value="8,439" target="10,000" />
          <StatCard icon={TrendingUp} label="Weight" value="68 kg" target="65 kg" />
          <StatCard icon={Zap} label="Calories Burned" value="487" target="600" />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Fitness Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Today's Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkoutLog />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Meal Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <MealPlan />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, target }) {
  const progress = (parseInt(value) / parseInt(target)) * 100
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className="w-8 h-8 text-indigo-500 mr-3" />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

