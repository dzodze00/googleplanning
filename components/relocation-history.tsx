import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RelocationHistory({ upcoming = true }: { upcoming?: boolean }) {
  const upcomingRelocations = [
    {
      id: "REL-1234",
      cameraId: "CAM-A-567",
      from: "Chicago, IL",
      to: "Denver, CO",
      date: "May 15, 2025",
      priority: "High",
      status: "Scheduled",
    },
    {
      id: "REL-1235",
      cameraId: "CAM-B-892",
      from: "Miami, FL",
      to: "Atlanta, GA",
      date: "May 18, 2025",
      priority: "Medium",
      status: "Scheduled",
    },
    {
      id: "REL-1236",
      cameraId: "CAM-C-345",
      from: "Seattle, WA",
      to: "Portland, OR",
      date: "May 22, 2025",
      priority: "Medium",
      status: "Scheduled",
    },
    {
      id: "REL-1237",
      cameraId: "CAM-A-678",
      from: "Denver, CO",
      to: "Salt Lake City, UT",
      date: "May 25, 2025",
      priority: "Low",
      status: "Scheduled",
    },
    {
      id: "REL-1238",
      cameraId: "CAM-B-123",
      from: "Atlanta, GA",
      to: "Nashville, TN",
      date: "May 28, 2025",
      priority: "High",
      status: "Scheduled",
    },
  ]

  const pastRelocations = [
    {
      id: "REL-1229",
      cameraId: "CAM-A-456",
      from: "Boston, MA",
      to: "New York, NY",
      date: "April 28, 2025",
      priority: "High",
      status: "Completed",
    },
    {
      id: "REL-1230",
      cameraId: "CAM-B-789",
      from: "San Francisco, CA",
      to: "Los Angeles, CA",
      date: "April 25, 2025",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: "REL-1231",
      cameraId: "CAM-C-234",
      from: "Dallas, TX",
      to: "Houston, TX",
      date: "April 22, 2025",
      priority: "Low",
      status: "Completed",
    },
    {
      id: "REL-1232",
      cameraId: "CAM-A-567",
      from: "Philadelphia, PA",
      to: "Chicago, IL",
      date: "April 18, 2025",
      priority: "Medium",
      status: "Completed",
    },
    {
      id: "REL-1233",
      cameraId: "CAM-B-890",
      from: "Phoenix, AZ",
      to: "Miami, FL",
      date: "April 15, 2025",
      priority: "High",
      status: "Completed",
    },
  ]

  const relocations = upcoming ? upcomingRelocations : pastRelocations

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-orange-600"
      case "Medium":
        return "text-blue-600"
      case "Low":
        return "text-green-600"
      case "Urgent":
        return "text-red-600"
      default:
        return ""
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "In Transit":
        return <Badge>In Transit</Badge>
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "Delayed":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Delayed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Relocation ID</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>{upcoming ? "Scheduled Date" : "Completion Date"}</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relocations.map((relocation) => (
            <TableRow key={relocation.id}>
              <TableCell className="font-medium">{relocation.id}</TableCell>
              <TableCell>{relocation.cameraId}</TableCell>
              <TableCell>{relocation.from}</TableCell>
              <TableCell>{relocation.to}</TableCell>
              <TableCell>{relocation.date}</TableCell>
              <TableCell>
                <span className={getPriorityColor(relocation.priority)}>{relocation.priority}</span>
              </TableCell>
              <TableCell>{getStatusBadge(relocation.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {relocations.length} of {upcoming ? 42 : 156} relocations
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

