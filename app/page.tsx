"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Camera, Mic, AlertTriangle, Activity, MapPin, Play, Pause } from "lucide-react"
import { LiveFeedGrid } from "@/components/live-feed-grid"
import { AlertsPanel } from "@/components/alerts-panel"
import { IncidentHistory } from "@/components/incident-history"
import { SystemStatus } from "@/components/system-status"
import { ThreatAnalytics } from "@/components/threat-analytics"

// Mock data for demonstration
const mockIncidents = [
  {
    id: "1",
    type: "Audio Threat",
    severity: "high",
    location: "Camera 3 - Main Entrance",
    timestamp: new Date(Date.now() - 300000),
    description: "Aggressive shouting detected",
    status: "active",
    confidence: 0.92,
  },
  {
    id: "2",
    type: "Suspicious Activity",
    severity: "medium",
    location: "Camera 7 - Parking Lot",
    timestamp: new Date(Date.now() - 600000),
    description: "Unusual movement pattern detected",
    status: "investigating",
    confidence: 0.78,
  },
  {
    id: "3",
    type: "Intrusion Alert",
    severity: "critical",
    location: "Camera 12 - Restricted Area",
    timestamp: new Date(Date.now() - 900000),
    description: "Unauthorized access detected",
    status: "resolved",
    confidence: 0.95,
  },
]

export default function Dashboard() {
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [activeIncidents, setActiveIncidents] = useState(mockIncidents.filter((i) => i.status === "active"))
  const [systemStats, setSystemStats] = useState({
    activeCameras: 24,
    audioSensors: 16,
    threatsDetected: 3,
    systemUptime: "99.8%",
  })

  // Simulate real-time updates
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Simulate new incidents occasionally
      if (Math.random() < 0.1) {
        const newIncident = {
          id: Date.now().toString(),
          type: ["Audio Threat", "Suspicious Activity", "Motion Alert"][Math.floor(Math.random() * 3)],
          severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as
            | "low"
            | "medium"
            | "high"
            | "critical",
          location: `Camera ${Math.floor(Math.random() * 20) + 1} - ${["Entrance", "Parking", "Hallway", "Office"][Math.floor(Math.random() * 4)]}`,
          timestamp: new Date(),
          description: "Real-time threat detected",
          status: "active" as const,
          confidence: 0.7 + Math.random() * 0.3,
        }
        setActiveIncidents((prev) => [newIncident, ...prev.slice(0, 4)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VigilantAI</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-Time Threat Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={isMonitoring ? "default" : "outline"}
                onClick={() => setIsMonitoring(!isMonitoring)}
                className="flex items-center space-x-2"
              >
                {isMonitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isMonitoring ? "Monitoring Active" : "Start Monitoring"}</span>
              </Button>
              <Badge variant={isMonitoring ? "default" : "secondary"} className="bg-green-500 text-white">
                {isMonitoring ? "LIVE" : "PAUSED"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeCameras}</div>
              <p className="text-xs text-muted-foreground">+2 from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audio Sensors</CardTitle>
              <Mic className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.audioSensors}</div>
              <p className="text-xs text-muted-foreground">All operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activeIncidents.length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        {activeIncidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Active Threats ({activeIncidents.length})
            </h2>
            <div className="space-y-3">
              
            </div>
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="live-feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live-feed">Live Feed</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="live-feed">
            <LiveFeedGrid isMonitoring={isMonitoring} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel incidents={mockIncidents} />
          </TabsContent>

          <TabsContent value="incidents">
            <IncidentHistory incidents={mockIncidents} />
          </TabsContent>

          <TabsContent value="analytics">
            <ThreatAnalytics />
          </TabsContent>

          <TabsContent value="system">
            <SystemStatus stats={systemStats} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
