import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraInventoryTable } from "@/components/camera-inventory-table"
import { CameraTypeDistribution } from "@/components/camera-type-distribution"

export default function CamerasPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Camera Inventory</h1>

      <p className="text-muted-foreground">Manage and monitor all camera equipment across the system</p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Camera Distribution</CardTitle>
            <CardDescription>Current distribution of camera types and their deployment status</CardDescription>
          </CardHeader>
          <CardContent>
            <CameraTypeDistribution />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Camera Status</CardTitle>
            <CardDescription>Overview of camera operational status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Operational</span>
              <span className="font-medium">1,156 (92.6%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-green-500" style={{ width: "92.6%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">In Service</span>
              <span className="font-medium">42 (3.4%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-orange-500" style={{ width: "3.4%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">In Transit</span>
              <span className="font-medium">38 (3.0%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: "3.0%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Issues</span>
              <span className="font-medium">12 (1.0%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "1.0%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Cameras</TabsTrigger>
          <TabsTrigger value="typeA">Type A</TabsTrigger>
          <TabsTrigger value="typeB">Type B</TabsTrigger>
          <TabsTrigger value="typeC">Type C</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Cameras</CardTitle>
              <CardDescription>Complete inventory of all camera equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <CameraInventoryTable />
            </CardContent>
          </Card>
        </TabsContent>
        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}

