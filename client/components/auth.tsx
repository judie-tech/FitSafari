// Auth.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Lock,
  Mail,
  Chrome,
  Dumbbell,
  Target,
  Heart,
} from "lucide-react";
import { ProfileSetup } from "@/components/profile-setup";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const iconAnimation = {
  hover: { scale: 1.2, rotate: 5 },
  tap: { scale: 0.9 },
};

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with letters and numbers";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowProfile(true);
    }
  };

  if (showProfile) {
    return (
      <ProfileSetup onComplete={() => console.log("Profile setup complete")} />
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 opacity-50" />
      </div>

      {/* Welcome Section */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center text-white relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-lg space-y-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconAnimation}
              className="p-3 bg-emerald-500/20 rounded-full"
            >
              <Dumbbell className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              FitSafari
            </h1>
          </div>

          <motion.div className="space-y-6" variants={fadeInUp}>
            <h2 className="text-3xl font-semibold text-white">
              {isLogin
                ? "Welcome back, fitness warrior!"
                : "Begin Your Fitness Journey"}
            </h2>
            <p className="text-xl text-emerald-100">
              {isLogin
                ? "Ready to crush your goals today?"
                : "Join thousands transforming their lives"}
            </p>
          </motion.div>

          <motion.div className="space-y-6 text-lg" variants={fadeInUp}>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={iconAnimation}
                className="p-2 bg-emerald-500/20 rounded-full"
              >
                <Target className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <span>Personalized workout plans</span>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={iconAnimation}
                className="p-2 bg-emerald-500/20 rounded-full"
              >
                <Heart className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <span>AI-powered health insights</span>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={iconAnimation}
                className="p-2 bg-emerald-500/20 rounded-full"
              >
                <User className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <span>Connect with fitness community</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Auth Form Section */}
      <div className="w-1/2 p-12 flex justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px] backdrop-blur-xl bg-white/10 border-emerald-500/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-emerald-400">
                {isLogin ? "Login" : "Sign Up"}
              </CardTitle>
              <CardDescription className="text-emerald-100">
                {isLogin
                  ? "Access your fitness dashboard"
                  : "Join the FitSafari community"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={isLogin ? "login" : "signup"}
                onValueChange={(value) => setIsLogin(value === "login")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-emerald-900/50">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-emerald-500"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-emerald-500"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.form
                    key={isLogin ? "login" : "signup"}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {!isLogin && (
                      <motion.div variants={fadeInUp} className="space-y-1.5">
                        <Label htmlFor="name" className="text-emerald-100">
                          Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            className="pl-8 bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                            placeholder="Enter your name"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </motion.div>
                    )}

                    <motion.div variants={fadeInUp} className="space-y-1.5">
                      <Label htmlFor="email" className="text-emerald-100">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                        <Input
                          id="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="pl-8 bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-1.5">
                      <Label htmlFor="password" className="text-emerald-100">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          className="pl-8 bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                          placeholder={
                            isLogin ? "Enter password" : "Create password"
                          }
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </motion.div>

                    {!isLogin && (
                      <motion.div variants={fadeInUp} className="space-y-1.5">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-emerald-100"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleChange("confirmPassword", e.target.value)
                            }
                            className="pl-8 bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                            placeholder="Confirm your password"
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.form>
                </AnimatePresence>
              </Tabs>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-emerald-500/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-emerald-100 bg-white/10 backdrop-blur-xl">
                      Or continue with
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-emerald-900/20 border-emerald-500/30 text-emerald-100 hover:bg-emerald-800/30"
                  >
                    <Chrome className="mr-2 h-4 w-4" /> Google
                  </Button>
                </motion.div>
              </div>
            </CardContent>
            <CardFooter>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-semibold"
                >
                  {isLogin ? "Start Your Workout" : "Join FitSafari"}
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Auth;
