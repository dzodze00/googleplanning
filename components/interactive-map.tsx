"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

// Demo data for camera locations
const DEMO_LOCATIONS = [
  { id: "CAM-A-123", lat: 41.8781, lng: -87.6298, type: "Type A", status: "Operational", city: "Chicago, IL" },
  { id: "CAM-B-456", lat: 29.7604, lng: -95.3698, type: "Type B", status: "Operational", city: "Houston, TX" },
  { id: "CAM-C-789", lat: 34.0522, lng: -118.2437, type: "Type C", status: "Operational", city: "Los Angeles, CA" },
  { id: "CAM-A-234", lat: 40.7128, lng: -74.006, type: "Type A", status: "In Service", city: "New York, NY" },
  { id: "CAM-B-567", lat: 33.4484, lng: -112.074, type: "Type B", status: "In Transit", city: "Phoenix, AZ" },
  { id: "CAM-C-890", lat: 25.7617, lng: -80.1918, type: "Type C", status: "Operational", city: "Miami, FL" },
  { id: "CAM-A-345", lat: 47.6062, lng: -122.3321, type: "Type A", status: "Operational", city: "Seattle, WA" },
  { id: "CAM-B-678", lat: 39.7392, lng: -104.9903, type: "Type B", status: "Operational", city: "Denver, CO" },
  { id: "CAM-C-901", lat: 33.749, lng: -84.388, type: "Type C", status: "Operational", city: "Atlanta, GA" },
  { id: "CAM-A-456", lat: 42.3601, lng: -71.0589, type: "Type A", status: "Operational", city: "Boston, MA" },
  { id: "CAM-B-789", lat: 37.7749, lng: -122.4194, type: "Type B", status: "Operational", city: "San Francisco, CA" },
  { id: "CAM-C-012", lat: 32.7767, lng: -96.797, type: "Type C", status: "Operational", city: "Dallas, TX" },
]

// Demo data for relocations
const DEMO_RELOCATIONS = [
  {
    id: "REL-1234",
    cameraId: "CAM-A-567",
    from: { lat: 41.8781, lng: -87.6298, city: "Chicago, IL" },
    to: { lat: 39.7392, lng: -104.9903, city: "Denver, CO" },
    status: "Scheduled",
  },
  {
    id: "REL-1235",
    cameraId: "CAM-B-892",
    from: { lat: 25.7617, lng: -80.1918, city: "Miami, FL" },
    to: { lat: 33.749, lng: -84.388, city: "Atlanta, GA" },
    status: "In Transit",
  },
  {
    id: "REL-1236",
    cameraId: "CAM-C-345",
    from: { lat: 47.6062, lng: -122.3321, city: "Seattle, WA" },
    to: { lat: 45.5051, lng: -122.675, city: "Portland, OR" },
    status: "Scheduled",
  },
]

interface InteractiveMapProps {
  type?: "deployment" | "relocation"
  filter?: string
  onSelectCamera?: (camera: any) => void
}

export function InteractiveMap({ type = "deployment", filter = "all", onSelectCamera }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredCamera, setHoveredCamera] = useState<any>(null)
  const [selectedCamera, setSelectedCamera] = useState<any>(null)

  // Map bounds for the US
  const mapBounds = {
    minLat: 24.396308, // Southern tip of Florida
    maxLat: 49.384358, // Northern border with Canada
    minLng: -125.0, // West Coast
    maxLng: -66.93457, // East Coast
  }

  // Convert lat/lng to canvas coordinates
  const latLngToXY = (lat: number, lng: number, canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const height = canvas.height

    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width
    const y = height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height

    return {
      x: x * zoom + offset.x,
      y: y * zoom + offset.y,
    }
  }

  // Convert canvas coordinates to lat/lng
  const xyToLatLng = (x: number, y: number, canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const height = canvas.height

    const adjustedX = (x - offset.x) / zoom
    const adjustedY = (y - offset.y) / zoom

    const lng = (adjustedX / width) * (mapBounds.maxLng - mapBounds.minLng) + mapBounds.minLng
    const lat = mapBounds.minLat + ((height - adjustedY) / height) * (mapBounds.maxLat - mapBounds.minLat)

    return { lat, lng }
  }

  // Draw the map
  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw US outline (simplified)
    ctx.beginPath()
    ctx.strokeStyle = "#cccccc"
    ctx.lineWidth = 1

    // Draw a simplified US outline
    const usOutline = [
      { lat: 49.0, lng: -123.0 }, // Northwest
      { lat: 49.0, lng: -95.0 }, // North
      { lat: 49.0, lng: -67.0 }, // Northeast
      { lat: 45.0, lng: -67.0 }, // East
      { lat: 25.0, lng: -80.0 }, // Southeast
      { lat: 25.0, lng: -97.0 }, // South
      { lat: 32.0, lng: -117.0 }, // Southwest
      { lat: 49.0, lng: -123.0 }, // Back to Northwest
    ]

    // Draw the outline
    ctx.beginPath()
    const firstPoint = latLngToXY(usOutline[0].lat, usOutline[0].lng, canvas)
    ctx.moveTo(firstPoint.x, firstPoint.y)

    for (let i = 1; i < usOutline.length; i++) {
      const point = latLngToXY(usOutline[i].lat, usOutline[i].lng, canvas)
      ctx.lineTo(point.x, point.y)
    }

    ctx.stroke()

    // Draw state borders (simplified)
    ctx.strokeStyle = "#dddddd"
    ctx.lineWidth = 0.5

    // Draw cameras based on type
    if (type === "deployment") {
      let filteredLocations = [...DEMO_LOCATIONS]

      if (filter !== "all") {
        filteredLocations = DEMO_LOCATIONS.filter((loc) => {
          if (filter === "typeA") return loc.type === "Type A"
          if (filter === "typeB") return loc.type === "Type B"
          if (filter === "typeC") return loc.type === "Type C"
          if (filter === "operational") return loc.status === "Operational"
          if (filter === "service") return loc.status === "In Service"
          if (filter === "transit") return loc.status === "In Transit"
          return true
        })
      }

      filteredLocations.forEach((location) => {
        const { x, y } = latLngToXY(location.lat, location.lng, canvas)

        // Determine color based on type and status
        let color = "#4f46e5" // Default blue
        if (location.type === "Type B") color = "#06b6d4" // Cyan
        if (location.type === "Type C") color = "#10b981" // Green
        if (location.status === "In Service") color = "#f59e0b" // Amber
        if (location.status === "In Transit") color = "#3b82f6" // Blue

        // Draw camera point
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(x, y, location === hoveredCamera || location === selectedCamera ? 8 : 6, 0, Math.PI * 2)
        ctx.fill()

        // Draw border for selected camera
        if (location === selectedCamera) {
          ctx.beginPath()
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 2
          ctx.arc(x, y, 10, 0, Math.PI * 2)
          ctx.stroke()
        }
      })
    } else if (type === "relocation") {
      // Draw relocations
      let filteredRelocations = [...DEMO_RELOCATIONS]

      if (filter !== "all") {
        filteredRelocations = DEMO_RELOCATIONS.filter((rel) => {
          if (filter === "scheduled") return rel.status === "Scheduled"
          if (filter === "inTransit") return rel.status === "In Transit"
          return true
        })
      }

      filteredRelocations.forEach((relocation) => {
        const fromPoint = latLngToXY(relocation.from.lat, relocation.from.lng, canvas)
        const toPoint = latLngToXY(relocation.to.lat, relocation.to.lng, canvas)

        // Draw line between points
        ctx.beginPath()
        ctx.strokeStyle = relocation.status === "In Transit" ? "#f59e0b" : "#3b82f6"
        ctx.lineWidth = 2
        ctx.moveTo(fromPoint.x, fromPoint.y)
        ctx.lineTo(toPoint.x, toPoint.y)
        ctx.stroke()

        // Draw arrow at midpoint
        const midX = (fromPoint.x + toPoint.x) / 2
        const midY = (fromPoint.y + toPoint.y) / 2
        const angle = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x)

        ctx.beginPath()
        ctx.fillStyle = relocation.status === "In Transit" ? "#f59e0b" : "#3b82f6"
        ctx.translate(midX, midY)
        ctx.rotate(angle)
        ctx.moveTo(0, 0)
        ctx.lineTo(-10, -5)
        ctx.lineTo(-10, 5)
        ctx.closePath()
        ctx.fill()
        ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform

        // Draw origin point
        ctx.beginPath()
        ctx.fillStyle = "#3b82f6" // Blue
        ctx.arc(fromPoint.x, fromPoint.y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Draw destination point
        ctx.beginPath()
        ctx.fillStyle = "#10b981" // Green
        ctx.arc(toPoint.x, toPoint.y, 6, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw tooltip for hovered camera
    if (hoveredCamera) {
      const { x, y } = latLngToXY(hoveredCamera.lat, hoveredCamera.lng, canvas)

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.roundRect(x + 15, y - 15, 150, 60, 5)
      ctx.fill()

      ctx.fillStyle = "white"
      ctx.font = "12px Arial"
      ctx.fillText(hoveredCamera.id, x + 25, y + 5)
      ctx.fillText(hoveredCamera.city, x + 25, y + 25)
      ctx.fillText(`${hoveredCamera.type} - ${hoveredCamera.status}`, x + 25, y + 45)
    }
  }

  // Handle mouse move for hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Handle dragging
    if (isDragging) {
      setOffset({
        x: offset.x + (x - dragStart.x),
        y: offset.y + (y - dragStart.y),
      })
      setDragStart({ x, y })
      return
    }

    // Check if hovering over a camera
    if (type === "deployment") {
      const hovered = DEMO_LOCATIONS.find((location) => {
        const point = latLngToXY(location.lat, location.lng, canvas)
        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
        return distance < 10
      })

      setHoveredCamera(hovered || null)
    }
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDragging(true)
    setDragStart({ x, y })

    // Check if clicking on a camera
    if (type === "deployment") {
      const clicked = DEMO_LOCATIONS.find((location) => {
        const point = latLngToXY(location.lat, location.lng, canvas)
        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
        return distance < 10
      })

      if (clicked) {
        setSelectedCamera(clicked)
        if (onSelectCamera) onSelectCamera(clicked)
      } else {
        setSelectedCamera(null)
        if (onSelectCamera) onSelectCamera(null)
      }
    }
  }

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false)
    setHoveredCamera(null)
  }

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 3))
  }

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5))
  }

  // Handle reset view
  const handleResetView = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  // Draw map when component mounts or when dependencies change
  useEffect(() => {
    drawMap()
  }, [zoom, offset, hoveredCamera, selectedCamera, type, filter])

  // Set up canvas size on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      drawMap()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 rounded-md border bg-gray-100">
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-grab"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />

        {/* Zoom controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            Zoom Out
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetView}>
            Reset View
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 rounded-md bg-white p-3 shadow-md">
          <h4 className="mb-2 text-sm font-medium">Legend</h4>
          <div className="space-y-2">
            {type === "deployment" ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Type A (Street)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                  <span className="text-xs">Type B (Street+Store+3D)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Type C (All Views)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">In Service</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Origin Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Destination Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">In Transit</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

