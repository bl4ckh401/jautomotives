"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const trafficData = [
  { name: "Jan", direct: 4000, organic: 2400, referral: 2400, social: 1800 },
  { name: "Feb", direct: 3000, organic: 1398, referral: 2210, social: 1400 },
  { name: "Mar", direct: 2000, organic: 9800, referral: 2290, social: 2300 },
  { name: "Apr", direct: 2780, organic: 3908, referral: 2000, social: 1700 },
  { name: "May", direct: 1890, organic: 4800, referral: 2181, social: 2100 },
  { name: "Jun", direct: 2390, organic: 3800, referral: 2500, social: 1900 },
]

const sourceData = [
  { name: "Direct", value: 35 },
  { name: "Organic Search", value: 40 },
  { name: "Referral", value: 15 },
  { name: "Social Media", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const topPages = [
  { page: "/", views: 12453, avgTime: "2:15", bounceRate: "32%" },
  { page: "/marketplace", views: 8763, avgTime: "3:42", bounceRate: "28%" },
  { page: "/rental", views: 6542, avgTime: "2:38", bounceRate: "35%" },
  { page: "/assistance", views: 4321, avgTime: "1:56", bounceRate: "40%" },
  { page: "/fleet", views: 3214, avgTime: "2:22", bounceRate: "33%" },
]

export function AdminAnalyticsTraffic() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Website traffic by source over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trafficData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="direct" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="organic" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="referral" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="social" stackId="1" stroke="#ff8800" fill="#ff8800" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Website traffic by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Avg. Time</TableHead>
                <TableHead>Bounce Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page) => (
                <TableRow key={page.page}>
                  <TableCell>{page.page}</TableCell>
                  <TableCell>{page.views}</TableCell>
                  <TableCell>{page.avgTime}</TableCell>
                  <TableCell>{page.bounceRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

