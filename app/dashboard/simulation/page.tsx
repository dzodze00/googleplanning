import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimulationForm } from "@/components/simulation-form"
import { SimulationResults } from "@/components/simulation-results"

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Simulation</h1>
      <p className="text-muted-foreground">Run what-if scenarios to optimize camera deployment and scheduling</p>

      <Tabs defaultValue="camera-count">
        <TabsList>
          <TabsTrigger value="camera-count">Camera Count</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="relocation">Relocation</TabsTrigger>
          <TabsTrigger value="service">Service Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="camera-count">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Camera Count Simulation</CardTitle>
                <CardDescription>
                  Determine the optimal number of cameras needed based on coverage requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimulationForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
                <CardDescription>Estimated camera requirements based on input parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <SimulationResults />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}

