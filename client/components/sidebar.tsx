import Link from "next/link";
import {
  Home,
  Dumbbell,
  Utensils,
  LineChart,
  Bell,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Dumbbell, label: "Workouts", href: "/dashboard/workouts" },
  { icon: Utensils, label: "Nutrition", href: "/dashboard/nutrition" },
  { icon: LineChart, label: "Progress", href: "/dashboard/progress" },
  { icon: Bell, label: "Reminders", href: "/dashboard/reminders" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeItem, setActiveItem] = useState("/dashboard");

  return (
    <aside
      className={`
        w-64 bg-gradient-to-b from-emerald-900 to-emerald-800 
        shadow-xl transition-all duration-300 relative
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
    >
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden absolute right-0 top-4 translate-x-full bg-emerald-800 p-2 rounded-r text-white"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform duration-300 ${
            sidebarOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-emerald-700/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg">
            <Dumbbell className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            FitSafari
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = activeItem === item.href;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.href)}
                  className={`
                    flex items-center px-4 py-3 rounded-lg
                    transition-all duration-200 group relative
                    ${
                      isActive
                        ? "bg-emerald-700 text-white"
                        : "text-emerald-100 hover:bg-emerald-800/60"
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r" />
                  )}

                  {/* Icon Container */}
                  <div
                    className={`
                    p-2 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-800/40 text-emerald-300 group-hover:bg-emerald-700/50"
                    }
                  `}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span className="ml-3 font-medium">{item.label}</span>

                  {/* Hover Effect */}
                  <div
                    className={`
                    absolute right-2 w-1 h-1 rounded-full transition-all duration-200
                    ${
                      isActive
                        ? "bg-emerald-400"
                        : "bg-transparent group-hover:bg-emerald-400"
                    }
                  `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center px-4 py-3 rounded-lg bg-emerald-700/30 border border-emerald-600/20">
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-emerald-400"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Alex Johnson</p>
            <p className="text-xs text-emerald-300">Premium Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
