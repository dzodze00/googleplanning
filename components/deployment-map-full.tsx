"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function DeploymentMapFull() {
  const [mapType, setMapType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

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
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
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

      {showFilters && (
        <div className="mb-4 grid grid-cols-2 gap-4 rounded-md border bg-gray-50 p-4 md:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="street" defaultChecked />
            <Label htmlFor="street">Street View</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="storefront" defaultChecked />
            <Label htmlFor="storefront">Storefront View</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="3d" defaultChecked />
            <Label htmlFor="3d">3D Building View</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="birdseye" defaultChecked />
            <Label htmlFor="birdseye">Birdseye View</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="operational" defaultChecked />
            <Label htmlFor="operational">Operational</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="service" defaultChecked />
            <Label htmlFor="service">In Service</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="transit" defaultChecked />
            <Label htmlFor="transit">In Transit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="issues" defaultChecked />
            <Label htmlFor="issues">Issues</Label>
          </div>
        </div>
      )}

      <div className="relative flex-1 rounded-md border bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive US map with camera deployment will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

