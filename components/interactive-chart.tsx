"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface InteractiveChartProps {
  data: DataPoint[]
  type: "bar" | "line" | "pie"
  height?: number
  title?: string
  showLegend?: boolean
}

export function InteractiveChart({
  data,
  type = "bar",
  height = 300,
  title,
  showLegend = true,
}: InteractiveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Default colors if not provided
  const defaultColors = [
    "#4f46e5", // indigo
    "#06b6d4", // cyan
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#14b8a6", // teal
    "#f97316", // orange
    "#6366f1", // indigo
  ]

  // Draw bar chart
  const drawBarChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const chartHeight = canvas.height - 60 // Leave space for labels
    const barWidth = (width - 60) / data.length - 10

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 20)
    ctx.lineTo(width - 20, chartHeight + 20)
    ctx.stroke()

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw bars
    data.forEach((point, index) => {
      const x = 50 + index * (barWidth + 10)
      const barHeight = (point.value / maxValue) * chartHeight
      const y = chartHeight + 20 - barHeight

      // Draw bar
      ctx.fillStyle = point.color || defaultColors[index % defaultColors.length]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Highlight hovered bar
      if (hoveredIndex === index) {
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, barWidth, barHeight)

        // Draw tooltip
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.roundRect(x - 20, y - 40, 100, 30, 5)
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${point.label}: ${point.value}`, x + barWidth / 2, y - 20)
      }

      // Draw label
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(point.label, x + barWidth / 2, chartHeight + 35)
    })
  }

  // Draw line chart
  const drawLineChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const chartHeight = canvas.height - 60
    const segmentWidth = (width - 60) / (data.length - 1)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 20)
    ctx.lineTo(width - 20, chartHeight + 20)
    ctx.stroke()

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value))

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#4f46e5"
    ctx.lineWidth = 2

    data.forEach((point, index) => {
      const x = 40 + index * segmentWidth
      const y = chartHeight + 20 - (point.value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw point
      ctx.fillStyle = point.color || defaultColors[0]
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Highlight hovered point
      if (hoveredIndex === index) {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Draw tooltip
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.roundRect(x - 50, y - 40, 100, 30, 5)
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${point.label}: ${point.value}`, x, y - 20)
      }

      // Draw label
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(point.label, x, chartHeight + 35)
    })

    ctx.stroke()
  }

  // Draw pie chart
  const drawPieChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Calculate total for percentages
    const total = data.reduce((sum, point) => sum + point.value, 0)

    // Draw pie slices
    let startAngle = 0

    data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * 2 * Math.PI
      const endAngle = startAngle + sliceAngle
      const midAngle = startAngle + sliceAngle / 2

      // Draw slice
      ctx.beginPath()
      ctx.fillStyle = point.color || defaultColors[index % defaultColors.length]
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()

      // Highlight hovered slice
      if (hoveredIndex === index) {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(midAngle)
        ctx.translate(-centerX, -centerY)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius + 10, -Math.PI / 2, Math.PI / 2)
        ctx.closePath()
        ctx.fillStyle = point.color || defaultColors[index % defaultColors.length]
        ctx.fill()

        ctx.restore()

        // Draw tooltip
        const tooltipX = centerX + Math.cos(midAngle) * (radius / 2)
        const tooltipY = centerY + Math.sin(midAngle) * (radius / 2)

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.roundRect(tooltipX - 50, tooltipY - 15, 100, 30, 5)
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`${point.label}: ${Math.round((point.value / total) * 100)}%`, tooltipX, tooltipY + 5)
      }

      startAngle = endAngle
    })

    // Draw center circle for donut effect
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2)
    ctx.fill()

    // Draw total in center
    ctx.fillStyle = "#111827"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), centerX, centerY - 10)
    ctx.font = "12px Arial"
    ctx.fillText("Total", centerX, centerY + 10)
  }

  // Draw chart based on type
  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw title if provided
    if (title) {
      ctx.fillStyle = "#111827"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.fillText(title, canvas.width / 2, 15)
    }

    // Draw chart based on type
    switch (type) {
      case "bar":
        drawBarChart(ctx, canvas)
        break
      case "line":
        drawLineChart(ctx, canvas)
        break
      case "pie":
        drawPieChart(ctx, canvas)
        break
    }

    // Draw legend if enabled
    if (showLegend) {
      const legendX = canvas.width - 150
      const legendY = 30

      data.forEach((point, index) => {
        const color = point.color || defaultColors[index % defaultColors.length]

        // Draw color box
        ctx.fillStyle = color
        ctx.fillRect(legendX, legendY + index * 20, 10, 10)

        // Draw label
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px Arial"
        ctx.textAlign = "left"
        ctx.fillText(point.label, legendX + 20, legendY + index * 20 + 9)
      })
    }
  }

  // Handle mouse move for hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Determine hovered element based on chart type
    let hoveredIdx = null

    if (type === "bar") {
      const chartHeight = canvas.height - 60
      const barWidth = (canvas.width - 60) / data.length - 10

      data.forEach((point, index) => {
        const barX = 50 + index * (barWidth + 10)
        const maxValue = Math.max(...data.map((d) => d.value))
        const barHeight = (point.value / maxValue) * chartHeight
        const barY = chartHeight + 20 - barHeight

        if (x >= barX && x <= barX + barWidth && y >= barY && y <= barY + barHeight) {
          hoveredIdx = index
        }
      })
    } else if (type === "line") {
      const chartHeight = canvas.height - 60
      const segmentWidth = (canvas.width - 60) / (data.length - 1)
      const maxValue = Math.max(...data.map((d) => d.value))

      data.forEach((point, index) => {
        const pointX = 40 + index * segmentWidth
        const pointY = chartHeight + 20 - (point.value / maxValue) * chartHeight
        const distance = Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2))

        if (distance <= 10) {
          hoveredIdx = index
        }
      })
    } else if (type === "pie") {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 40

      // Calculate distance from center
      const distFromCenter = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2))

      if (distFromCenter <= radius && distFromCenter >= radius * 0.5) {
        // Calculate angle
        const angle = Math.atan2(y - centerY, x - centerX)
        let adjustedAngle = angle
        if (angle < 0) adjustedAngle = Math.PI * 2 + angle

        // Calculate total for percentages
        const total = data.reduce((sum, point) => sum + point.value, 0)

        // Find which slice the angle corresponds to
        let startAngle = 0

        for (let i = 0; i < data.length; i++) {
          const sliceAngle = (data[i].value / total) * 2 * Math.PI
          const endAngle = startAngle + sliceAngle

          if (adjustedAngle >= startAngle && adjustedAngle <= endAngle) {
            hoveredIdx = i
            break
          }

          startAngle = endAngle
        }
      }
    }

    setHoveredIndex(hoveredIdx)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  // Set up canvas and draw chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = canvas.parentElement?.clientWidth || 300
    canvas.height = height

    drawChart()

    // Redraw on window resize
    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300
      drawChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [data, type, hoveredIndex])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        height={height}
        className="w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}

