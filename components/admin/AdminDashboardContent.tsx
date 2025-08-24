"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Calendar, Truck, Mail, PhoneCall, DollarSign, TestTube } from "lucide-react"
import { AdminMetricCard } from "@/components/admin/AdminMetricCard"
import { AdminRecentActivity } from "@/components/admin/AdminRecentActivity"
import { AdminChart } from "@/components/admin/AdminChart"
import { AdminDataMigration } from "@/components/admin/AdminDataMigration"
import { useAdmin } from "@/contexts/AdminContext"
import { getAllTestDriveBookings } from "@/services/testDriveService"
import type { AnalyticsMetrics, ChartDataPoint } from "@/services/analyticsService"
import { Button } from "@/components/ui/button"

export function AdminDashboardContent() {
  const { getAnalytics, getChartMetrics } = useAdmin()
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [testDriveMetrics, setTestDriveMetrics] = useState({ total: 0, pending: 0 })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true)
      const [analyticsData, chartMetrics, testDriveBookings] = await Promise.all([
        getAnalytics(30),
        getChartMetrics(6),
        getAllTestDriveBookings()
      ])
      setMetrics(analyticsData)
      setChartData(chartMetrics)
      
      // Calculate test drive metrics
      setTestDriveMetrics({
        total: testDriveBookings.length,
        pending: testDriveBookings.filter(booking => booking.status === 'pending').length
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }, [getAnalytics, getChartMetrics])

  useEffect(() => {
    fetchData()
    // Fetch data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  // Calculate percentage change
  const getPercentageChange = (current: number, previous: number) => {
    if (!previous) return 0
    return Math.round(((current - previous) / previous) * 100)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            {refreshing ? (
              <>
                <span className="animate-spin">⟳</span> Refreshing...
              </>
            ) : (
              <>
                ⟳ Refresh Data
              </>
            )}
          </Button>
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-md text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Data Migration Utility - Remove after migration is complete */}
      {/* <AdminDataMigration /> */}
      
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminMetricCard 
          title="Car Listings" 
          value={metrics?.totalListings || 0} 
          icon={Car} 
          change={getPercentageChange(
            metrics?.totalListings || 0,
            metrics?.previousPeriod.totalListings || 0
          )}
          color="blue"
          loading={loading}
        />
        <AdminMetricCard 
          title="Active Listings" 
          value={metrics?.activeListings || 0} 
          icon={Car} 
          change={getPercentageChange(
            metrics?.activeListings || 0,
            metrics?.previousPeriod.activeListings || 0
          )}
          color="green"
          loading={loading}
        />
        <AdminMetricCard 
          title="Total Users" 
          value={metrics?.totalUsers || 0} 
          icon={Truck} 
          change={getPercentageChange(
            metrics?.totalUsers || 0,
            metrics?.previousPeriod.totalUsers || 0
          )}
          color="purple"
          loading={loading}
        />
        <AdminMetricCard
          title="Bookings"
          value={metrics?.totalBookings || 0}
          icon={Mail}
          change={getPercentageChange(
            metrics?.totalBookings || 0,
            metrics?.previousPeriod.totalBookings || 0
          )}
          color="amber"
          loading={loading}
        />
        <AdminMetricCard
          title="Test Drives"
          value={testDriveMetrics.total}
          icon={TestTube}
          change={0}
          color="blue"
          loading={loading}
        />
        <AdminMetricCard
          title="Pending Test Drives"
          value={testDriveMetrics.pending}
          icon={Calendar}
          change={0}
          color="amber"
          loading={loading}
        />
        <AdminMetricCard
          title="Pending Requests"
          value={metrics?.totalInquiries || 0}
          icon={PhoneCall}
          change={getPercentageChange(
            metrics?.totalInquiries || 0,
            metrics?.previousPeriod.totalInquiries || 0
          )}
          color="red"
          loading={loading}
        />
        <AdminMetricCard 
          title="Revenue" 
          value={formatCurrency(metrics?.totalRevenue || 0)} 
          icon={DollarSign} 
          change={getPercentageChange(
            metrics?.totalRevenue || 0,
            metrics?.previousPeriod.totalRevenue || 0
          )}
          color="emerald"
          loading={loading}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Monitor key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] mt-4">
              <AdminChart data={chartData} loading={loading} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}