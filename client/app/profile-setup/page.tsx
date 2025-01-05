'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Dumbbell, Scale, Ruler, Calendar } from 'lucide-react'

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Redirect to dashboard after completing profile setup
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Set Up Your Profile</h1>
        <div className="mb-8 flex justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-1/3 h-2 rounded-full ${i <= step ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Basic Information</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Input id="dob" type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="male" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={nextStep} className="w-full">
                Next
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Physical Information</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <div className="relative">
                  <Input id="height" type="number" placeholder="Enter your height" className="pl-10" />
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <div className="relative">
                  <Input id="weight" type="number" placeholder="Enter your weight" className="pl-10" />
                  <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Lightly Active</SelectItem>
                    <SelectItem value="moderate">Moderately Active</SelectItem>
                    <SelectItem value="very">Very Active</SelectItem>
                    <SelectItem value="extra">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={nextStep} className="w-full">
                Next
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Fitness Goals</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Goal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                    <SelectItem value="muscle">Build Muscle</SelectItem>
                    <SelectItem value="endurance">Improve Endurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Weekly Exercise Goal (hours)</Label>
                <div className="flex items-center space-x-4">
                  <Dumbbell className="text-gray-400" size={18} />
                  <Slider defaultValue={[5]} max={20} step={1} className="flex-1" />
                  <span className="text-gray-600 dark:text-gray-300 w-8 text-center">5</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dietary Preference</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_preference">No Preference</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={nextStep} className="w-full">
                Complete Setup
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

