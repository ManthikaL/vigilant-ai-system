"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, AlertTriangle, Volume2, VolumeX } from "lucide-react"

interface LiveFeedGridProps {
  isMonitoring: boolean
}

interface CameraFeed {
  id: string
  name: string
  location: string
  status: "active" | "inactive" | "alert"
  hasAudio: boolean
  audioMuted: boolean
  lastActivity: Date
  threatLevel: "none" | "low" | "medium" | "high"
}

const mockCameraFeeds: CameraFeed[] = [
  {
    id: "1",
    name: "Main Entrance",
    location: "Building A - Floor 1",
    status: "active",
    hasAudio: true,
    audioMuted: false,
    lastActivity: new Date(),
    threatLevel: "none",
  },
  {
    id: "2",
    name: "Parking Lot North",
    location: "Exterior - North Side",
    status: "active",
    hasAudio: true,
    audioMuted: true,
    lastActivity: new Date(Date.now() - 120000),
    threatLevel: "low",
  },
  {
    id: "3",
    name: "Reception Area",
    location: "Building A - Floor 1",
    status: "alert",
    hasAudio: true,
    audioMuted: false,
    lastActivity: new Date(Date.now() - 30000),
    threatLevel: "high",
  },
  {
    id: "4",
    name: "Server Room",
    location: "Building B - Basement",
    status: "active",
    hasAudio: false,
    audioMuted: false,
    lastActivity: new Date(Date.now() - 300000),
    threatLevel: "none",
  },
  {
    id: "5",
    name: "Emergency Exit",
    location: "Building A - Floor 2",
    status: "active",
    hasAudio: true,
    audioMuted: false,
    lastActivity: new Date(Date.now() - 600000),
    threatLevel: "medium",
  },
  {
    id: "6",
    name: "Conference Room",
    location: "Building A - Floor 3",
    status: "inactive",
    hasAudio: true,
    audioMuted: true,
    lastActivity: new Date(Date.now() - 1800000),
    threatLevel: "none",
  },
]

export function LiveFeedGrid({ isMonitoring }: LiveFeedGridProps) {
  const [feeds, setFeeds] = useState<CameraFeed[]>(mockCameraFeeds)

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) => ({
          ...feed,
          lastActivity: Math.random() < 0.3 ? new Date() : feed.lastActivity,
          threatLevel:
            Math.random() < 0.1
              ? (["none", "low", "medium", "high"][Math.floor(Math.random() * 4)] as any)
              : feed.threatLevel,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "alert":
        return "bg-red-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-200"
    }
  }

  const toggleAudio = (feedId: string) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) => (feed.id === feedId ? { ...feed, audioMuted: !feed.audioMuted } : feed)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Camera Feeds</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {feeds.filter((f) => f.status === "active").length} Active
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {feeds.filter((f) => f.status === "alert").length} Alerts
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map((feed) => (
          <Card key={feed.id} className={`${getThreatColor(feed.threatLevel)} transition-all duration-300`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{feed.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {feed.threatLevel !== "none" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  <Badge className={`${getStatusColor(feed.status)} text-white text-xs`}>
                    {feed.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{feed.location}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simulated Video Feed */}
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-600" />
                </div>
                {isMonitoring && (
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded text-xs">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>
                  </div>
                )}
                {feed.threatLevel !== "none" && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 text-white">THREAT DETECTED</Badge>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {feed.hasAudio && (
                    <Button size="sm" variant="outline" onClick={() => toggleAudio(feed.id)} className="p-2">
                      {feed.audioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Last activity: {feed.lastActivity.toLocaleTimeString()}
                  </div>
                </div>
                {feed.threatLevel !== "none" && (
                  <Badge variant="outline" className="text-xs">
                    {feed.threatLevel.toUpperCase()} RISK
                  </Badge>
                )}
              </div>

              {/* AI Detection Status */}
              <div className="text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Video Analysis:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {isMonitoring ? "Active" : "Paused"}
                  </Badge>
                </div>
                {feed.hasAudio && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Audio Analysis:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {isMonitoring && !feed.audioMuted ? "Active" : "Paused"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
