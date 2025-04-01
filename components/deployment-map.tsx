"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DeploymentMap() {
  const [mapType, setMapType] = useState("all")

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={mapType} onValueChange={setMapType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Camera Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cameras</SelectItem>
              <SelectItem value="typeA">Type A (Street)</SelectItem>
              <SelectItem value="typeB">Type B (Street+Store+3D)</SelectItem>
              <SelectItem value="typeC">Type C (All Views)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            Zoom Out
          </Button>
        </div>
      </div>
      <div className="relative flex-1 rounded-md border bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive map will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

