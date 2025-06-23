"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, Clock, MapPin, AlertTriangle, Shield, Activity } from "lucide-react"

export function ThreatAnalytics() {
  const threatStats = {
    totalThreats: 127,
    resolvedThreats: 98,
    activeThreats: 3,
    falsePositives: 26,
    averageResponseTime: "2.4 minutes",
    systemAccuracy: 92.3,
  }

  const threatsByType = [
    { type: "Audio Threats", count: 45, percentage: 35.4, trend: "up" },
    { type: "Suspicious Activity", count: 38, percentage: 29.9, trend: "down" },
    { type: "Intrusion Alerts", count: 28, percentage: 22.0, trend: "up" },
    { type: "Motion Alerts", count: 16, percentage: 12.6, trend: "stable" },
  ]

  const threatsByLocation = [
    { location: "Main Entrance", count: 23, risk: "high" },
    { location: "Parking Lot", count: 19, risk: "medium" },
    { location: "Reception Area", count: 15, risk: "high" },
    { location: "Emergency Exits", count: 12, risk: "medium" },
    { location: "Server Room", count: 8, risk: "low" },
  ]

  const hourlyActivity = [
    { hour: "00:00", threats: 2 },
    { hour: "02:00", threats: 1 },
    { hour: "04:00", threats: 0 },
    { hour: "06:00", threats: 3 },
    { hour: "08:00", threats: 8 },
    { hour: "10:00", threats: 12 },
    { hour: "12:00", threats: 15 },
    { hour: "14:00", threats: 18 },
    { hour: "16:00", threats: 22 },
    { hour: "18:00", threats: 16 },
    { hour: "20:00", threats: 9 },
    { hour: "22:00", threats: 5 },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Threat Analytics</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Last 30 Days
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.totalThreats}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((threatStats.resolvedThreats / threatStats.totalThreats) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {threatStats.resolvedThreats} of {threatStats.totalThreats} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.averageResponseTime}</div>
            <p className="text-xs text-muted-foreground">-15% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Accuracy</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{threatStats.systemAccuracy}%</div>
            <p className="text-xs text-muted-foreground">{threatStats.falsePositives} false positives</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="threat-types" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threat-types">Threat Types</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="threat-types">
          <Card>
            <CardHeader>
              <CardTitle>Threats by Type</CardTitle>
              <CardDescription>Distribution of different threat categories detected by the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatsByType.map((threat) => (
                  <div key={threat.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{threat.type}</span>
                        {getTrendIcon(threat.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{threat.count} incidents</span>
                        <Badge variant="outline">{threat.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={threat.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>High-Risk Locations</CardTitle>
              <CardDescription>Areas with the highest frequency of security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatsByLocation.map((location) => (
                  <div key={location.location} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">{location.count} incidents</p>
                      </div>
                    </div>
                    <Badge className={getRiskColor(location.risk)}>{location.risk.toUpperCase()} RISK</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Activity Pattern</CardTitle>
              <CardDescription>Threat detection frequency throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hourlyActivity.map((activity) => (
                  <div key={activity.hour} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{activity.hour}</span>
                      <span className="text-sm text-muted-foreground">{activity.threats} threats</span>
                    </div>
                    <Progress value={(activity.threats / 22) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Performance</CardTitle>
          <CardDescription>Performance metrics for different AI detection models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Video Classification</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Precision</span>
                  <span className="font-medium">91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recall</span>
                  <span className="font-medium">89.5%</span>
                </div>
                <Progress value={89.5} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Audio Classification</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">88.7%</span>
                </div>
                <Progress value={88.7} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Precision</span>
                  <span className="font-medium">86.3%</span>
                </div>
                <Progress value={86.3} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recall</span>
                  <span className="font-medium">92.1%</span>
                </div>
                <Progress value={92.1} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
