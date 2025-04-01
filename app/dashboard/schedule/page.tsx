import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecordingSchedule } from "@/components/recording-schedule"
import { MaintenanceSchedule } from "@/components/maintenance-schedule"

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Schedule</h1>
      <p className="text-muted-foreground">Manage recording and maintenance schedules for all cameras</p>

      <Tabs defaultValue="recording">
        <TabsList>
          <TabsTrigger value="recording">Recording Schedule</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="recording" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recording Schedule</CardTitle>
              <CardDescription>Upcoming recording sessions for all cameras</CardDescription>
            </CardHeader>
            <CardContent>
              <RecordingSchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Upcoming maintenance for all cameras</CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceSchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View all scheduled activities in a calendar format</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex h-full items-center justify-center border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Calendar view would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

