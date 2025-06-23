"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Search, Download, Eye, Clock, MapPin, AlertTriangle } from "lucide-react"

interface Incident {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  timestamp: Date
  description: string
  status: "active" | "investigating" | "resolved"
  confidence: number
}

interface IncidentHistoryProps {
  incidents: Incident[]
}

export function IncidentHistory({ incidents }: IncidentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportIncidents = () => {
    // In a real app, this would generate and download a report
    console.log("Exporting incidents...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Incident History</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportIncidents}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Incidents ({filteredIncidents.length})</CardTitle>
          <CardDescription>Complete history of security incidents and threat detections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.type}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.timestamp.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>{incident.status.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>{Math.round(incident.confidence * 100)}%</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedIncident(incident)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            <span>Incident Details</span>
                          </DialogTitle>
                          <DialogDescription>Detailed information about the security incident</DialogDescription>
                        </DialogHeader>
                        {selectedIncident && (
                          <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Type</label>
                                <p className="text-sm">{selectedIncident.type}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Severity</label>
                                <div className="mt-1">
                                  <Badge className={getSeverityColor(selectedIncident.severity)}>
                                    {selectedIncident.severity.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Location</label>
                                <p className="text-sm flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {selectedIncident.location}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                                <p className="text-sm flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {selectedIncident.timestamp.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Description</label>
                              <p className="text-sm mt-1">{selectedIncident.description}</p>
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-sm mb-2">AI Analysis Report</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Confidence Level:</span>
                                  <span className="font-medium">{Math.round(selectedIncident.confidence * 100)}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Detection Method:</span>
                                  <span className="font-medium">Multi-modal Analysis</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Response Time:</span>
                                  <span className="font-medium">2.3 seconds</span>
                                </div>
                              </div>
                              <div className="mt-3 p-3 bg-white rounded border">
                                <p className="text-xs text-muted-foreground">
                                  This incident was detected using a combination of video classification (detecting
                                  unusual movement patterns) and audio analysis (identifying elevated voice levels and
                                  aggressive speech patterns). The system automatically triggered an alert based on the
                                  high confidence score and severity classification.
                                </p>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h4 className="font-medium text-sm mb-3">Incident Timeline</h4>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3 text-sm">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-muted-foreground">
                                    {selectedIncident.timestamp.toLocaleTimeString()}
                                  </span>
                                  <span>Threat detected by AI system</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <span className="text-muted-foreground">
                                    {new Date(selectedIncident.timestamp.getTime() + 30000).toLocaleTimeString()}
                                  </span>
                                  <span>Alert sent to security team</span>
                                </div>
                                {selectedIncident.status === "resolved" && (
                                  <div className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-muted-foreground">
                                      {new Date(selectedIncident.timestamp.getTime() + 300000).toLocaleTimeString()}
                                    </span>
                                    <span>Incident resolved</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
