"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Demo data for calendar events
const DEMO_EVENTS = [
  {
    id: "REC-1234",
    date: "2025-05-15",
    type: "recording",
    title: "Chicago Recording",
    cameraId: "CAM-A-567",
    time: "08:00 AM",
  },
  {
    id: "REC-1235",
    date: "2025-05-16",
    type: "recording",
    title: "Miami Recording",
    cameraId: "CAM-B-892",
    time: "10:30 AM",
  },
  {
    id: "REC-1236",
    date: "2025-05-17",
    type: "recording",
    title: "Seattle Recording",
    cameraId: "CAM-C-345",
    time: "09:15 AM",
  },
  {
    id: "MAINT-4567",
    date: "2025-05-10",
    type: "maintenance",
    title: "Chicago Maintenance",
    cameraId: "CAM-A-123",
    time: "09:00 AM",
  },
  {
    id: "MAINT-4568",
    date: "2025-05-15",
    type: "maintenance",
    title: "Houston Maintenance",
    cameraId: "CAM-B-456",
    time: "10:00 AM",
  },
  {
    id: "MAINT-4569",
    date: "2025-05-20",
    type: "maintenance",
    title: "LA Maintenance",
    cameraId: "CAM-C-789",
    time: "08:30 AM",
  },
  {
    id: "REL-1234",
    date: "2025-05-15",
    type: "relocation",
    title: "Chicago to Denver",
    cameraId: "CAM-A-567",
    time: "All Day",
  },
  {
    id: "REL-1235",
    date: "2025-05-18",
    type: "relocation",
    title: "Miami to Atlanta",
    cameraId: "CAM-B-892",
    time: "All Day",
  },
  {
    id: "REL-1236",
    date: "2025-05-22",
    type: "relocation",
    title: "Seattle to Portland",
    cameraId: "CAM-C-345",
    time: "All Day",
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)) // May 2025
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Format date as YYYY-MM-DD
  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  // Get events for a specific day
  const getEventsForDay = (year: number, month: number, day: number) => {
    const dateString = formatDate(year, month, day)
    return DEMO_EVENTS.filter((event) => event.date === dateString)
  }

  // Get month name
  const getMonthName = (month: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months[month]
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get color for event type
  const getEventColor = (type: string) => {
    switch (type) {
      case "recording":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "maintenance":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "relocation":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  // Get icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "recording":
        return "🎥"
      case "maintenance":
        return "🔧"
      case "relocation":
        return "🚚"
      default:
        return "📅"
    }
  }

  // Handle event click
  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
  }

  // Close event details
  const closeEventDetails = () => {
    setSelectedEvent(null)
  }

  // Current month and year
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Days in current month
  const daysInMonth = getDaysInMonth(year, month)

  // First day of month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {getMonthName(month)} {year}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="bg-gray-50 rounded-md"></div>
          }

          const dateString = formatDate(year, month, day)
          const events = getEventsForDay(year, month, day)
          const isToday = day === 15 // Mock "today" as the 15th

          return (
            <div
              key={`day-${day}`}
              className={`border rounded-md p-1 min-h-[100px] ${isToday ? "border-blue-500 bg-blue-50" : ""}`}
            >
              <div className="text-right text-sm font-medium mb-1">{day}</div>
              <div className="space-y-1">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded border cursor-pointer truncate ${getEventColor(event.type)}`}
                    onClick={() => handleEventClick(event)}
                  >
                    <span className="mr-1">{getEventIcon(event.type)}</span>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">ID:</span>
                <span className="text-sm">{selectedEvent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Camera:</span>
                <span className="text-sm">{selectedEvent.cameraId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date:</span>
                <span className="text-sm">{selectedEvent.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time:</span>
                <span className="text-sm">{selectedEvent.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm capitalize">{selectedEvent.type}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeEventDetails}>
                Close
              </Button>
              <Button>View Details</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

