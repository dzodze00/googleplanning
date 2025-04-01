"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { InteractiveMap } from "@/components/interactive-map"

export function DeploymentMapFull() {
  const [mapType, setMapType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<any>(null)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={mapType} onChange={(e) => setMapType(e.target.value)}>
            <option value="all">All Cameras</option>
            <option value="typeA">Type A (Street)</option>
            <option value="typeB">Type B (Street+Store+3D)</option>
            <option value="typeC">Type C (All Views)</option>
            <option value="operational">Operational</option>
            <option value="service">In Service</option>
            <option value="transit">In Transit</option>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
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

      <div className="relative flex-1">
        <InteractiveMap type="deployment" filter={mapType} onSelectCamera={setSelectedCamera} />
      </div>

      {selectedCamera && (
        <div className="mt-4 rounded-md border p-4">
          <h3 className="font-medium">Selected Camera: {selectedCamera.id}</h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>Location:</div>
            <div>{selectedCamera.city}</div>
            <div>Type:</div>
            <div>{selectedCamera.type}</div>
            <div>Status:</div>
            <div>{selectedCamera.status}</div>
            <div>Last Updated:</div>
            <div>April 28, 2025</div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Schedule Service</Button>
          </div>
        </div>
      )}
    </div>
  )
}

