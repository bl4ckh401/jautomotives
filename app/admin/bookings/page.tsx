"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AdminBookingsTable } from "@/components/admin/AdminBookingsTable"
import { FileDown, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAdmin } from "@/contexts/AdminContext"

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAvatar?: string
  vehicleId: string
  vehicleDetails?: {
    make: string
    model: string
    year: string
  }
  startDate: Timestamp
  endDate: Timestamp
  totalPrice: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: Timestamp
  updatedAt?: Timestamp
  specialRequests?: string
}

interface BookingMetrics {
  today: number
  thisWeek: number
  pending: number
  completed: number
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [metrics, setMetrics] = useState<BookingMetrics>({ today: 0, thisWeek: 0, pending: 0, completed: 0 })
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAdmin()

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAdmin) return

      try {
        setLoading(true)
        const bookingsRef = collection(db, "bookings")
        const querySnapshot = await getDocs(bookingsRef)
        
        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[]

        // Calculate metrics
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

        const metrics = {
          today: fetchedBookings.filter(b => new Date(b.createdAt.seconds * 1000) >= startOfToday).length,
          thisWeek: fetchedBookings.filter(b => new Date(b.createdAt.seconds * 1000) >= startOfWeek).length,
          pending: fetchedBookings.filter(b => b.status === "pending").length,
          completed: fetchedBookings.filter(b => b.status === "completed").length
        }

        setBookings(fetchedBookings)
        setMetrics(metrics)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isAdmin])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage all rental and service bookings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-2xl">{loading ? "..." : metrics.today}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-2xl">{loading ? "..." : metrics.thisWeek}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl">{loading ? "..." : metrics.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-2xl">{loading ? "..." : metrics.completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </div>
            <AdminBookingsTable bookings={bookings} />
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." className="pl-8" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </div>
            <AdminBookingsTable bookings={bookings.filter(b => b.status === "pending")} />
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <AdminBookingsTable bookings={bookings.filter(b => b.status === "confirmed")} />
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <AdminBookingsTable bookings={bookings.filter(b => b.status === "completed")} />
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <AdminBookingsTable bookings={bookings.filter(b => b.status === "cancelled")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

