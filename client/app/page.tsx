// app/page.js (Homepage)
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Activity,
  Trophy,
  Users,
  Dumbbell,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your fitness journey with detailed analytics",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Insights",
      description: "Get personalized recommendations based on your activities",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Achievement System",
      description: "Earn rewards as you reach your fitness goals",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Connect with like-minded fitness enthusiasts",
    },
  ];

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Dumbbell className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-800">
                FitSafari
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="ghost"
                className="bg-white/90 hover:bg-white text-emerald-600 hover:text-emerald-700"
                onClick={navigateToLogin}
              >
                Login
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-emerald-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Fitness Journey
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-xl text-emerald-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Track your progress, achieve your goals, and join a community of
              fitness enthusiasts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6"
                onClick={navigateToLogin}
              >
                Start Your Journey
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white rounded-t-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-emerald-900">
            Why Choose FitSafari?
          </h2>
          <p className="mt-4 text-lg text-emerald-700">
            Everything you need to achieve your fitness goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-4 left-6 p-3 bg-emerald-600 rounded-xl text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-emerald-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-emerald-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="relative z-10 bg-white px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-emerald-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">10k+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">1M+ Goals Achieved</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
