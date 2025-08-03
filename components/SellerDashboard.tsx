"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Car, DollarSign, Eye, MessageSquare, Plus, Users } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleListing } from "@/types"
import { startOfMonth, subMonths, format } from "date-fns"

// Define chart data interface
interface ChartDataItem {
  month: Date;
  name: string;
  views: number;
  inquiries: number;
  listings: number;
}

// Define type chart data interface
interface TypeChartItem {
  type: string;
  count: number;
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const { getListings, loading: marketplaceLoading } = useMarketplace()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState<any[]>([])
  const [sales, setSales] = useState<any[]>([])
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [vehicleTypeData, setVehicleTypeData] = useState<TypeChartItem[]>([])

  // Fetch user's listings from Firestore
  useEffect(() => {
    const fetchUserListings = async () => {
      if (!user) return

      try {
        setLoading(true)
        // Use the getListings function from the MarketplaceContext with a filter for the current user
        const result = await getListings({ userId: user.id })
        
        // Format listings for display
        const formattedListings = result.listings.map(listing => ({
          id: listing.id,
          name: `${listing.year} ${listing.make} ${listing.model}`,
          price: new Intl.NumberFormat('en-US').format(Number(listing.price)),
          status: listing.status || "active",
          views: listing.views || 0,
          inquiries: listing.inquiries || 0,
          createdAt: listing.createdAt,
          vehicleType: listing.vehicleType
        }))
        
        setListings(formattedListings)
        
        // Generate chart data from listings
        generateChartData(result.listings)
        
        // Generate vehicle type data
        setVehicleTypeData(generateVehicleTypeData(formattedListings))
        
        // Filter sold listings for sales data
        const soldListings = result.listings.filter(listing => listing.status === "sold")
        const formattedSales = soldListings.map(listing => ({
          id: listing.id,
          vehicle: `${listing.year} ${listing.make} ${listing.model}`,
          price: new Intl.NumberFormat('en-US').format(Number(listing.price)),
          date: listing.soldDate || new Date().toISOString(),
          buyer: listing.buyerName || "Anonymous Buyer"
        }))
        
        setSales(formattedSales)
      } catch (error) {
        console.error("Error fetching user listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserListings()
  }, [user, getListings])

  // Generate chart data based on listings created in each month
  const generateChartData = (listings: any[]) => {
    // Initialize data for the last 6 months
    const months: ChartDataItem[] = []
    const today = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(today, i)
      months.push({
        month: startOfMonth(month),
        name: format(month, 'MMM'),
        views: 0,
        inquiries: 0,
        listings: 0
      })
    }
    
    // Aggregate data from listings
    listings.forEach(listing => {
      const createdAt = listing.createdAt ? new Date(listing.createdAt) : null
      
      if (createdAt) {
        // Find which month this listing belongs to
        const monthIndex = months.findIndex(m => 
          createdAt >= m.month && 
          (months[months.indexOf(m) + 1] ? createdAt < months[months.indexOf(m) + 1].month : true)
        )
        
        if (monthIndex >= 0) {
          months[monthIndex].views += listing.views || 0
          months[monthIndex].inquiries += listing.inquiries || 0
          months[monthIndex].listings += 1
        }
      }
    })
    
    setChartData(months)
  }

  // Generate data for vehicle type chart
  const generateVehicleTypeData = (listings: any[]): TypeChartItem[] => {
    // Count listings by vehicle type
    const typeCounts: Record<string, number> = {}
    
    listings.forEach(listing => {
      const type = listing.vehicleType || 'Other'
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })
    
    // Convert to array format for the chart
    return Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count) // Sort by count descending
      .slice(0, 6) // Show only top 6 types
  }

  // Calculate statistics
  const activeListings = listings.filter((listing) => listing.status === "active").length
  const totalSales = sales.reduce((sum, sale) => {
    const price = Number(sale.price.replace(/,/g, ""))
    return Number.isNaN(price) ? sum : sum + price
  }, 0)
  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0)
  const totalInquiries = listings.reduce((sum, listing) => sum + (listing.inquiries || 0), 0)

  if (loading || marketplaceLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Active Listings</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              {activeListings}
              <Car className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-pistachio" />
              <span className="text-pistachio font-medium">Active</span> listings
            </p>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>
            <CardTitle className="text-3xl flex items-center justify-between">
              ${(totalSales / 1000).toFixed(0)}k
              <DollarSign className="h-6 w-6 text-pistachio" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-pistachio" />
              <span className="text-pistachio font-medium">{sales.length}</span> completed sales
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
              <ArrowUpRight className="h-3 w-3 mr-1 text-pistachio" />
              <span className="text-pistachio font-medium">All</span> listings combined
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
              <ArrowUpRight className="h-3 w-3 mr-1 text-pistachio" />
              <span className="text-pistachio font-medium">All</span> inquiries received
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Track your listing views and inquiries over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
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
            ) : (
              <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">No data available for chart visualization</p>
              </div>
            )}
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle>Listings by Vehicle Type</CardTitle>
            <CardDescription>Distribution of your vehicles by category</CardDescription>
          </CardHeader>
          <CardContent>
            {vehicleTypeData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    layout="vertical" 
                    data={vehicleTypeData} 
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">No vehicle type data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
              {listings.length > 0 ? (
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
                                listing.status === "active"
                                  ? "bg-pistachio/20 text-pistachio hover:bg-pistachio/30 border-pistachio/30"
                                  : listing.status === "sold"
                                    ? "bg-primary/20 text-primary hover:bg-primary/30 border-primary/30"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                              }
                            >
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{listing.views.toLocaleString()}</TableCell>
                          <TableCell>{listing.inquiries}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Link href={`/marketplace/edit/${listing.id}`}>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                              </Link>
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
              ) : (
                <div className="text-center py-8">
                  <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Listings Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven't created any vehicle listings yet. Start selling by creating your first listing!
                  </p>
                  <Link href="/sell">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Create Your First Listing
                    </Button>
                  </Link>
                </div>
              )}
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
              {sales.length > 0 ? (
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
                            <Link href={`/marketplace/${sale.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Sales Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You haven't completed any sales yet. Sales will appear here once you've sold a vehicle.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

