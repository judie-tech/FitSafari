import Link from 'next/link'
import { Home, Dumbbell, Utensils, LineChart, Bell, Settings } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Dumbbell, label: 'Workouts', href: '/dashboard/workouts' },
  { icon: Utensils, label: 'Nutrition', href: '/dashboard/nutrition' },
  { icon: LineChart, label: 'Progress', href: '/dashboard/progress' },
  { icon: Bell, label: 'Reminders', href: '/dashboard/reminders' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">FitTrack</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

