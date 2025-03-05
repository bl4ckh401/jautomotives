import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"

export interface Booking {
  id?: string
  userId: string
  carId: string
  startDate: Date
  endDate: Date
  status: "pending" | "confirmed" | "cancelled"
  totalPrice: number
}

export const bookingsCollection = collection(db, "bookings")

export const addBooking = async (booking: Omit<Booking, "id">): Promise<string> => {
  const docRef = await addDoc(bookingsCollection, booking)
  return docRef.id
}

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<void> => {
  const docRef = doc(bookingsCollection, id)
  await updateDoc(docRef, updates)
}

export const deleteBooking = async (id: string): Promise<void> => {
  const docRef = doc(bookingsCollection, id)
  await deleteDoc(docRef)
}

export const getBookings = async (filters?: Partial<Booking>): Promise<Booking[]> => {
  let q = query(bookingsCollection)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      q = query(q, where(key, "==", value))
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Booking)
}

