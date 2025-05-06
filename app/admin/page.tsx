import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Calendar, Truck, Mail, PhoneCall, DollarSign } from "lucide-react"
import { AdminMetricCard } from "@/components/admin/AdminMetricCard"
import { AdminRecentActivity } from "@/components/admin/AdminRecentActivity"
import { AdminChart } from "@/components/admin/AdminChart"
import { AdminDashboardContent } from "@/components/admin/AdminDashboardContent"

export default function AdminDashboard() {
  return (
    <Suspense fallback={<AdminDashboardLoading />}>
      <AdminDashboardContent />
    </Suspense>
  )
}

function AdminDashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardDescription className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></CardDescription>
              <CardTitle className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-1"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
          </CardContent>
        </Card>
        
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

