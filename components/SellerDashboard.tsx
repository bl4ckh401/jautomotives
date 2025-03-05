"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Car, DollarSign, Eye, MessageSquare, Plus, Users } from "lucide-react"
import Link from "next/link"

const initialListings = [
  { id: 1, name: "Rolls-Royce Phantom", price: "450,000", status: "Active", views: 1200, inquiries: 15 },
  { id: 2, name: "Bentley Continental GT", price: "200,000", status: "Sold", views: 980, inquiries: 8 },
  { id: 3, name: "Lamborghini Aventador", price: "400,000", status: "Active", views: 1500, inquiries: 20 },
  { id: 4, name: "Ferrari 488 GTB", price: "350,000", status: "Pending", views: 750, inquiries: 12 },
]

const initialSales = [
  { id: 1, vehicle: "Bentley Continental GT", price: "200,000", date: "2023-06-15", buyer: "John Doe" },
  { id: 2, vehicle: "Aston Martin DB11", price: "180,000", date: "2023-05-28", buyer: "Jane Smith" },
  { id: 3, vehicle: "Porsche 911 Turbo S", price: "220,000", date: "2023-04-10", buyer: "Robert Johnson" },
]

const chartData = [
  { name: "Jan", views: 400, inquiries: 24 },
  { name: "Feb", views: 600, inquiries: 28 },
  { name: "Mar", views: 500, inquiries: 26 },
  { name: "Apr", views: 700, inquiries: 29 },
  { name: "May", views: 900, inquiries: 32 },
  { name: "Jun", views: 1100, inquiries: 40 },
]

export default function SellerDashboard() {
  const [listings] = useState(initialListings)
  const [sales] = useState(initialSales)

  // Calculate statistics
  const activeListings = listings.filter((listing) => listing.status === "Active").length
  const totalSales = sales.reduce((sum, sale) => sum + Number.parseInt(sale.price.replace(/,/g, "")), 0)
  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0)
  const totalInquiries = listings.reduce((sum, listing) => sum + listing.inquiries, 0)

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Active Listings</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              {activeListings}
              <Car className="h-6 w-6 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">12%</span> from last month
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              ${(totalSales / 1000).toFixed(0)}k
              <DollarSign className="h-6 w-6 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8%</span> from last month
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Views</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              {totalViews.toLocaleString()}
              <Eye className="h-6 w-6 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">24%</span> from last month
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Inquiries</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              {totalInquiries}
              <MessageSquare className="h-6 w-6 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">18%</span> from last month
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your listing views and inquiries over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
                <Bar yAxisId="right" dataKey="inquiries" fill="#82ca9d" name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Listings and Sales Tabs */}
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listings">Your Listings</TabsTrigger>
          <TabsTrigger value="sales">Recent Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Listings</CardTitle>
                <CardDescription>Manage and monitor your vehicle listings</CardDescription>
              </div>
              <Link href="/sell">
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> New Listing
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Inquiries</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.name}</TableCell>
                        <TableCell>${listing.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              listing.status === "Active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                : listing.status === "Sold"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{listing.views.toLocaleString()}</TableCell>
                        <TableCell>{listing.inquiries}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              Promote
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Track your completed transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Price (USD)</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.vehicle}</TableCell>
                        <TableCell>${sale.price}</TableCell>
                        <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                            <Users className="h-4 w-4" />
                          </div>
                          {sale.buyer}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

