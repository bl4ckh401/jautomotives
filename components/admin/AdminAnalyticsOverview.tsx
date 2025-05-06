"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useAdmin } from "@/contexts/AdminContext"
import type { AnalyticsMetrics } from "@/services/analyticsService"
import { formatDistanceToNow } from "date-fns"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

const formatPercentage = (value: number) => {
  return `${Math.round(value)}%`
}

const getPercentageChange = (current: number, previous: number) => {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

export function AdminAnalyticsOverview() {
  const { getAnalytics } = useAdmin()
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics(30) // Last 30 days
        setMetrics(data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [getAnalytics])

  const userTypeData = metrics ? [
    { name: "Active Users", value: metrics.activeUsers },
    { name: "New Users", value: metrics.newUsers },
  ] : []

  const listingStatusData = metrics ? [
    { name: "Active", value: metrics.activeListings },
    { name: "Sold", value: metrics.soldListings },
  ] : []

  const bookingStatusData = metrics ? [
    { name: "Completed", value: metrics.completedBookings },
    { name: "Cancelled", value: metrics.cancelledBookings },
  ] : []

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  if (loading || !metrics) {
    return (
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-gray-100 dark:bg-gray-800 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Revenue Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Total revenue and average order value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</h3>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(getPercentageChange(
                  metrics.totalRevenue,
                  metrics.previousPeriod.totalRevenue
                ))} vs last period
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Avg. Order Value</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(metrics.totalRevenue / metrics.totalBookings || 0)}
              </h3>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: "Previous", value: metrics.previousPeriod.totalRevenue },
                { name: "Current", value: metrics.totalRevenue }
              ]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0088FE" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>
          <CardDescription>Active vs new users in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {userTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Total Users</p>
              <h3 className="text-2xl font-bold">{metrics.totalUsers}</h3>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(getPercentageChange(
                  metrics.totalUsers,
                  metrics.previousPeriod.totalUsers
                ))} vs last period
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">New Users</p>
              <h3 className="text-2xl font-bold">{metrics.newUsers}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listing Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Performance</CardTitle>
          <CardDescription>Distribution of listing statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={listingStatusData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {listingStatusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Total Listings</p>
              <h3 className="text-2xl font-bold">{metrics.totalListings}</h3>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(getPercentageChange(
                  metrics.totalListings,
                  metrics.previousPeriod.totalListings
                ))} vs last period
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Avg. Price</p>
              <h3 className="text-2xl font-bold">{formatCurrency(metrics.avgListingPrice)}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Analysis</CardTitle>
          <CardDescription>Overview of booking performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {bookingStatusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Total Bookings</p>
              <h3 className="text-2xl font-bold">{metrics.totalBookings}</h3>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(getPercentageChange(
                  metrics.totalBookings,
                  metrics.previousPeriod.totalBookings
                ))} vs last period
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Completion Rate</p>
              <h3 className="text-2xl font-bold">
                {formatPercentage(
                  (metrics.completedBookings / metrics.totalBookings) * 100 || 0
                )}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

