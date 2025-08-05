"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { createTestDriveBooking, checkTestDriveAvailability } from "@/services/testDriveService"
import { TestDriveAvailability, TestDriveBooking } from "@/types/testDrive"
import { CalendarIcon, Clock, User, Phone, FileText, MapPin } from "lucide-react"
import { format, addDays, isWeekend } from "date-fns"
import { cn } from "@/lib/utils"

interface Vehicle {
  id: string
  make: string
  model: string
  year: string | number
  image: string
  price: string | number
}

interface TestDriveModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
}

export function TestDriveModal({ isOpen, onClose, vehicle }: TestDriveModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [duration, setDuration] = useState<string>("60")
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [drivingLicense, setDrivingLicense] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [availability, setAvailability] = useState<TestDriveAvailability | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  // Pre-fill user information if available
  useEffect(() => {
    if (user) {
      setUserName(user.name || "")
    }
  }, [user])

  // Check availability when date changes
  useEffect(() => {
    if (selectedDate) {
      checkAvailabilityForDate(selectedDate)
    }
  }, [selectedDate])

  const checkAvailabilityForDate = async (date: Date) => {
    setIsCheckingAvailability(true)
    try {
      const availability = await checkTestDriveAvailability(vehicle.id, date)
      setAvailability(availability)
      // Reset selected time if it's no longer available
      if (selectedTime && !availability.slots.find(slot => slot.time === selectedTime && slot.available)) {
        setSelectedTime("")
      }
    } catch (error) {
      console.error("Error checking availability:", error)
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a test drive.",
        variant: "destructive"
      })
      return
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete information",
        description: "Please select a date and time for your test drive.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const booking: Omit<TestDriveBooking, "id" | "createdAt" | "updatedAt"> = {
        userId: user.id,
        userEmail: user.email || "",
        userName: userName.trim(),
        userPhone: userPhone.trim(),
        vehicleId: vehicle.id,
        vehicleDetails: {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          image: vehicle.image,
          price: vehicle.price
        },
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        duration: parseInt(duration),
        pickupLocation: pickupLocation.trim() || "Dealership location",
        specialRequests: specialRequests.trim(),
        drivingLicense: drivingLicense.trim(),
        status: "pending"
      }

      await createTestDriveBooking(booking)
      
      toast({
        title: "Test drive booked!",
        description: `Your test drive for ${vehicle.year} ${vehicle.make} ${vehicle.model} has been scheduled for ${format(selectedDate, "PPP")} at ${selectedTime}. We'll contact you to confirm the details.`,
        duration: 5000
      })
      
      onClose()
      resetForm()
      
    } catch (error) {
      console.error("Error booking test drive:", error)
      toast({
        title: "Booking failed",
        description: "Failed to book your test drive. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(undefined)
    setSelectedTime("")
    setDuration("60")
    setUserName(user?.name || "")
    setUserPhone("")
    setDrivingLicense("")
    setPickupLocation("")
    setSpecialRequests("")
    setAvailability(null)
  }

  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
      selectedTime !== "loading" &&
      selectedTime !== "no-date" &&
      userName.trim() &&
      userPhone.trim() &&
      drivingLicense.trim()
    )
  }

  // Disable past dates and weekends
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || isWeekend(date)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Book Test Drive
          </DialogTitle>
          <div className="flex items-center gap-3 pt-2">
            <img 
              src={vehicle.image} 
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-16 h-12 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
              <p className="text-sm text-muted-foreground">
                Price: {typeof vehicle.price === 'number' 
                  ? `KES ${vehicle.price.toLocaleString()}` 
                  : vehicle.price
                }
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name *</Label>
                <Input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userPhone">Phone Number *</Label>
                <Input
                  id="userPhone"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drivingLicense">Driving License Number *</Label>
              <Input
                id="drivingLicense"
                value={drivingLicense}
                onChange={(e) => setDrivingLicense(e.target.value)}
                placeholder="Enter your driving license number"
                required
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Schedule Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="rounded-md border w-full"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selectedTime">Preferred Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {isCheckingAvailability ? (
                        <SelectItem value="loading" disabled>
                          Checking availability...
                        </SelectItem>
                      ) : availability && availability.slots.length > 0 ? (
                        availability.slots.map((slot) => (
                          <SelectItem 
                            key={slot.time} 
                            value={slot.time} 
                            disabled={!slot.available}
                          >
                            {slot.time} {!slot.available && "(Booked)"}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-date" disabled>
                          Please select a date first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Additional Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Dealership location (default) or specify preferred location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requirements or questions about the vehicle"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Booking..." : "Book Test Drive"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
