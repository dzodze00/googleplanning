"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export function CameraInventoryTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for camera inventory
  const cameras = [
    {
      id: "CAM-A-123",
      type: "Type A",
      capabilities: ["Street"],
      location: "Chicago, IL",
      lastService: "Jan 15, 2025",
      nextService: "Jan 15, 2026",
      status: "Operational",
    },
    {
      id: "CAM-B-456",
      type: "Type B",
      capabilities: ["Street", "Storefront", "3D"],
      location: "Houston, TX",
      lastService: "Feb 20, 2025",
      nextService: "Feb 20, 2026",
      status: "Operational",
    },
    {
      id: "CAM-C-789",
      type: "Type C",
      capabilities: ["Street", "Storefront", "3D", "Birdseye"],
      location: "Los Angeles, CA",
      lastService: "Mar 10, 2025",
      nextService: "Mar 10, 2026",
      status: "Operational",
    },
    {
      id: "CAM-A-234",
      type: "Type A",
      capabilities: ["Street"],
      location: "New York, NY",
      lastService: "Apr 5, 2024",
      nextService: "Apr 5, 2025",
      status: "In Service",
    },
    {
      id: "CAM-B-567",
      type: "Type B",
      capabilities: ["Street", "Storefront", "3D"],
      location: "Phoenix, AZ",
      lastService: "May 12, 2024",
      nextService: "May 12, 2025",
      status: "In Transit",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800"
      case "In Service":
        return "bg-orange-100 text-orange-800"
      case "In Transit":
        return "bg-blue-100 text-blue-800"
      case "Issue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Filter cameras based on search query and status filter
  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch =
      camera.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || camera.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cameras..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-[180px]">
            <option value="all">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="in service">In Service</option>
            <option value="in transit">In Transit</option>
            <option value="issue">Issues</option>
          </Select>
        </div>
        <Button variant="outline">Export</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Camera ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capabilities</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCameras.map((camera) => (
              <TableRow key={camera.id}>
                <TableCell className="font-medium">{camera.id}</TableCell>
                <TableCell>{camera.type}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {camera.capabilities.map((cap) => (
                      <Badge key={cap} variant="outline" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{camera.location}</TableCell>
                <TableCell>{camera.lastService}</TableCell>
                <TableCell>{camera.nextService}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(camera.status)}>{camera.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCameras.length} of {cameras.length} cameras
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
