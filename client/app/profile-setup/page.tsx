"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Calendar, Quote } from "lucide-react";
import { toast } from "sonner";

const motivationalQuotes = [
  { quote: "Your health is your wealth.", author: "Unknown" },
  { quote: "Every journey begins with a single step.", author: "Lao Tzu" },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
];

const API_BASE_URL = "http://localhost:5002/api";

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    dietaryPreference: "",
  });

  // Fetch existing profile data if available
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          credentials: "include", // Important for cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData((prevData) => ({
            ...prevData,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    } else {
      await handleSubmit();
    }
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 to-green-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Profile Setup
        </h1>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-between relative">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i <= step
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {i}
            </motion.div>
          ))}
          <div className="absolute top-1/2 left-0 w-full h-2 -z-10 transform -translate-y-1/2">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Motivational Quote */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex items-start gap-2">
            <Quote className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-emerald-800 dark:text-emerald-200 italic">
                "{motivationalQuotes[currentQuote].quote}"
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">
                - {motivationalQuotes[currentQuote].author}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Personal Information
              </h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative group">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="pl-10"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500"
                      size={18}
                    />
                  </div>
                </div>
                <Button
                  onClick={nextStep}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={loading}
                >
                  Next Step
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Physical Information
              </h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleInputChange}
                    placeholder="Enter your height"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter your weight"
                  />
                </div>
                <Button
                  onClick={nextStep}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={loading}
                >
                  Next Step
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Preferences
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Fitness Goal</Label>
                  <RadioGroup
                    value={profileData.fitnessGoal}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { id: "fitnessGoal", value },
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="loseWeight" id="loseWeight" />
                      <Label htmlFor="loseWeight">Lose Weight</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gainMuscle" id="gainMuscle" />
                      <Label htmlFor="gainMuscle">Gain Muscle</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="improveStamina"
                        id="improveStamina"
                      />
                      <Label htmlFor="improveStamina">Improve Stamina</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="generalFitness"
                        id="generalFitness"
                      />
                      <Label htmlFor="generalFitness">General Fitness</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Dietary Preference</Label>
                  <Select
                    value={profileData.dietaryPreference}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { id: "dietaryPreference", value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="noPreference">
                        No Preference
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={nextStep}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Complete Setup"}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
