"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", listings: 65, bookings: 42, revenue: 24 },
  { name: "Feb", listings: 59, bookings: 39, revenue: 22 },
  { name: "Mar", listings: 80, bookings: 48, revenue: 28 },
  { name: "Apr", listings: 81, bookings: 52, revenue: 30 },
  { name: "May", listings: 56, bookings: 38, revenue: 21 },
  { name: "Jun", listings: 55, bookings: 43, revenue: 25 },
  { name: "Jul", listings: 40, bookings: 39, revenue: 22 },
  { name: "Aug", listings: 72, bookings: 51, revenue: 32 },
  { name: "Sep", listings: 90, bookings: 68, revenue: 42 },
  { name: "Oct", listings: 95, bookings: 71, revenue: 45 },
  { name: "Nov", listings: 85, bookings: 65, revenue: 40 },
  { name: "Dec", listings: 110, bookings: 82, revenue: 52 },
]

export function AdminChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="listings" stroke="#3b82f6" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="bookings" stroke="#10b981" />
          <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

