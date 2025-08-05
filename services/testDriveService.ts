import { db } from "@/lib/firebase"
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore"
import { TestDriveBooking, TestDriveAvailability, TestDriveTimeSlot } from "@/types/testDrive"
import { notifyAdminTestDriveBooking } from "@/services/notificationService"

export const testDriveCollection = collection(db, "testDriveBookings")

// Create a new test drive booking
export const createTestDriveBooking = async (
  booking: Omit<TestDriveBooking, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  const docRef = await addDoc(testDriveCollection, {
    ...booking,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  
  // Notify admin about the new test drive booking
  try {
    await notifyAdminTestDriveBooking(
      booking.userName,
      `${booking.vehicleDetails.year} ${booking.vehicleDetails.make} ${booking.vehicleDetails.model}`,
      booking.preferredDate,
      booking.preferredTime,
      docRef.id
    )
  } catch (error) {
    console.error("Failed to notify admin about test drive booking:", error)
    // Don't throw error as the booking was successful
  }
  
  return docRef.id
}

// Update a test drive booking
export const updateTestDriveBooking = async (
  id: string, 
  updates: Partial<TestDriveBooking>
): Promise<void> => {
  const docRef = doc(testDriveCollection, id)
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp()
  })
}

// Delete a test drive booking
export const deleteTestDriveBooking = async (id: string): Promise<void> => {
  const docRef = doc(testDriveCollection, id)
  await deleteDoc(docRef)
}

// Get all test drive bookings (admin use)
export const getAllTestDriveBookings = async (): Promise<TestDriveBooking[]> => {
  const q = query(testDriveCollection, orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamps to Date objects
    preferredDate: doc.data().preferredDate?.toDate ? doc.data().preferredDate.toDate() : doc.data().preferredDate,
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt
  })) as TestDriveBooking[]
}

// Get test drive bookings by user
export const getUserTestDriveBookings = async (userId: string): Promise<TestDriveBooking[]> => {
  const q = query(
    testDriveCollection, 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamps to Date objects
    preferredDate: doc.data().preferredDate?.toDate ? doc.data().preferredDate.toDate() : doc.data().preferredDate,
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt
  })) as TestDriveBooking[]
}

// Get test drive bookings by vehicle
export const getVehicleTestDriveBookings = async (vehicleId: string): Promise<TestDriveBooking[]> => {
  const q = query(
    testDriveCollection, 
    where("vehicleId", "==", vehicleId),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamps to Date objects
    preferredDate: doc.data().preferredDate?.toDate ? doc.data().preferredDate.toDate() : doc.data().preferredDate,
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt
  })) as TestDriveBooking[]
}

// Get test drive bookings by status
export const getTestDriveBookingsByStatus = async (status: TestDriveBooking['status']): Promise<TestDriveBooking[]> => {
  const q = query(
    testDriveCollection, 
    where("status", "==", status),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamps to Date objects
    preferredDate: doc.data().preferredDate?.toDate ? doc.data().preferredDate.toDate() : doc.data().preferredDate,
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
    updatedAt: doc.data().updatedAt?.toDate ? doc.data().updatedAt.toDate() : doc.data().updatedAt
  })) as TestDriveBooking[]
}

// Check availability for a specific date and vehicle
export const checkTestDriveAvailability = async (
  vehicleId: string, 
  date: Date
): Promise<TestDriveAvailability> => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  // Get all confirmed bookings for this vehicle on this date
  const q = query(
    testDriveCollection,
    where("vehicleId", "==", vehicleId),
    where("status", "in", ["pending", "confirmed"]),
    where("preferredDate", ">=", Timestamp.fromDate(startOfDay)),
    where("preferredDate", "<=", Timestamp.fromDate(endOfDay))
  )
  
  const querySnapshot = await getDocs(q)
  const bookedSlots = querySnapshot.docs.map(doc => doc.data().preferredTime)

  // Generate time slots (9 AM to 6 PM, every hour)
  const timeSlots: TestDriveTimeSlot[] = []
  for (let hour = 9; hour <= 18; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    timeSlots.push({
      time,
      available: !bookedSlots.includes(time),
      booked: bookedSlots.includes(time)
    })
  }

  return {
    date: date.toISOString().split('T')[0],
    slots: timeSlots
  }
}

// Get available time slots for the next 30 days
export const getAvailableTestDriveSlots = async (vehicleId: string): Promise<TestDriveAvailability[]> => {
  const availability: TestDriveAvailability[] = []
  const today = new Date()
  
  for (let i = 1; i <= 30; i++) { // Start from tomorrow
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip weekends (optional - can be configured)
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    const dayAvailability = await checkTestDriveAvailability(vehicleId, date)
    availability.push(dayAvailability)
  }
  
  return availability
}
