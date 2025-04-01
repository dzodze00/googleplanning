"use client"

export function CoverageAnalytics() {
  const regions = [
    { name: "Northeast", coverage: 88, change: 2.1 },
    { name: "Southeast", coverage: 82, change: 3.4 },
    { name: "Midwest", coverage: 76, change: 1.8 },
    { name: "Southwest", coverage: 71, change: 4.2 },
    { name: "West", coverage: 79, change: 2.7 },
    { name: "Northwest", coverage: 74, change: 3.9 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {regions.map((region) => (
          <div key={region.name} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{region.name}</h3>
              <span className={`text-xs ${region.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {region.change >= 0 ? "+" : ""}
                {region.change}%
              </span>
            </div>
            <div className="mt-2 text-2xl font-bold">{region.coverage}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: `${region.coverage}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Coverage by Camera Type</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Type A (Street View)</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: "92%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Type B (Street + Storefront)</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-green-500" style={{ width: "78%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Type C (Full Coverage)</span>
              <span className="text-sm font-medium">64%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-purple-500" style={{ width: "64%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[200px] items-center justify-center rounded-lg border bg-gray-50">
        <p className="text-muted-foreground">Interactive coverage map would be displayed here</p>
      </div>
    </div>
  )
}

