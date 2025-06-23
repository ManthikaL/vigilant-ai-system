"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Search, Filter, Clock, MapPin, User, CheckCircle } from "lucide-react"

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

interface AlertsPanelProps {
  incidents: Incident[]
}

export function AlertsPanel({ incidents }: AlertsPanelProps) {
  const [filteredIncidents, setFilteredIncidents] = useState(incidents)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

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
        return "bg-red-100 text-red-800 border-red-200"
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterIncidents(term, severityFilter, statusFilter)
  }

  const handleSeverityFilter = (severity: string) => {
    setSeverityFilter(severity)
    filterIncidents(searchTerm, severity, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterIncidents(searchTerm, severityFilter, status)
  }

  const filterIncidents = (search: string, severity: string, status: string) => {
    let filtered = incidents

    if (search) {
      filtered = filtered.filter(
        (incident) =>
          incident.description.toLowerCase().includes(search.toLowerCase()) ||
          incident.location.toLowerCase().includes(search.toLowerCase()) ||
          incident.type.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (severity !== "all") {
      filtered = filtered.filter((incident) => incident.severity === severity)
    }

    if (status !== "all") {
      filtered = filtered.filter((incident) => incident.status === status)
    }

    setFilteredIncidents(filtered)
  }

  const acknowledgeAlert = (id: string) => {
    // In a real app, this would update the backend
    console.log("Acknowledging alert:", id)
  }

  const resolveAlert = (id: string) => {
    // In a real app, this would update the backend
    console.log("Resolving alert:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Alert Management</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {filteredIncidents.filter((i) => i.status === "active").length} Active
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {filteredIncidents.filter((i) => i.status === "investigating").length} Investigating
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {filteredIncidents.filter((i) => i.status === "resolved").length} Resolved
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={handleSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-500">All systems are operating normally.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredIncidents.map((incident) => (
            <Card key={incident.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-lg">{incident.type}</CardTitle>
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(incident.status)}>{incident.status.toUpperCase()}</Badge>
                    </div>
                    <CardDescription className="text-base">{incident.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {incident.status === "active" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(incident.id)}>
                          <User className="h-4 w-4 mr-1" />
                          Acknowledge
                        </Button>
                        <Button size="sm" onClick={() => resolveAlert(incident.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time:</span>
                    <span>{incident.timestamp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Confidence:</span>
                    <span>{Math.round(incident.confidence * 100)}%</span>
                  </div>
                </div>

                {/* AI Analysis Summary */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">AI Analysis Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Threat detected using multi-modal analysis combining video classification and audio pattern
                    recognition. Confidence level indicates high probability of genuine security concern requiring
                    immediate attention.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
