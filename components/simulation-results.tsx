"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Note: We're creating a mock chart component since recharts isn't available by default
function BarChart({ children, data }) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 rounded-md border bg-gray-50 p-4">
        <div className="mb-4 grid grid-cols-4 gap-2 border-b pb-2">
          {data[0] &&
            Object.keys(data[0]).map((key) => (
              <div key={key} className="text-xs font-medium">
                {key}
              </div>
            ))}
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2">
              {Object.values(item).map((value, i) => (
                <div key={i} className="text-sm">
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">Note: Interactive chart would be displayed here</div>
    </div>
  )
}

export function SimulationResults() {
  // Mock data for simulation results
  const cameraData = [
    { name: "Type A", count: 850, cost: 8500000 },
    { name: "Type B", count: 320, cost: 4800000 },
    { name: "Type C", count: 78, cost: 1560000 },
  ]

  const coverageData = [
    { name: "Urban", current: 95, simulated: 100 },
    { name: "Suburban", current: 85, simulated: 100 },
    { name: "Rural", current: 40, simulated: 50 },
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="cameras">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cameras">Camera Count</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="cameras" className="pt-4">
          <div className="h-[300px] w-full">
            <BarChart data={cameraData} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {cameraData.map((item) => (
              <Card key={item.name}>
                <CardContent className="p-4">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <div className="text-xs text-muted-foreground">Est. Cost: ${(item.cost / 1000000).toFixed(1)}M</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="pt-4">
          <div className="h-[300px] w-full">
            <BarChart data={coverageData} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-md bg-gray-50 p-4">
        <h3 className="font-medium">Simulation Summary</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Based on your parameters, the optimal configuration requires 1,248 total cameras (850 Type A, 320 Type B, and
          78 Type C) to achieve the desired coverage levels. This represents a 15% increase in efficiency compared to
          the current deployment.
        </p>
      </div>
    </div>
  )
}

