"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminTestDriveTable } from "@/components/admin/AdminTestDriveTable"
import { useAdmin } from "@/contexts/AdminContext"
import { getAllTestDriveBookings, getTestDriveBookingsByStatus } from "@/services/testDriveService"
import { TestDriveBooking } from "@/types/testDrive"
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Car
} from "lucide-react"

interface TestDriveMetrics {
  total: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
  todayBookings: number
  thisWeekBookings: number
}

export default function AdminTestDrivePage() {
  const [bookings, setBookings] = useState<TestDriveBooking[]>([])
  const [metrics, setMetrics] = useState<TestDriveMetrics>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    todayBookings: 0,
    thisWeekBookings: 0
  })
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAdmin()

  useEffect(() => {
    if (isAdmin) {
      fetchTestDriveBookings()
    }
  }, [isAdmin])

  const fetchTestDriveBookings = async () => {
    try {
      setLoading(true)
      const allBookings = await getAllTestDriveBookings()
      
      // Calculate metrics
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

      const metrics: TestDriveMetrics = {
        total: allBookings.length,
        pending: allBookings.filter(b => b.status === "pending").length,
        confirmed: allBookings.filter(b => b.status === "confirmed").length,
        completed: allBookings.filter(b => b.status === "completed").length,
        cancelled: allBookings.filter(b => b.status === "cancelled").length,
        todayBookings: allBookings.filter(b => {
          const bookingDate = new Date(b.createdAt)
          return bookingDate >= startOfToday
        }).length,
        thisWeekBookings: allBookings.filter(b => {
          const bookingDate = new Date(b.createdAt)
          return bookingDate >= startOfWeek
        }).length
      }

      setBookings(allBookings)
      setMetrics(metrics)
    } catch (error) {
      console.error("Error fetching test drive bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Test Drive Bookings</h1>
          <p className="text-muted-foreground">
            Manage and track all test drive appointments
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total}</div>
            <p className="text-xs text-muted-foreground">
              All time test drives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.confirmed}</div>
            <p className="text-xs text-muted-foreground">
              Ready for test drive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.completed}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.todayBookings}</div>
            <p className="text-xs text-muted-foreground">
              New bookings today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.thisWeekBookings}</div>
            <p className="text-xs text-muted-foreground">
              Bookings this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.cancelled}</div>
            <p className="text-xs text-muted-foreground">
              Cancelled bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.total > 0 
                ? Math.round((metrics.completed / metrics.total) * 100)
                : 0
              }%
            </div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Drive Table */}
      <Card>
        <CardHeader>
          <CardTitle>Test Drive Bookings</CardTitle>
          <CardDescription>
            Manage all test drive appointments and customer interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Bookings ({metrics.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({metrics.pending})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({metrics.confirmed})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({metrics.completed})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <AdminTestDriveTable 
                bookings={bookings} 
                onRefresh={fetchTestDriveBookings} 
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <AdminTestDriveTable 
                bookings={bookings.filter(b => b.status === "pending")} 
                onRefresh={fetchTestDriveBookings} 
              />
            </TabsContent>
            
            <TabsContent value="confirmed">
              <AdminTestDriveTable 
                bookings={bookings.filter(b => b.status === "confirmed")} 
                onRefresh={fetchTestDriveBookings} 
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <AdminTestDriveTable 
                bookings={bookings.filter(b => b.status === "completed")} 
                onRefresh={fetchTestDriveBookings} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
