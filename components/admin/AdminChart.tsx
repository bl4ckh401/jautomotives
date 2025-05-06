"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import type { ChartDataPoint } from "@/services/analyticsService"

interface AdminChartProps {
  data: ChartDataPoint[]
  loading?: boolean
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

export function AdminChart({ data, loading }: AdminChartProps) {
  if (loading) {
    return (
      <div className="w-full h-full bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse" />
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600/10" />
        <XAxis
          dataKey="date"
          className="text-xs font-medium"
        />
        <YAxis
          yAxisId="left"
          className="text-xs font-medium"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          className="text-xs font-medium"
          tickFormatter={(value) => formatCurrency(value)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px"
          }}
          formatter={(value: number, name: string) => [
            name === "revenue" ? formatCurrency(value) : value.toLocaleString(),
            name.charAt(0).toUpperCase() + name.slice(1)
          ]}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="listings"
          name="Listings"
          stroke="hsl(var(--blue-500))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="bookings"
          name="Bookings"
          stroke="hsl(var(--green-500))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="hsl(var(--amber-500))"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="users"
          name="Users"
          stroke="hsl(var(--purple-500))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

