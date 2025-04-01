import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelocationPlanner } from "@/components/relocation-planner"
import { RelocationHistory } from "@/components/relocation-history"
import { RelocationMap } from "@/components/relocation-map"

export default function RelocationPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Relocation</h1>
      <p className="text-muted-foreground">Plan and track camera relocations across regions</p>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Relocations</TabsTrigger>
          <TabsTrigger value="planner">Relocation Planner</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Relocations</CardTitle>
                  <CardDescription>Scheduled camera relocations for the next 90 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <RelocationMap />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Relocation Stats</CardTitle>
                  <CardDescription>Current relocation metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Relocations</span>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Transit</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed (30 days)</span>
                    <span className="font-medium">76</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Transit Time</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Relocations</CardTitle>
              <CardDescription>Detailed list of all scheduled relocations</CardDescription>
            </CardHeader>
            <CardContent>
              <RelocationHistory upcoming={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Relocation Planner</CardTitle>
              <CardDescription>Plan and schedule new camera relocations</CardDescription>
            </CardHeader>
            <CardContent>
              <RelocationPlanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Relocation History</CardTitle>
              <CardDescription>Historical record of all camera relocations</CardDescription>
            </CardHeader>
            <CardContent>
              <RelocationHistory upcoming={false} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

