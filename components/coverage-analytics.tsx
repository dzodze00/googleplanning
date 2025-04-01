"use client"

import { InteractiveChart } from "@/components/interactive-chart"

export function CoverageAnalytics() {
  const regions = [
    { name: "Northeast", coverage: 88, change: 2.1 },
    { name: "Southeast", coverage: 82, change: 3.4 },
    { name: "Midwest", coverage: 76, change: 1.8 },
    { name: "Southwest", coverage: 71, change: 4.2 },
    { name: "West", coverage: 79, change: 2.7 },
    { name: "Northwest", coverage: 74, change: 3.9 },
  ]

  const cameraTypeData = [
    { label: "Type A", value: 92, color: "#4f46e5" },
    { label: "Type B", value: 78, color: "#06b6d4" },
    { label: "Type C", value: 64, color: "#10b981" },
  ]

  const regionData = regions.map((region) => ({
    label: region.name,
    value: region.coverage,
    color: "#4f46e5",
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {regions.map((region) => (
          <div key={region.name} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{region.name}</h3>
              <span className={`text-xs ${region.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {region.change >= 0 ? "+" : ""}
                {region.change}%
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold">{region.coverage}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: `${region.coverage}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Coverage by Camera Type</h3>
        <div className="h-[200px]">
          <InteractiveChart data={cameraTypeData} type="bar" title="Coverage Percentage by Camera Type" />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Regional Coverage</h3>
        <div className="h-[250px]">
          <InteractiveChart data={regionData} type="line" title="Coverage Percentage by Region" />
        </div>
      </div>
    </div>
  )
}

