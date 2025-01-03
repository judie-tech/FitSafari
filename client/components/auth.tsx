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
import { User, Lock, Mail, Dumbbell } from "lucide-react";
import { ProfileSetup } from "@/components/profile-setup";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Auth = () => {
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
    return <ProfileSetup />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
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
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-emerald-100">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className="bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-emerald-100">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-emerald-100">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                {!isLogin && (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-emerald-100"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm your password"
                      className="bg-emerald-900/20 border-emerald-500/30 text-white placeholder:text-emerald-200/50"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </motion.form>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
