const meals = [
  { name: 'Breakfast', food: 'Oatmeal with berries and nuts', calories: 350 },
  { name: 'Lunch', food: 'Grilled chicken salad', calories: 450 },
  { name: 'Snack', food: 'Greek yogurt with honey', calories: 200 },
  { name: 'Dinner', food: 'Baked salmon with roasted vegetables', calories: 550 },
]

export function MealPlan() {
  return (
    <div className="space-y-4">
      {meals.map((meal, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">{meal.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{meal.food}</p>
          </div>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {meal.calories} cal
          </span>
        </div>
      ))}
    </div>
  )
}

