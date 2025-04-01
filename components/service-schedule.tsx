import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ServiceSchedule() {
  const scheduleData = [
    {
      id: "SVC-4567",
      cameraId: "CAM-A-123",
      type: "Type A",
      location: "Chicago, IL",
      startDate: "May 10, 2025",
      endDate: "May 24, 2025",
      status: "Scheduled",
    },
    {
      id: "SVC-4568",
      cameraId: "CAM-B-456",
      type: "Type B",
      location: "Houston, TX",
      startDate: "May 15, 2025",
      endDate: "May 29, 2025",
      status: "Scheduled",
    },
    {
      id: "SVC-4569",
      cameraId: "CAM-C-789",
      type: "Type C",
      location: "Los Angeles, CA",
      startDate: "May 20, 2025",
      endDate: "June 3, 2025",
      status: "Scheduled",
    },
    {
      id: "SVC-4570",
      cameraId: "CAM-A-234",
      type: "Type A",
      location: "New York, NY",
      startDate: "May 5, 2025",
      endDate: "May 19, 2025",
      status: "In Progress",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service ID</TableHead>
          <TableHead>Camera</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.cameraId}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>
              <Badge variant={item.status === "In Progress" ? "default" : "outline"}>{item.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

