"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data for the dashboard
const streamData = [
  { month: "Jan", streams: 45000 },
  { month: "Feb", streams: 52000 },
  { month: "Mar", streams: 48000 },
  { month: "Apr", streams: 61000 },
  { month: "May", streams: 55000 },
  { month: "Jun", streams: 67000 },
  { month: "Jul", streams: 73000 },
  { month: "Aug", streams: 69000 },
  { month: "Sep", streams: 78000 },
  { month: "Oct", streams: 85000 },
  { month: "Nov", streams: 92000 },
  { month: "Dec", streams: 123456 },
]

const platformData = [
  { platform: "Spotify", streams: 50000, revenue: "$200.00" },
  { platform: "Apple Music", streams: 30000, revenue: "$150.00" },
  { platform: "Soundcloud", streams: 25000, revenue: "$100.00" },
  { platform: "YouTube Music", streams: 18000, revenue: "$90.00" },
  { platform: "Audiomack", streams: 8456, revenue: "$34.56" },
]

export default function DashboardPage() {
  const [hasData, setHasData] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has uploaded CSV or connected platforms
    const csvUploaded = localStorage.getItem("csvUploaded")
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    setHasData(!!csvUploaded)
  }, [router])

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-white mb-4">No Data Available</h2>
              <p className="text-gray-400 mb-6">
                Connect your platforms or upload a CSV file to view your dashboard analytics.
              </p>
              <Button
                onClick={() => router.push("/connect-platforms")}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Connect to Your Platform
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Artist Dashboard - SongSeed</p>
        </div>

        {/* Main Stats Card */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">123,456 Streams</h2>
                <p className="text-sm text-gray-400">Estimated Earnings: $1,234.56</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5%
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Streams Over Time Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Streams Over Time</CardTitle>
              <p className="text-sm text-gray-400">Last 12 months • 123,456</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  streams: {
                    label: "Streams",
                    color: "#f97316",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={streamData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="streams"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Platform Breakdown */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Breakdown</CardTitle>
              <p className="text-sm text-gray-400">Streams by platform</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformData.map((platform, index) => (
                  <div key={platform.platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-white font-medium">{platform.platform}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{platform.streams.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">{platform.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Track Section */}
        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Top Performance Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-500 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">Your best performing track is</h3>
                <p className="text-white/90 text-sm">doing great in Nigeria and Ghana. Keep</p>
                <p className="text-white/90 text-sm">promoting it to get more streams.</p>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">85%</div>
                <div className="text-white/90 text-sm">Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
