import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraSummary } from "@/components/camera-summary"
import { DeploymentMap } from "@/components/deployment-map"
import { UpcomingRelocations } from "@/components/upcoming-relocations"
import { ServiceSchedule } from "@/components/service-schedule"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cameras">Cameras</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CameraSummary />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Current Deployment</CardTitle>
                <CardDescription>Camera locations across the United States</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <DeploymentMap />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Relocations</CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingRelocations />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Service Schedule</CardTitle>
                <CardDescription>Upcoming maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceSchedule />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="cameras">
          <Card>
            <CardHeader>
              <CardTitle>Camera Inventory</CardTitle>
              <CardDescription>All camera types and their current status</CardDescription>
            </CardHeader>
            <CardContent>{/* Camera inventory content will go here */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Recording Schedule</CardTitle>
              <CardDescription>Upcoming recording sessions</CardDescription>
            </CardHeader>
            <CardContent>{/* Schedule content will go here */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

