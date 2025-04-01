"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { InteractiveMap } from "@/components/interactive-map"

export function DeploymentMap() {
  const [mapType, setMapType] = useState("all")

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={mapType} onChange={(e) => setMapType(e.target.value)}>
            <option value="all">All Cameras</option>
            <option value="typeA">Type A (Street)</option>
            <option value="typeB">Type B (Street+Store+3D)</option>
            <option value="typeC">Type C (All Views)</option>
          </Select>
        </div>
      </div>
      <div className="relative flex-1">
        <InteractiveMap type="deployment" filter={mapType} />
      </div>
    </div>
  )
}
