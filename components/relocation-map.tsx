"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            Reset View
          </Button>
        </div>
      </div>

      <div className="relative flex-1 rounded-md border bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive US map with camera relocations would be displayed here</p>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 rounded-md bg-white p-3 shadow-md">
          <h4 className="mb-2 text-sm font-medium">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Origin Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Destination Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">In Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Delayed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

