"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Upload, CheckCircle, Clock, Zap } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"

interface Platform {
  name: string
  status: "connected" | "connecting" | "disconnected"
  isNew?: boolean
}

export default function ConnectPlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { name: "Spotify", status: "connected" },
    { name: "Boomplay", status: "connecting" },
    { name: "Radio", status: "disconnected", isNew: true },
  ])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === "text/csv") {
      setUploadedFile(file)
      localStorage.setItem("csvUploaded", "true")
      localStorage.setItem("csvFileName", file.name)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  })

  const handlePlatformConnect = (platformName: string) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.name === platformName ? { ...platform, status: "connected" as const } : platform,
      ),
    )
  }

  const handleContinue = () => {
    router.push("/dashboard")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "connecting":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center mb-6">
            <Link href="/login" className="text-gray-400 hover:text-gray-300">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-sm text-gray-400">Connect Platforms Standal...</h2>
            <div className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connect Platforms</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Platform Connections */}
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(platform.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">Connect {platform.name}</span>
                      {platform.isNew && <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">NEW</span>}
                    </div>
                    {platform.status === "connecting" && <span className="text-sm text-gray-400">Connecting...</span>}
                  </div>
                </div>
                {platform.status !== "connected" && (
                  <Button
                    onClick={() => handlePlatformConnect(platform.name)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Or Upload a File</h3>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">
                {isDragActive ? "Drop your CSV file here" : "Drag & drop your CSV file here"}
              </p>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                Browse Files
              </Button>
            </div>

            {uploadedFile && (
              <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-400 font-medium">File uploaded successfully!</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{uploadedFile.name}</p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          {(platforms.some((p) => p.status === "connected") || uploadedFile) && (
            <Button
              onClick={handleContinue}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
            >
              Continue to Dashboard
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
