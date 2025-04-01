"use client"

import { InteractiveChart } from "@/components/interactive-chart"

export function QualityMetrics() {
  const qualityData = [
    { metric: "Image Resolution", score: 92, change: 1.5 },
    { metric: "Color Accuracy", score: 88, change: 2.2 },
    { metric: "Lighting Balance", score: 85, change: 3.1 },
    { metric: "Sharpness", score: 90, change: 1.8 },
    { metric: "Distortion", score: 94, change: 0.9 },
  ]

  const reliabilityData = [
    { metric: "Uptime", score: 99.8, change: 0.1 },
    { metric: "Data Transmission", score: 99.5, change: 0.2 },
    { metric: "Battery Life", score: 97.2, change: 1.5 },
    { metric: "Weather Resistance", score: 98.4, change: 0.7 },
    { metric: "Hardware Failures", score: 99.1, change: 0.4 },
  ]

  const qualityChartData = qualityData.map((item) => ({
    label: item.metric,
    value: item.score,
    color: "#4f46e5",
  }))

  const reliabilityChartData = reliabilityData.map((item) => ({
    label: item.metric,
    value: item.score,
    color: "#10b981",
  }))

  const trendData = [
    { label: "May", value: 87.2 },
    { label: "Jun", value: 87.5 },
    { label: "Jul", value: 88.1 },
    { label: "Aug", value: 88.3 },
    { label: "Sep", value: 88.7 },
    { label: "Oct", value: 89.0 },
    { label: "Nov", value: 89.2 },
    { label: "Dec", value: 89.5 },
    { label: "Jan", value: 89.7 },
    { label: "Feb", value: 89.8 },
    { label: "Mar", value: 90.1 },
    { label: "Apr", value: 90.4 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Image Quality Metrics</h3>
          <div className="h-[250px]">
            <InteractiveChart data={qualityChartData} type="bar" title="Quality Scores (out of 100)" />
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Reliability Metrics</h3>
          <div className="h-[250px]">
            <InteractiveChart data={reliabilityChartData} type="bar" title="Reliability Scores (%)" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Quality Trends (Last 12 Months)</h3>
        <div className="h-[250px]">
          <InteractiveChart data={trendData} type="line" title="Overall Quality Score Trend" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Overall Quality Score</h3>
          <div className="mt-2 text-3xl font-bold">89.8/100</div>
          <div className="mt-1 text-xs text-green-500">+2.1% from last quarter</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Overall Reliability</h3>
          <div className="mt-2 text-3xl font-bold">98.9%</div>
          <div className="mt-1 text-xs text-green-500">+0.3% from last quarter</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Quality Incidents</h3>
          <div className="mt-2 text-3xl font-bold">12</div>
          <div className="mt-1 text-xs text-red-500">+2 from last quarter</div>
        </div>
      </div>
    </div>
  )
}

