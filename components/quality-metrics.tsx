"use client"

export function QualityMetrics() {
  const qualityData = [
    { metric: "Image Resolution", score: 92, change: 1.5 },
    { metric: "Color Accuracy", score: 88, change: 2.2 },
    { metric: "Lighting Balance", score: 85, change: 3.1 },
    { metric: "Sharpness", score: 90, change: 1.8 },
    { metric: "Distortion", score: 94, change: 0.9 },
  ]

  const reliabilityData = [
    { metric: "Uptime", score: 99.8, change: 0.1 },
    { metric: "Data Transmission", score: 99.5, change: 0.2 },
    { metric: "Battery Life", score: 97.2, change: 1.5 },
    { metric: "Weather Resistance", score: 98.4, change: 0.7 },
    { metric: "Hardware Failures", score: 99.1, change: 0.4 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Image Quality Metrics</h3>
          <div className="space-y-4">
            {qualityData.map((item) => (
              <div key={item.metric}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.score}/100</span>
                    <span className={`text-xs ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Reliability Metrics</h3>
          <div className="space-y-4">
            {reliabilityData.map((item) => (
              <div key={item.metric}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.score}%</span>
                    <span className={`text-xs ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Quality Trends (Last 12 Months)</h3>
        <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-muted-foreground">Interactive quality trend chart would be displayed here</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Overall Quality Score</h3>
          <div className="mt-2 text-3xl font-bold">89.8/100</div>
          <div className="mt-1 text-xs text-green-500">+2.1% from last quarter</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Overall Reliability</h3>
          <div className="mt-2 text-3xl font-bold">98.9%</div>
          <div className="mt-1 text-xs text-green-500">+0.3% from last quarter</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Quality Incidents</h3>
          <div className="mt-2 text-3xl font-bold">12</div>
          <div className="mt-1 text-xs text-red-500">+2 from last quarter</div>
        </div>
      </div>
    </div>
  )
}

