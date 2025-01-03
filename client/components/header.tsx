"use client";

import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-emerald-600"
          >
            FitTrack Pro
          </motion.h1>
          <div className="flex items-center">
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button
              isIconOnly
              color="success"
              variant="light"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Button
              isIconOnly
              color="success"
              variant="light"
              aria-label="User profile"
              className="ml-2"
            >
              <User className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
