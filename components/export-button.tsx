"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
  data: any[]
  filename?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportButton({ data, filename = "export.csv", variant = "outline", size = "sm" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = () => {
    setIsExporting(true)

    try {
      // Get headers from first item
      const headers = Object.keys(data[0])

      // Create CSV content
      const csvContent = [
        // Headers row
        headers.join(","),
        // Data rows
        ...data.map((item) =>
          headers
            .map((header) => {
              // Handle values with commas by wrapping in quotes
              const value = item[header]
              if (typeof value === "string" && value.includes(",")) {
                return `"${value}"`
              }
              return value
            })
            .join(","),
        ),
      ].join("\n")

      // Create blob and download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success message
      setTimeout(() => {
        setIsExporting(false)
      }, 1000)
    } catch (error) {
      console.error("Export failed:", error)
      setIsExporting(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={exportToCSV} disabled={isExporting}>
      {isExporting ? (
        "Exporting..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export
        </>
      )}
    </Button>
  )
}

