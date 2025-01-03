"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Utensils, BarChart2, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Workouts", href: "/workouts" },
  { icon: Utensils, label: "Diet", href: "/diet" },
  { icon: BarChart2, label: "Progress", href: "/progress" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out"
    >
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${
                pathname === item.href
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
