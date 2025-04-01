"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { InteractiveMap } from "@/components/interactive-map"

export function RelocationMap() {
  const [mapType, setMapType] = useState("all")

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={mapType} onChange={(e) => setMapType(e.target.value)}>
            <option value="all">All Relocations</option>
            <option value="scheduled">Scheduled</option>
            <option value="inTransit">In Transit</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      <div className="relative flex-1">
        <InteractiveMap type="relocation" filter={mapType} />
      </div>
    </div>
  )
}

