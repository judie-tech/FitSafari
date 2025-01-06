"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User } from "lucide-react";

// Motion Icon Component
const MotionIcon = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 bg-emerald-500 rounded-full"
  >
    {children}
  </motion.div>
);

// Floating Background Animations
const PulsingBackground = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800"
    animate={{
      background: [
        "linear-gradient(to bottom right, #059669, #065f46)",
        "linear-gradient(to bottom right, #065f46, #064e3b)",
        "linear-gradient(to bottom right, #059669, #065f46)",
      ],
    }}
    transition={{ duration: 3, repeat: Infinity }}
  />
);

const FloatingParticle = ({ delay }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
    initial={{ y: Math.random() * 500, x: Math.random() * 500 }}
    animate={{
      y: [null, -20, 20],
      x: [null, -20, 20],
    }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/profile-setup"); // Redirect to profile setup
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData); // Log error data for debugging
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Basic client-side validation
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        setIsLogin(true); // Switch to login tab
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        console.error("Signup error:", errorData); // Log error data for debugging
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Welcome Message */}
      <motion.div className="hidden lg:flex relative flex-col justify-center w-1/2 p-12 overflow-hidden">
        <PulsingBackground />
        {[...Array(10)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
        <motion.div className="relative z-10 space-y-8 text-white">
          <motion.h1 className="text-4xl font-bold">
            Welcome to FitTrack Pro
          </motion.h1>
          <motion.p className="text-lg opacity-90">
            Your journey to better health starts here
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right side - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="login"
                onClick={() => setIsLogin(true)}
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                onClick={() => setIsLogin(false)}
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Log In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
