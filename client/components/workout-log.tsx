import { CheckCircle } from 'lucide-react'

const workouts = [
  { name: 'Push-ups', sets: 3, reps: 15, completed: true },
  { name: 'Squats', sets: 4, reps: 12, completed: true },
  { name: 'Plank', duration: '60 seconds', completed: false },
  { name: 'Lunges', sets: 3, reps: 10, completed: false },
]

export function WorkoutLog() {
  return (
    <ul className="space-y-3">
      {workouts.map((workout, index) => (
        <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">{workout.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {workout.sets && workout.reps
                ? `${workout.sets} sets x ${workout.reps} reps`
                : workout.duration}
            </p>
          </div>
          <CheckCircle
            className={`w-6 h-6 ${
              workout.completed
                ? 'text-green-500'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </li>
      ))}
    </ul>
  )
}

