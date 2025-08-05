"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { getUserTestDriveBookings, updateTestDriveBooking } from "@/services/testDriveService"
import { TestDriveBooking } from "@/types/testDrive"
import { useToast } from "@/components/ui/use-toast"
import { 
  Calendar, 
  Clock, 
  Car, 
  MapPin, 
  Phone, 
  Mail,
  X,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function UserTestDrivePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<TestDriveBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserBookings()
    }
  }, [user])

  const fetchUserBookings = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const userBookings = await getUserTestDriveBookings(user.uid)
      setBookings(userBookings)
    } catch (error) {
      console.error("Error fetching test drive bookings:", error)
      toast({
        title: "Error",
        description: "Failed to load your test drive bookings.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateTestDriveBooking(bookingId, { status: "cancelled" })
      toast({
        title: "Booking cancelled",
        description: "Your test drive booking has been cancelled."
      })
      fetchUserBookings()
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast({
        title: "Error",
        description: "Failed to cancel the booking.",
        variant: "destructive"
      })
    }
  }

  const getStatusIcon = (status: TestDriveBooking['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: TestDriveBooking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">Please log in to view your test drive bookings.</p>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Test Drive Bookings</h1>
          <p className="text-muted-foreground">
            Track and manage your test drive appointments
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No test drive bookings</h3>
              <p className="text-muted-foreground mb-4">
                You haven't booked any test drives yet. Browse our vehicle listings to schedule one.
              </p>
              <Link href="/marketplace">
                <Button>Browse Vehicles</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Vehicle Image */}
                    <div className="lg:w-48 relative">
                      <img 
                        src={booking.vehicleDetails.image} 
                        alt={`${booking.vehicleDetails.year} ${booking.vehicleDetails.make} ${booking.vehicleDetails.model}`}
                        className="w-full h-32 lg:h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            {booking.vehicleDetails.year} {booking.vehicleDetails.make} {booking.vehicleDetails.model}
                          </h3>
                          <p className="text-muted-foreground">
                            Price: {typeof booking.vehicleDetails.price === 'number' 
                              ? `KES ${booking.vehicleDetails.price.toLocaleString()}` 
                              : booking.vehicleDetails.price
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <Badge variant="secondary" className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{format(new Date(booking.preferredDate), "EEEE, MMMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.preferredTime} ({booking.duration} minutes)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.pickupLocation || "Dealership location"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>License: {booking.drivingLicense}</span>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Special Requests: </span>
                          <span>{booking.specialRequests}</span>
                        </div>
                      )}

                      {booking.adminNotes && (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          <span className="font-medium">Admin Notes: </span>
                          <span>{booking.adminNotes}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Booked on {booking.createdAt && format(new Date(booking.createdAt), "MMM dd, yyyy")}
                        </div>
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id!)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                          {(booking.status === 'confirmed' || booking.status === 'completed') && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/vehicles/${booking.vehicleId}`}>
                                View Vehicle
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
