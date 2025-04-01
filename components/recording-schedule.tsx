import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExportButton } from "@/components/export-button"

export function RecordingSchedule() {
  const scheduleData = [
    {
      id: "REC-1234",
      cameraId: "CAM-A-567",
      location: "Chicago, IL",
      startDate: "May 15, 2025",
      startTime: "08:00 AM",
      duration: "4 hours",
      type: "Street View",
      status: "Scheduled",
    },
    {
      id: "REC-1235",
      cameraId: "CAM-B-892",
      location: "Miami, FL",
      startDate: "May 16, 2025",
      startTime: "10:30 AM",
      duration: "6 hours",
      type: "Street + Storefront",
      status: "Scheduled",
    },
    {
      id: "REC-1236",
      cameraId: "CAM-C-345",
      location: "Seattle, WA",
      startDate: "May 17, 2025",
      startTime: "09:15 AM",
      duration: "8 hours",
      type: "Full Coverage",
      status: "Scheduled",
    },
    {
      id: "REC-1237",
      cameraId: "CAM-A-678",
      location: "Denver, CO",
      startDate: "May 18, 2025",
      startTime: "07:45 AM",
      duration: "5 hours",
      type: "Street View",
      status: "Scheduled",
    },
    {
      id: "REC-1238",
      cameraId: "CAM-B-123",
      location: "Atlanta, GA",
      startDate: "May 19, 2025",
      startTime: "11:00 AM",
      duration: "4 hours",
      type: "Street + Storefront",
      status: "Scheduled",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous Week
          </Button>
          <Button variant="outline" size="sm">
            Next Week
          </Button>
        </div>
        <ExportButton data={scheduleData} filename="recording-schedule.csv" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recording ID</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.cameraId}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.startTime}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge variant="outline">{item.status}</Badge>
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
        <div className="text-sm text-muted-foreground">Showing 5 of 128 recordings</div>
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

