"use client"

export function CameraTypeDistribution() {
  // Mock data for camera distribution
  const data = [
    { name: "Type A (Street)", value: 850, color: "#4f46e5" },
    { name: "Type B (Street+Store+3D)", value: 320, color: "#06b6d4" },
    { name: "Type C (All Views)", value: 78, color: "#10b981" },
  ]

  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full flex-col">
        <div className="flex-1 rounded-md border bg-gray-50 p-4">
          <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
              <div key={item.name} className="flex flex-col items-center justify-center">
                <div className="mb-2 h-24 w-24 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{((item.value / 1248) * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 text-xs text-center text-muted-foreground">
          Note: Interactive pie chart would be displayed here
        </div>
      </div>
    </div>
  )
}

