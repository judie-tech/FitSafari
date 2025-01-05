import { Bell, Search, User, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome back, Alex!</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User size={20} />
        </Button>
      </div>
    </header>
  )
}

