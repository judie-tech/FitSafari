"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Trophy, Share2, MessageSquare, ThumbsUp } from 'lucide-react'

// Mock data for challenges
const challenges = [
  { id: 1, name: "30-Day Squat Challenge", participants: 1500, progress: 60 },
  { id: 2, name: "Couch to 5K", participants: 2000, progress: 45 },
  { id: 3, name: "Plank Master", participants: 1200, progress: 75 },
]

// Mock data for community posts
const posts = [
  { id: 1, user: "Jane Doe", avatar: "/avatars/jane.png", content: "Just completed my first 5K run!", likes: 24, comments: 5 },
  { id: 2, user: "John Smith", avatar: "/avatars/john.png", content: "New personal best in deadlifts today! 💪", likes: 18, comments: 3 },
  { id: 3, user: "Alice Johnson", avatar: "/avatars/alice.png", content: "Looking for a workout buddy in NYC. Any takers?", likes: 7, comments: 12 },
]

export default function CommunityHub() {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([])

  const handleJoinChallenge = (challengeId: number) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-400">Community Challenges</CardTitle>
          <CardDescription>Join fitness challenges and compete with friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <motion.div key={challenge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                      {challenge.name}
                    </CardTitle>
                    <CardDescription>
                      <Users className="inline mr-1" />
                      {challenge.participants} participants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={challenge.progress} className="mb-2" />
                    <p className="text-sm text-gray-400 mb-4">{challenge.progress}% complete</p>
                    <div className="flex justify-between">
                      <Button onClick={() => handleJoinChallenge(challenge.id)} disabled={joinedChallenges.includes(challenge.id)}>
                        {joinedChallenges.includes(challenge.id) ? 'Joined' : 'Join Challenge'}
                      </Button>
                      <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-400">Community Feed</CardTitle>
          <CardDescription>See what others are up to and share your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{post.user}</p>
                        <p className="text-sm text-gray-400 mt-1">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

