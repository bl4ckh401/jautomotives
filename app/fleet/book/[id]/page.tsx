"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { FleetVehicle } from "@/services/fleetService"
import { getDoc, doc, addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CalendarIcon, Car, CarFront, CheckCircle, DollarSign } from "lucide-react"

export default function BookFleetVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [vehicle, setVehicle] = useState<FleetVehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  
  // Booking details
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [driverName, setDriverName] = useState("")
  const [driverLicense, setDriverLicense] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        setError(null)
        const vehicleDoc = await getDoc(doc(db, "fleet", params.id))
        
        if (vehicleDoc.exists()) {
          const vehicleData = { id: vehicleDoc.id, ...vehicleDoc.data() } as FleetVehicle
          
          if (vehicleData.status !== "available") {
            setError("This vehicle is not available for booking")
          } else {
            setVehicle(vehicleData)
          }
        } else {
          setError("Vehicle not found")
        }
      } catch (err) {
        console.error("Error fetching vehicle:", err)
        setError("Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      fetchVehicle()
    } else {
      setError("You must be logged in to book a vehicle")
      setLoading(false)
    }
  }, [params.id, user])
  
  // Calculate number of days and total price
  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    
    const msPerDay = 1000 * 60 * 60 * 24
    const startDay = new Date(startDate).setHours(0, 0, 0, 0)
    const endDay = new Date(endDate).setHours(0, 0, 0, 0)
    
    return Math.max(1, Math.round(Math.abs(endDay - startDay) / msPerDay) + 1)
  }
  
  const calculateTotal = () => {
    if (!vehicle) return 0
    const days = calculateDays()
    return vehicle.dailyRate * days
  }
  
  // Form validation
  const isFormValid = () => {
    return (
      startDate && 
      endDate && 
      driverName.trim() !== "" && 
      driverLicense.trim() !== "" && 
      phoneNumber.trim() !== ""
    )
  }
  
  // Handle booking submission
  const handleBooking = async () => {
    if (!user || !vehicle || !isFormValid()) return
    
    try {
      setBookingLoading(true)
      
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        vehicleId: vehicle.id,
        vehicleDetails: {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          type: vehicle.type,
          dailyRate: vehicle.dailyRate
        },
        startDate,
        endDate,
        driverName,
        driverLicense,
        phoneNumber,
        specialRequests: specialRequests.trim() || null,
        totalDays: calculateDays(),
        totalPrice: calculateTotal(),
        status: "pending",
        createdAt: serverTimestamp(),
      }
      
      await addDoc(collection(db, "fleetBookings"), bookingData)
      
      toast({
        title: "Booking request submitted",
        description: "We'll contact you shortly to confirm your reservation.",
        variant: "success",
      })
      
      router.push("/dashboard")
      
    } catch (err) {
      console.error("Error submitting booking:", err)
      toast({
        title: "Booking failed",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setBookingLoading(false)
    }
  }
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/fleet" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Fleet
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <Skeleton className="w-full h-64 rounded-lg" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }
  
  // Render error state
  if (error || !vehicle || !user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/fleet" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Fleet
        </Link>
        
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Booking Unavailable</AlertTitle>
          <AlertDescription>
            {error || "This vehicle is currently unavailable for booking"}
            {!user && " You must be logged in to book a vehicle."}
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col items-center justify-center mt-8 text-center">
          {!user ? (
            <>
              <h3 className="text-xl font-medium mb-4">Please log in to book a vehicle</h3>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            </>
          ) : (
            <>
              <Car className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Vehicle Unavailable</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                The vehicle you're trying to book is currently unavailable or may have been reserved by another customer.
              </p>
              <Link href="/fleet">
                <Button>Browse Available Vehicles</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link href={`/fleet/vehicle/${vehicle.id}`} className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Vehicle Details
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Vehicle Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Summary</CardTitle>
              <CardDescription>You are booking the following vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                {vehicle.imageUrl ? (
                  <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    width={120}
                    height={90}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-700 w-28 h-20 flex items-center justify-center rounded-md">
                    <Car className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-muted-foreground capitalize">{vehicle.type}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CarFront className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Daily Rate</span>
                </div>
                <span className="font-medium">KES {vehicle.dailyRate}/day</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Rental Period</span>
                </div>
                <span className="font-medium">{calculateDays()} days</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Price</span>
                <span className="text-primary">${calculateTotal()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Please provide your information to complete the booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Rental Period</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick-up date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => 
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            (endDate ? date > endDate : false)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={!startDate}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Return date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => 
                            !startDate || date < startDate
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              {/* Driver Information */}
              <div className="space-y-2">
                <Label htmlFor="driverName">Driver's Full Name</Label>
                <Input 
                  id="driverName" 
                  value={driverName} 
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="Enter the name of the primary driver"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driverLicense">Driver's License Number</Label>
                <Input 
                  id="driverLicense" 
                  value={driverLicense} 
                  onChange={(e) => setDriverLicense(e.target.value)}
                  placeholder="Enter your driver's license number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Contact Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea 
                  id="specialRequests" 
                  value={specialRequests} 
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or requirements"
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleBooking}
                disabled={!isFormValid() || bookingLoading}
              >
                {bookingLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Booking
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                By completing this booking, you agree to our rental terms and conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 