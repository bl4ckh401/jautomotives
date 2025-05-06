"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useAdmin } from "@/contexts/AdminContext"
import type { AnalyticsMetrics } from "@/services/analyticsService"

const formatPercentage = (value: number) => {
  return `${Math.round(value)}%`
}

export function AdminAnalyticsTraffic() {
  const { getAnalytics } = useAdmin()
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const data = await getAnalytics(30) // Last 30 days
        setMetrics(data)
      } catch (error) {
        console.error("Error fetching traffic data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrafficData()
  }, [getAnalytics])

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
      {/* Traffic Overview */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Total views and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium">Total Views</p>
              <h3 className="text-2xl font-bold">{metrics.totalViews.toLocaleString()}</h3>
            </div>
            <div>
              <p className="text-sm font-medium">Total Inquiries</p>
              <h3 className="text-2xl font-bold">{metrics.totalInquiries.toLocaleString()}</h3>
            </div>
            <div>
              <p className="text-sm font-medium">Conversion Rate</p>
              <h3 className="text-2xl font-bold">{formatPercentage(metrics.conversionRate)}</h3>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: "Previous", views: metrics.previousPeriod.totalViews || 0, inquiries: metrics.previousPeriod.totalInquiries || 0 },
                { name: "Current", views: metrics.totalViews, inquiries: metrics.totalInquiries }
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  name="Inquiries"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Rate</CardTitle>
          <CardDescription>User interaction with listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: "Previous", value: (metrics.previousPeriod.totalInquiries || 0) / (metrics.previousPeriod.totalViews || 1) * 100 },
                { name: "Current", value: (metrics.totalInquiries / metrics.totalViews || 0) * 100 }
              ]}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatPercentage(value as number)} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Engagement Rate"
                  stroke="#00C49F"
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Current Rate</p>
              <h3 className="text-2xl font-bold">
                {formatPercentage((metrics.totalInquiries / metrics.totalViews || 0) * 100)}
              </h3>
            </div>
            <div>
              <p className="text-sm font-medium">Previous Rate</p>
              <h3 className="text-2xl font-bold">
                {formatPercentage(
                  (metrics.previousPeriod.totalInquiries || 0) / (metrics.previousPeriod.totalViews || 1) * 100
                )}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listing Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Visibility</CardTitle>
          <CardDescription>Average views per listing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Previous", value: (metrics.previousPeriod.totalViews || 0) / (metrics.previousPeriod.totalListings || 1) },
                { name: "Current", value: metrics.totalViews / metrics.totalListings || 0 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Avg. Views" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Current Average</p>
              <h3 className="text-2xl font-bold">
                {Math.round(metrics.totalViews / metrics.totalListings || 0)}
              </h3>
            </div>
            <div>
              <p className="text-sm font-medium">Previous Average</p>
              <h3 className="text-2xl font-bold">
                {Math.round(
                  (metrics.previousPeriod.totalViews || 0) / (metrics.previousPeriod.totalListings || 1)
                )}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

