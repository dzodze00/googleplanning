"use client"

export function UsageAnalytics() {
  const usageData = [
    { month: "Jan", views: 1.2, downloads: 0.8 },
    { month: "Feb", views: 1.4, downloads: 0.9 },
    { month: "Mar", views: 1.6, downloads: 1.1 },
    { month: "Apr", views: 1.8, downloads: 1.3 },
    { month: "May", views: 2.1, downloads: 1.5 },
    { month: "Jun", views: 2.3, downloads: 1.7 },
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
        <div className="h-[300px] w-full">
          <div className="flex h-full flex-col">
            <div className="flex-1 rounded-md border bg-gray-50 p-4">
              <div className="mb-4 grid grid-cols-7 gap-2 border-b pb-2">
                <div className="text-xs font-medium">Month</div>
                <div className="text-xs font-medium">Views (M)</div>
                <div className="text-xs font-medium">Downloads (M)</div>
              </div>
              <div className="space-y-2">
                {usageData.map((item) => (
                  <div key={item.month} className="grid grid-cols-7 gap-2">
                    <div className="text-sm">{item.month}</div>
                    <div className="text-sm">{item.views}</div>
                    <div className="text-sm">{item.downloads}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Note: Interactive chart would be displayed here
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Top Viewed Locations</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">New York, NY</span>
              <span className="text-sm font-medium">245K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Los Angeles, CA</span>
              <span className="text-sm font-medium">198K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Chicago, IL</span>
              <span className="text-sm font-medium">176K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Houston, TX</span>
              <span className="text-sm font-medium">142K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Miami, FL</span>
              <span className="text-sm font-medium">128K</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Top Downloaded Locations</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">New York, NY</span>
              <span className="text-sm font-medium">187K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Los Angeles, CA</span>
              <span className="text-sm font-medium">154K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Chicago, IL</span>
              <span className="text-sm font-medium">132K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">San Francisco, CA</span>
              <span className="text-sm font-medium">118K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Boston, MA</span>
              <span className="text-sm font-medium">96K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

