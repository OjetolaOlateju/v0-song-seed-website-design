"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, User, LogOut } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Insights", href: "/insights", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("username")
    localStorage.removeItem("csvUploaded")
    router.push("/login")
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-xl font-bold text-white">
            SongSeed
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${
                      isActive ? "text-orange-500 bg-orange-500/10" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-gray-400 hover:text-white flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  )
}
