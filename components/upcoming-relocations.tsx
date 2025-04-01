import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function UpcomingRelocations() {
  const relocations = [
    {
      id: "REL-1234",
      cameraId: "CAM-A-567",
      from: "Phoenix, AZ",
      to: "Denver, CO",
      date: "May 15, 2025",
    },
    {
      id: "REL-1235",
      cameraId: "CAM-B-892",
      from: "Miami, FL",
      to: "Atlanta, GA",
      date: "May 18, 2025",
    },
    {
      id: "REL-1236",
      cameraId: "CAM-C-345",
      from: "Seattle, WA",
      to: "Portland, OR",
      date: "May 22, 2025",
    },
  ]

  return (
    <div className="space-y-4">
      {relocations.map((relocation) => (
        <div key={relocation.id} className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <div className="font-medium">{relocation.cameraId}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{relocation.from}</span>
              <ArrowRight className="mx-1 h-3 w-3" />
              <span>{relocation.to}</span>
            </div>
            <div className="text-xs text-muted-foreground">{relocation.date}</div>
          </div>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All
      </Button>
    </div>
  )
}

