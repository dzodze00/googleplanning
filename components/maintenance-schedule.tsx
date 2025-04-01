import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExportButton } from "@/components/export-button"

export function MaintenanceSchedule() {
  const maintenanceData = [
    {
      id: "MAINT-4567",
      cameraId: "CAM-A-123",
      type: "Routine",
      location: "Chicago, IL",
      startDate: "May 10, 2025",
      endDate: "May 11, 2025",
      technician: "John Smith",
      status: "Scheduled",
    },
    {
      id: "MAINT-4568",
      cameraId: "CAM-B-456",
      type: "Hardware Upgrade",
      location: "Houston, TX",
      startDate: "May 15, 2025",
      endDate: "May 16, 2025",
      technician: "Maria Garcia",
      status: "Scheduled",
    },
    {
      id: "MAINT-4569",
      cameraId: "CAM-C-789",
      type: "Calibration",
      location: "Los Angeles, CA",
      startDate: "May 20, 2025",
      endDate: "May 20, 2025",
      technician: "David Johnson",
      status: "Scheduled",
    },
    {
      id: "MAINT-4570",
      cameraId: "CAM-A-234",
      type: "Repair",
      location: "New York, NY",
      startDate: "May 5, 2025",
      endDate: "May 7, 2025",
      technician: "Sarah Williams",
      status: "In Progress",
    },
    {
      id: "MAINT-4571",
      cameraId: "CAM-B-567",
      type: "Software Update",
      location: "Phoenix, AZ",
      startDate: "May 25, 2025",
      endDate: "May 25, 2025",
      technician: "Michael Brown",
      status: "Scheduled",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous Month
          </Button>
          <Button variant="outline" size="sm">
            Next Month
          </Button>
        </div>
        <ExportButton data={maintenanceData} filename="maintenance-schedule.csv" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Maintenance ID</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.cameraId}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
              <TableCell>{item.technician}</TableCell>
              <TableCell>
                <Badge variant={item.status === "In Progress" ? "default" : "outline"}>{item.status}</Badge>
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing 5 of 42 maintenance tasks</div>
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

