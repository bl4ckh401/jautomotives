"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where, serverTimestamp, deleteDoc, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./AuthContext"
import { useToast } from "@/components/ui/use-toast"

// Booking status types
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"

// Booking interface
export interface Booking {
  id?: string
  userId: string
  userEmail: string
  vehicleId: string 
  vehicleDetails?: {
    make: string
    model: string
    year: string
    image: string
  }
  startDate: Date 
  endDate: Date
  totalPrice: number
  status: BookingStatus
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt?: any
  updatedAt?: any
  specialRequests?: string
  customerName: string
  customerPhone: string
  pickupLocation?: string
  dropoffLocation?: string
  driverRequired?: boolean
}

// Context interface
interface BookingContextType {
  // Booking operations
  createBooking: (bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt">) => Promise<string>
  getBooking: (bookingId: string) => Promise<Booking>
  updateBooking: (bookingId: string, data: Partial<Booking>) => Promise<void>
  cancelBooking: (bookingId: string) => Promise<void>
  getUserBookings: () => Promise<Booking[]>
  
  // State
  userBookings: Booking[]
  loading: boolean
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined)

// Provider component
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const { user } = useAuth()
  const { toast } = useToast()
  
  // Fetch user's bookings when user changes
  useEffect(() => {
    if (user) {
      getUserBookings()
    } else {
      setUserBookings([])
    }
  }, [user])
  
  // Create a new booking
  const createBooking = async (bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt">): Promise<string> => {
    if (!user) {
      throw new Error("You must be logged in to create a booking")
    }
    
    setLoading(true)
    try {
      // Add timestamps
      const booking = {
        ...bookingData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      // Check if the vehicle is available for the requested dates
      const isAvailable = await checkVehicleAvailability(
        booking.vehicleId, 
        booking.startDate, 
        booking.endDate
      )
      
      if (!isAvailable) {
        throw new Error("This vehicle is not available for the selected dates")
      }
      
      // Create the booking
      const docRef = await addDoc(collection(db, "bookings"), booking)
      
      toast({
        title: "Booking created",
        description: "Your booking request has been submitted."
      })
      
      // Fetch updated bookings
      getUserBookings()
      
      return docRef.id
    } catch (error: any) {
      toast({
        title: "Error creating booking",
        description: error.message || "There was a problem with your booking.",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  // Get a single booking by ID
  const getBooking = async (bookingId: string): Promise<Booking> => {
    try {
      const bookingRef = doc(db, "bookings", bookingId)
      const bookingSnap = await getDoc(bookingRef)
      
      if (!bookingSnap.exists()) {
        throw new Error("Booking not found")
      }
      
      const booking = {
        id: bookingId,
        ...bookingSnap.data()
      } as Booking
      
      // Convert Firestore timestamps to Date objects
      if (booking.startDate && typeof booking.startDate !== 'object') {
        booking.startDate = (booking.startDate as any).toDate()
      }
      
      if (booking.endDate && typeof booking.endDate !== 'object') {
        booking.endDate = (booking.endDate as any).toDate()
      }
      
      return booking
    } catch (error) {
      throw error
    }
  }
  
  // Update a booking
  const updateBooking = async (bookingId: string, data: Partial<Booking>): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to update a booking")
    }
    
    setLoading(true)
    try {
      const bookingRef = doc(db, "bookings", bookingId)
      const bookingSnap = await getDoc(bookingRef)
      
      if (!bookingSnap.exists()) {
        throw new Error("Booking not found")
      }
      
      const booking = bookingSnap.data() as Booking
      
      // Check if user owns this booking or is admin
      if (booking.userId !== user.id) {
        throw new Error("You don't have permission to update this booking")
      }
      
      // Update the booking
      await updateDoc(bookingRef, {
        ...data,
        updatedAt: serverTimestamp()
      })
      
      toast({
        title: "Booking updated",
        description: "Your booking has been updated successfully."
      })
      
      // Refresh user bookings
      getUserBookings()
    } catch (error: any) {
      toast({
        title: "Error updating booking",
        description: error.message || "There was a problem updating your booking.",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  // Cancel a booking
  const cancelBooking = async (bookingId: string): Promise<void> => {
    if (!user) {
      throw new Error("You must be logged in to cancel a booking")
    }
    
    setLoading(true)
    try {
      const bookingRef = doc(db, "bookings", bookingId)
      const bookingSnap = await getDoc(bookingRef)
      
      if (!bookingSnap.exists()) {
        throw new Error("Booking not found")
      }
      
      const booking = bookingSnap.data() as Booking
      
      // Check if user owns this booking
      if (booking.userId !== user.id) {
        throw new Error("You don't have permission to cancel this booking")
      }
      
      // Update the booking status to cancelled
      await updateDoc(bookingRef, {
        status: "cancelled",
        updatedAt: serverTimestamp()
      })
      
      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled."
      })
      
      // Refresh user bookings
      getUserBookings()
    } catch (error: any) {
      toast({
        title: "Error cancelling booking",
        description: error.message || "There was a problem cancelling your booking.",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  // Get user's bookings
  const getUserBookings = async (): Promise<Booking[]> => {
    if (!user) {
      return []
    }
    
    setLoading(true)
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc")
      )
      
      const querySnapshot = await getDocs(q)
      
      const bookings = querySnapshot.docs.map(doc => {
        const data = doc.data()
        const booking = {
          id: doc.id,
          ...data
        } as Booking
        
        // Convert Firestore timestamps to Date objects
        if (booking.startDate && typeof booking.startDate !== 'object') {
          booking.startDate = (booking.startDate as any).toDate()
        }
        
        if (booking.endDate && typeof booking.endDate !== 'object') {
          booking.endDate = (booking.endDate as any).toDate()
        }
        
        return booking
      })
      
      setUserBookings(bookings)
      return bookings
    } catch (error) {
      console.error("Error fetching user bookings:", error)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  // Helper function to check if a vehicle is available
  const checkVehicleAvailability = async (
    vehicleId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<boolean> => {
    try {
      // Query for bookings that overlap with the requested dates
      const q = query(
        collection(db, "bookings"),
        where("vehicleId", "==", vehicleId),
        where("status", "in", ["pending", "confirmed"]),
      )
      
      const querySnapshot = await getDocs(q)
      
      // Check each booking for date overlap
      for (const doc of querySnapshot.docs) {
        const booking = doc.data() as Booking
        
        // Convert Firestore timestamps to Date objects
        const bookingStartDate = booking.startDate instanceof Date 
          ? booking.startDate 
          : (booking.startDate as any).toDate()
          
        const bookingEndDate = booking.endDate instanceof Date 
          ? booking.endDate 
          : (booking.endDate as any).toDate()
        
        // Check for date overlap
        if (
          (startDate <= bookingEndDate && endDate >= bookingStartDate) ||
          (bookingStartDate <= endDate && bookingEndDate >= startDate)
        ) {
          return false
        }
      }
      
      return true
    } catch (error) {
      console.error("Error checking vehicle availability:", error)
      return false
    }
  }
  
  return (
    <BookingContext.Provider
      value={{
        createBooking,
        getBooking,
        updateBooking,
        cancelBooking,
        getUserBookings,
        userBookings,
        loading
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

// Custom hook to use the context
export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
} 