"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Edit, LinkIcon, Settings, LogOut, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: "Artist Name",
    email: "",
    username: "",
    country: "9 Countries",
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")
    const username = localStorage.getItem("username")

    if (!auth) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setUserInfo((prev) => ({
      ...prev,
      email: email || "",
      username: username || "Artist",
    }))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("username")
    localStorage.removeItem("csvUploaded")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    {
      icon: Edit,
      label: "Edit Profile",
      action: () => console.log("Edit profile"),
    },
    {
      icon: LinkIcon,
      label: "Connect Platforms",
      action: () => router.push("/connect-platforms"),
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => console.log("Settings"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Profile Card */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="pt-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4 bg-gray-600">
              <AvatarFallback className="text-gray-300 text-xl">
                {userInfo.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white mb-1">{userInfo.name}</h2>
            <p className="text-gray-400 text-sm mb-2">@{userInfo.username}</p>
            <p className="text-gray-400 text-sm">{userInfo.country}</p>
          </CardContent>
        </Card>

        {/* Account Section */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="text-white">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 lg:hidden">
          <div className="flex justify-around max-w-md mx-auto">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-orange-500">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
