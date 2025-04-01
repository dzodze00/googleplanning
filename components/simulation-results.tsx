"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for our data
type CameraData = {
  name: string
  count: number
  cost: number
}

type CoverageData = {
  name: string
  current: number
  simulated: number
}

// Add proper type annotation to the BarChart component
function BarChart<T extends Record<string, string | number>>({
  children,
  data,
}: {
  children?: React.ReactNode
  data: T[]
}) {
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
              {Object.entries(item).map(([key, value], i) => (
                <div key={i} className="text-sm">
                  {String(value)}
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
  // Initial mock data
  const initialCameraData: CameraData[] = [
    { name: "Type A", count: 850, cost: 8500000 },
    { name: "Type B", count: 320, cost: 4800000 },
    { name: "Type C", count: 78, cost: 1560000 },
  ]

  const initialCoverageData: CoverageData[] = [
    { name: "Urban", current: 95, simulated: 100 },
    { name: "Suburban", current: 85, simulated: 100 },
    { name: "Rural", current: 40, simulated: 50 },
  ]

  const [cameraData, setCameraData] = useState<CameraData[]>(initialCameraData)
  const [coverageData, setCoverageData] = useState<CoverageData[]>(initialCoverageData)
  const [simulationRun, setSimulationRun] = useState(false)
  const [summaryText, setSummaryText] = useState(
    "Based on your parameters, the optimal configuration requires 1,248 total cameras (850 Type A, 320 Type B, and 78 Type C) to achieve the desired coverage levels. This represents a 15% increase in efficiency compared to the current deployment.",
  )

  useEffect(() => {
    // Listen for the simulation complete event
    const handleSimulationComplete = (event: CustomEvent) => {
      const params = event.detail

      // Update camera data based on simulation parameters
      const newCameraData = [...initialCameraData]

      // Adjust Type A cameras based on urban coverage
      newCameraData[0].count = Math.round(850 * (params.urbanCoverage / 100))
      newCameraData[0].cost = newCameraData[0].count * 10000

      // Adjust Type B cameras based on suburban coverage and storefront option
      let typeBMultiplier = params.suburbanCoverage / 100
      if (params.includeStorefront) typeBMultiplier *= 1.2
      newCameraData[1].count = Math.round(320 * typeBMultiplier)
      newCameraData[1].cost = newCameraData[1].count * 15000

      // Adjust Type C cameras based on rural coverage and 3D/birdseye options
      let typeCMultiplier = params.ruralCoverage / 100
      if (params.include3D) typeCMultiplier *= 1.3
      if (params.includeBirdseye) typeCMultiplier *= 1.5
      newCameraData[2].count = Math.round(78 * typeCMultiplier)
      newCameraData[2].cost = newCameraData[2].count * 20000

      setCameraData(newCameraData)

      // Update coverage data
      const newCoverageData = [
        { name: "Urban", current: 95, simulated: params.urbanCoverage },
        { name: "Suburban", current: 85, simulated: params.suburbanCoverage },
        { name: "Rural", current: 40, simulated: params.ruralCoverage },
      ]
      setCoverageData(newCoverageData)

      // Calculate total cameras
      const totalCameras = newCameraData.reduce((sum, item) => sum + item.count, 0)

      // Update summary text
      setSummaryText(
        `Based on your parameters, the optimal configuration requires ${totalCameras} total cameras (${newCameraData[0].count} Type A, ${newCameraData[1].count} Type B, and ${newCameraData[2].count} Type C) to achieve the desired coverage levels. This represents a ${params.updateFrequency === "accelerated" ? "25%" : params.updateFrequency === "reduced" ? "5%" : "15%"} increase in efficiency compared to the current deployment.`,
      )

      setSimulationRun(true)
    }

    window.addEventListener("simulationComplete", handleSimulationComplete as EventListener)

    return () => {
      window.removeEventListener("simulationComplete", handleSimulationComplete as EventListener)
    }
  }, [])

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
        <p className="text-sm text-muted-foreground mt-1">{summaryText}</p>
      </div>

      {!simulationRun && (
        <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-md">
          Click "Run Simulation" on the left panel to generate results based on your parameters.
        </div>
      )}
    </div>
  )
}

