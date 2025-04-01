"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"

export function SimulationForm() {
  const [urbanCoverage, setUrbanCoverage] = useState(100)
  const [suburbanCoverage, setSuburbanCoverage] = useState(100)
  const [ruralCoverage, setRuralCoverage] = useState(50)
  const [includeStorefront, setIncludeStorefront] = useState(true)
  const [include3D, setInclude3D] = useState(true)
  const [includeBirdseye, setIncludeBirdseye] = useState(false)
  const [updateFrequency, setUpdateFrequency] = useState("standard")
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Simulate toast functionality
  const runSimulation = () => {
    setIsRunning(true)
    setIsComplete(false)

    // Simulate a delay for the simulation to run
    setTimeout(() => {
      setIsRunning(false)
      setIsComplete(true)

      // Dispatch a custom event to update the simulation results
      const event = new CustomEvent("simulationComplete", {
        detail: {
          urbanCoverage,
          suburbanCoverage,
          ruralCoverage,
          includeStorefront,
          include3D,
          includeBirdseye,
          updateFrequency,
        },
      })
      window.dispatchEvent(event)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Urban Coverage (%)</Label>
          <span className="text-sm">{urbanCoverage}%</span>
        </div>
        <Slider
          value={[urbanCoverage]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => setUrbanCoverage(value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Suburban Coverage (%)</Label>
          <span className="text-sm">{suburbanCoverage}%</span>
        </div>
        <Slider
          value={[suburbanCoverage]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => setSuburbanCoverage(value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Rural Coverage (%)</Label>
          <span className="text-sm">{ruralCoverage}%</span>
        </div>
        <Slider
          value={[ruralCoverage]}
          min={0}
          max={100}
          step={5}
          onValueChange={(value) => setRuralCoverage(value[0])}
        />
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="include-storefront">Include Storefront Views</Label>
          <Switch id="include-storefront" checked={includeStorefront} onCheckedChange={setIncludeStorefront} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="include-3d">Include 3D Building Views</Label>
          <Switch id="include-3d" checked={include3D} onCheckedChange={setInclude3D} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="include-birdseye">Include Birdseye Views</Label>
          <Switch id="include-birdseye" checked={includeBirdseye} onCheckedChange={setIncludeBirdseye} />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Label htmlFor="update-frequency">Update Frequency</Label>
        <Select id="update-frequency" value={updateFrequency} onChange={(e) => setUpdateFrequency(e.target.value)}>
          <option value="standard">Standard (As specified)</option>
          <option value="accelerated">Accelerated (50% faster)</option>
          <option value="reduced">Reduced (50% slower)</option>
        </Select>
      </div>

      <Button className="w-full mt-4" onClick={runSimulation} disabled={isRunning}>
        {isRunning ? "Running Simulation..." : isComplete ? "Run Simulation Again" : "Run Simulation"}
      </Button>

      {isRunning && (
        <div className="mt-2 text-center text-sm text-muted-foreground">Processing simulation... Please wait.</div>
      )}

      {isComplete && (
        <div className="mt-2 text-center text-sm text-green-600">
          Simulation complete! View results in the panel to the right.
        </div>
      )}
    </div>
  )
}
