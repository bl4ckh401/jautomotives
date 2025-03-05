import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAnalyticsOverview } from "@/components/admin/AdminAnalyticsOverview"
import { AdminAnalyticsTraffic } from "@/components/admin/AdminAnalyticsTraffic"
import { AdminAnalyticsConversion } from "@/components/admin/AdminAnalyticsConversion"
import { AdminAnalyticsRevenue } from "@/components/admin/AdminAnalyticsRevenue"
import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <AdminAnalyticsOverview />
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <AdminAnalyticsTraffic />
        </TabsContent>

        <TabsContent value="conversion" className="mt-6">
          <AdminAnalyticsConversion />
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <AdminAnalyticsRevenue />
        </TabsContent>
      </Tabs>
    </div>
  )
}

