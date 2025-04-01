"use client"

import { InteractiveChart } from "@/components/interactive-chart"

export function UsageAnalytics() {
  const usageData = [
    { month: "Jan", views: 1.2, downloads: 0.8 },
    { month: "Feb", views: 1.4, downloads: 0.9 },
    { month: "Mar", views: 1.6, downloads: 1.1 },
    { month: "Apr", views: 1.8, downloads: 1.3 },
    { month: "May", views: 2.1, downloads: 1.5 },
    { month: "Jun", views: 2.3, downloads: 1.7 },
  ]

  const viewsData = usageData.map((item) => ({
    label: item.month,
    value: item.views,
    color: "#4f46e5",
  }))

  const downloadsData = usageData.map((item) => ({
    label: item.month,
    value: item.downloads,
    color: "#10b981",
  }))

  const locationData = [
    { label: "New York", value: 245 },
    { label: "Los Angeles", value: 198 },
    { label: "Chicago", value: 176 },
    { label: "Houston", value: 142 },
    { label: "Miami", value: 128 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
          <div className="mt-2 text-3xl font-bold">2.3M</div>
          <div className="mt-1 text-xs text-green-500">+12% from last month</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Downloads</h3>
          <div className="mt-2 text-3xl font-bold">1.7M</div>
          <div className="mt-1 text-xs text-green-500">+8% from last month</div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Unique Users</h3>
          <div className="mt-2 text-3xl font-bold">425K</div>
          <div className="mt-1 text-xs text-green-500">+15% from last month</div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Monthly Usage Trends</h3>
        <div className="h-[300px]">
          <InteractiveChart data={viewsData} type="line" title="Monthly Views (Millions)" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Top Viewed Locations</h3>
          <div className="h-[250px]">
            <InteractiveChart data={locationData} type="pie" title="Views by Location (Thousands)" />
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Views vs Downloads</h3>
          <div className="h-[250px]">
            <InteractiveChart
              data={[
                { label: "Views", value: 2.3, color: "#4f46e5" },
                { label: "Downloads", value: 1.7, color: "#10b981" },
              ]}
              type="bar"
              title="Views vs Downloads (Millions)"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

