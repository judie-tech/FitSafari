import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Scale, Target, Utensils } from "lucide-react";

interface ProfileSetupProps {
  onComplete: () => void;
}

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The hardest lift of all is lifting your butt off the couch.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The only way to do great work is to love what you do.",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggeredFadeIn = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    dietaryPreferences: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setCurrentQuote(
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ]
      );
    } else {
      // Call the onComplete function if it exists
      if (typeof onComplete === "function") {
        // Navigate to Dashboard after completing the profile
        router.push("/dashboard");
        onComplete();
      }
    }
  };

  const steps = [
    {
      title: "Basic Info",
      fields: ["age"],
      icon: User,
    },
    {
      title: "Body Metrics",
      fields: ["weight", "height"],
      icon: Scale,
    },
    {
      title: "Fitness Goals",
      fields: ["goal", "activityLevel"],
      icon: Target,
    },
    {
      title: "Dietary Preferences",
      fields: ["dietaryPreferences"],
      icon: Utensils,
    },
  ];

  const renderField = (field: string) => {
    switch (field) {
      case "age":
      case "weight":
      case "height":
        return (
          <Input
            id={field}
            type="number"
            placeholder={`Enter your ${field}`}
            value={profile[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            className="bg-emerald-700/50 text-white placeholder-emerald-200/50 border-emerald-600"
          />
        );
      case "goal":
      case "activityLevel":
      case "dietaryPreferences":
        return (
          <Select onValueChange={(value) => handleChange(field, value)}>
            <SelectTrigger
              id={field}
              className="bg-emerald-700/50 text-white border-emerald-600"
            >
              <SelectValue placeholder={`Select your ${field}`} />
            </SelectTrigger>
            <SelectContent className="bg-emerald-800 text-white">
              {field === "goal" && (
                <>
                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                  <SelectItem value="maintain_weight">
                    Maintain Weight
                  </SelectItem>
                  <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                </>
              )}
              {field === "activityLevel" && (
                <>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active</SelectItem>
                  <SelectItem value="moderately_active">
                    Moderately Active
                  </SelectItem>
                  <SelectItem value="very_active">Very Active</SelectItem>
                  <SelectItem value="extra_active">Extra Active</SelectItem>
                </>
              )}
              {field === "dietaryPreferences" && (
                <>
                  <SelectItem value="no_preference">No Preference</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                  <SelectItem value="gluten_free">Gluten-free</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* ... (keep the rest of your JSX structure) */}
      </motion.div>
    </div>
  );
}

export default ProfileSetup;
