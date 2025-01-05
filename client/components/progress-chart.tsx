'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', weight: 68, calories: 2100, steps: 8000 },
  { name: 'Tue', weight: 67.8, calories: 2200, steps: 8500 },
  { name: 'Wed', weight: 67.5, calories: 2150, steps: 9000 },
  { name: 'Thu', weight: 67.3, calories: 2300, steps: 9500 },
  { name: 'Fri', weight: 67.1, calories: 2250, steps: 10000 },
  { name: 'Sat', weight: 66.9, calories: 2400, steps: 11000 },
  { name: 'Sun', weight: 66.7, calories: 2350, steps: 10500 },
]

export function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

