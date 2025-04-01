export function CoverageStats() {
  const coverageData = [
    { type: "Urban Streets", percentage: 95 },
    { type: "Suburban Streets", percentage: 85 },
    { type: "Rural Streets", percentage: 40 },
    { type: "Business Districts", percentage: 90 },
    { type: "Downtown Areas", percentage: 98 },
    { type: "3D Building Coverage", percentage: 75 },
    { type: "Birdseye Coverage", percentage: 30 },
  ]

  return (
    <div className="space-y-4">
      {coverageData.map((item) => (
        <div key={item.type} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">{item.type}</span>
            <span className="text-sm font-medium">{item.percentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${item.percentage}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

