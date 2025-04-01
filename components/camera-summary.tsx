import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, MapPin, Wrench, AlertTriangle } from "lucide-react"

export function CameraSummary() {
  const summaryData = [
    {
      title: "Total Cameras",
      value: "1,248",
      description: "Across all types",
      icon: Camera,
      color: "text-blue-500",
    },
    {
      title: "Deployed",
      value: "1,156",
      description: "Currently in field",
      icon: MapPin,
      color: "text-green-500",
    },
    {
      title: "In Service",
      value: "42",
      description: "Under maintenance",
      icon: Wrench,
      color: "text-orange-500",
    },
    {
      title: "Issues",
      value: "12",
      description: "Requiring attention",
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ]

  return (
    <>
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

