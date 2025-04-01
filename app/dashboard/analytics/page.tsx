import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CoverageAnalytics } from "@/components/coverage-analytics"
import { UsageAnalytics } from "@/components/usage-analytics"
import { QualityMetrics } from "@/components/quality-metrics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-muted-foreground">Analyze camera coverage, usage patterns, and quality metrics</p>

      <Tabs defaultValue="coverage">
        <TabsList>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="coverage" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Overall Coverage</CardTitle>
                <CardDescription>Percentage of mapped areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">76.8%</div>
                <p className="text-sm text-muted-foreground">+2.4% from last quarter</p>
                <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "76.8%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Urban Coverage</CardTitle>
                <CardDescription>Major metropolitan areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">94.2%</div>
                <p className="text-sm text-muted-foreground">+1.1% from last quarter</p>
                <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "94.2%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rural Coverage</CardTitle>
                <CardDescription>Non-urban areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">42.5%</div>
                <p className="text-sm text-muted-foreground">+5.3% from last quarter</p>
                <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-orange-500" style={{ width: "42.5%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coverage Analytics</CardTitle>
              <CardDescription>Detailed breakdown of coverage by region and type</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CoverageAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Camera usage patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <UsageAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics</CardTitle>
              <CardDescription>Image quality and reliability metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <QualityMetrics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

