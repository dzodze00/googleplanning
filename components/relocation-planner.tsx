"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function RelocationPlanner() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cameraId, setCameraId] = useState("")
  const [cameraType, setCameraType] = useState("")
  const [priority, setPriority] = useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // In a real app, this would submit the form data to an API
  }

  return (
    <div className="space-y-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="camera-id">Camera ID</Label>
              <Select id="camera-id" value={cameraId} onChange={(e) => setCameraId(e.target.value)} required>
                <option value="" disabled>
                  Select a camera
                </option>
                <option value="CAM-A-567">CAM-A-567 (Chicago, IL)</option>
                <option value="CAM-B-892">CAM-B-892 (Miami, FL)</option>
                <option value="CAM-C-345">CAM-C-345 (Seattle, WA)</option>
                <option value="CAM-A-678">CAM-A-678 (Denver, CO)</option>
                <option value="CAM-B-123">CAM-B-123 (Atlanta, GA)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="camera-type">Camera Type</Label>
              <Select id="camera-type" value={cameraType} onChange={(e) => setCameraType(e.target.value)} required>
                <option value="" disabled>
                  Select camera type
                </option>
                <option value="Type A">Type A (Street View)</option>
                <option value="Type B">Type B (Street + Storefront)</option>
                <option value="Type C">Type C (Full Coverage)</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-location">Current Location</Label>
              <Input id="current-location" placeholder="e.g., Chicago, IL" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-location">New Location</Label>
              <Input id="new-location" placeholder="e.g., Denver, CO" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="relocation-date">Relocation Date</Label>
              <Input id="relocation-date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Relocation</Label>
            <textarea
              id="reason"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Provide details about why this camera needs to be relocated..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Schedule Relocation</Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 text-green-800">
            <h3 className="font-medium">Relocation Scheduled Successfully</h3>
            <p className="text-sm">The camera relocation has been scheduled and added to the queue.</p>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Relocation Details</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Relocation ID:</div>
                  <div className="text-sm">REL-1239</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Camera ID:</div>
                  <div className="text-sm">{cameraId || "CAM-A-567"}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">From:</div>
                  <div className="text-sm">Chicago, IL</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">To:</div>
                  <div className="text-sm">Denver, CO</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Scheduled Date:</div>
                  <div className="text-sm">May 25, 2025</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Status:</div>
                  <div className="text-sm">Scheduled</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Plan Another Relocation
            </Button>
            <Button>View All Relocations</Button>
          </div>
        </div>
      )}
    </div>
  )
}

