import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeploymentMapFull } from "@/components/deployment-map-full"
import { CoverageStats } from "@/components/coverage-stats"

export default function MapPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Deployment Map</h1>
      <p className="text-muted-foreground">Visualize camera deployment and coverage across the United States</p>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Deployment</TabsTrigger>
          <TabsTrigger value="planned">Planned Deployment</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Current Deployment</CardTitle>
                <CardDescription>Active camera locations across the United States</CardDescription>
              </CardHeader>
              <CardContent className="h-[600px]">
                <DeploymentMapFull />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage Statistics</CardTitle>
                  <CardDescription>Current coverage metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <CoverageStats />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Type A (Street)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Type B (Street+Store+3D)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Type C (All Views)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm">Planned Deployment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">In Service/Issue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}

