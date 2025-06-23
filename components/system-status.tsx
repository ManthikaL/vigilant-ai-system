"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wifi,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Settings,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
} from "lucide-react"

interface SystemStatusProps {
  stats: {
    activeCameras: number
    audioSensors: number
    threatsDetected: number
    systemUptime: string
  }
}

export function SystemStatus({ stats }: SystemStatusProps) {
  const systemHealth = {
    overall: "healthy",
    cpu: 45,
    memory: 62,
    storage: 78,
    network: "stable",
    database: "connected",
  }

  const services = [
    { name: "Video Processing Service", status: "running", uptime: "99.9%" },
    { name: "Audio Analysis Service", status: "running", uptime: "99.7%" },
    { name: "AI Inference Engine", status: "running", uptime: "99.8%" },
    { name: "Alert Notification Service", status: "running", uptime: "100%" },
    { name: "Database Service", status: "running", uptime: "99.9%" },
    { name: "Web Dashboard", status: "running", uptime: "99.6%" },
  ]

  const aiModels = [
    { name: "Video Threat Classifier", status: "active", version: "v2.1.3", accuracy: 94.2 },
    { name: "Audio Threat Detector", status: "active", version: "v1.8.7", accuracy: 88.7 },
    { name: "Speech Recognition", status: "active", version: "v3.2.1", accuracy: 96.1 },
    { name: "Text Summarization", status: "active", version: "v1.5.2", accuracy: 91.8 },
    { name: "Object Detection", status: "updating", version: "v2.0.1", accuracy: 89.3 },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "updating":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
      case "active":
        return "bg-green-100 text-green-800"
      case "updating":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">System Status</h2>
        <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.cpu}%</div>
            <Progress value={systemHealth.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Memory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.memory}%</div>
            <Progress value={systemHealth.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.storage}%</div>
            <Progress value={systemHealth.storage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Stable</div>
            <p className="text-xs text-muted-foreground mt-2">All connections active</p>
          </CardContent>
        </Card>
      </div>

      {/* System Services */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>System Services</CardTitle>
              <CardDescription>Status of all critical system services and components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-models">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Status</CardTitle>
              <CardDescription>Performance and status of deployed AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(model.status)}
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Version {model.version} • Accuracy: {model.accuracy}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Settings</CardTitle>
                <CardDescription>Configure AI detection sensitivity and thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Video Threat Detection</p>
                    <p className="text-sm text-muted-foreground">Enable real-time video analysis</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Audio Threat Detection</p>
                    <p className="text-sm text-muted-foreground">Enable audio pattern analysis</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Motion Detection</p>
                    <p className="text-sm text-muted-foreground">Detect unusual movement patterns</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Speech Recognition</p>
                    <p className="text-sm text-muted-foreground">Transcribe and analyze conversations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
                <CardDescription>Configure notification preferences and thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-time Alerts</p>
                    <p className="text-sm text-muted-foreground">Instant notifications for threats</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Send alerts via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Resolution</p>
                    <p className="text-sm text-muted-foreground">Automatically resolve low-risk alerts</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Detailed information about the VigilantAI system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Hardware</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU:</span>
                  <span>Intel Xeon E5-2686 v4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span>64 GB DDR4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span>2TB NVMe SSD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GPU:</span>
                  <span>NVIDIA Tesla V100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Software</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">OS:</span>
                  <span>Ubuntu 22.04 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Docker:</span>
                  <span>24.0.7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Python:</span>
                  <span>3.11.6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PyTorch:</span>
                  <span>2.1.0</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Network</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span>192.168.1.100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Port:</span>
                  <span>8080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SSL:</span>
                  <span>Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firewall:</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
