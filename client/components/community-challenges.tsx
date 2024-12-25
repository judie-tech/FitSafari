"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, Share2 } from 'lucide-react'

// Mock data for challenges
const challenges = [
  { id: 1, name: "30-Day Squat Challenge", participants: 1500, progress: 60 },
  { id: 2, name: "Couch to 5K", participants: 2000, progress: 45 },
  { id: 3, name: "Plank Master", participants: 1200, progress: 75 },
  // Add more challenges...
]

export default function CommunityChallenges() {
  const [joinedChallenges, setJoinedChallenges] = useState([])

  const handleJoinChallenge = (challengeId) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Challenges</CardTitle>
        <CardDescription>Join fitness challenges and compete with friends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map(challenge => (
            <motion.div key={challenge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2" />
                    {challenge.name}
                  </CardTitle>
                  <CardDescription>
                    <Users className="inline mr-1" />
                    {challenge.participants} participants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={challenge.progress} className="mb-2" />
                  <p className="text-sm text-gray-500 mb-4">{challenge.progress}% complete</p>
                  <div className="flex justify-between">
                    <Button onClick={() => handleJoinChallenge(challenge.id)} disabled={joinedChallenges.includes(challenge.id)}>
                      {joinedChallenges.includes(challenge.id) ? 'Joined' : 'Join Challenge'}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

