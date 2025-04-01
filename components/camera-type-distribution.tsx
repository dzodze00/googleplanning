"use client"

import { InteractiveChart } from "@/components/interactive-chart"

export function CameraTypeDistribution() {
  // Mock data for camera distribution
  const data = [
    { label: "Type A (Street)", value: 850, color: "#4f46e5" },
    { label: "Type B (Street+Store+3D)", value: 320, color: "#06b6d4" },
    { label: "Type C (All Views)", value: 78, color: "#10b981" },
  ]

  return (
    <div className="h-[300px] w-full">
      <InteractiveChart data={data} type="pie" title="Camera Type Distribution" />
    </div>
  )
}

