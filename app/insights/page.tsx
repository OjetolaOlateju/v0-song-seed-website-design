"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Users, Play, Lightbulb } from "lucide-react"
import Navbar from "@/components/navbar"
import Link from "next/link"

// Mock data for insights
const performanceData = {
  overview: { value: "12,345", change: "+12.5%", trend: "up" },
  tracks: { value: "8,765", change: "+8.2%", trend: "up" },
  audience: { value: "5,432", change: "-2.1%", trend: "down" },
}

const topTracks = [
  {
    title: "Rhythms of the Soul",
    artist: "Artist",
    streams: 3456,
    change: "+15%",
    trend: "up",
  },
  {
    title: "Echoes of the Ancestors",
    artist: "Artist",
    streams: 2890,
    change: "+8%",
    trend: "up",
  },
  {
    title: "Whispers of the Savannah",
    artist: "Artist",
    streams: 2123,
    change: "-3%",
    trend: "down",
  },
]

const proTip = {
  title: "Engage with your listeners!",
  description:
    "Your fans are loving your latest track. Consider creating behind-the-scenes content about the inspiration behind it to build an even stronger connection with your audience.",
}

export default function InsightsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Insights</h1>
              <p className="text-gray-400">Music Insights - SongSeed</p>
            </div>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-600 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Overview</p>
                  <p className="text-white text-2xl font-bold">{performanceData.overview.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">{performanceData.overview.change}</span>
                  </div>
                </div>
                <Play className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-600 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Tracks</p>
                  <p className="text-white text-2xl font-bold">{performanceData.tracks.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
                    <span className="text-green-300 text-sm">{performanceData.tracks.change}</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Audience</p>
                  <p className="text-white text-2xl font-bold">{performanceData.audience.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    <span className="text-red-400 text-sm">{performanceData.audience.change}</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pro Tip */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Pro Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-white font-semibold">{proTip.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{proTip.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Top Tracks */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                        <Play className="h-4 w-4 text-gray-300" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{track.title}</h4>
                        <p className="text-gray-400 text-xs">{track.artist}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{track.streams.toLocaleString()}</p>
                      <div className="flex items-center">
                        {track.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${track.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {track.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 lg:hidden">
          <div className="flex justify-around max-w-md mx-auto">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Play className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-orange-500">
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Users className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
