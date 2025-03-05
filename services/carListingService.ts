import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"

export interface CarListing {
  id?: string
  make: string
  model: string
  year: number
  price: number
  description: string
  imageUrls: string[]
  sellerId: string
  status: "available" | "sold" | "pending"
}

export const carListingsCollection = collection(db, "carListings")

export const addCarListing = async (carListing: Omit<CarListing, "id">): Promise<string> => {
  const docRef = await addDoc(carListingsCollection, carListing)
  return docRef.id
}

export const updateCarListing = async (id: string, updates: Partial<CarListing>): Promise<void> => {
  const docRef = doc(carListingsCollection, id)
  await updateDoc(docRef, updates)
}

export const deleteCarListing = async (id: string): Promise<void> => {
  const docRef = doc(carListingsCollection, id)
  await deleteDoc(docRef)
}

export const getCarListings = async (filters?: Partial<CarListing>): Promise<CarListing[]> => {
  let q = query(carListingsCollection)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      q = query(q, where(key, "==", value))
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as CarListing)
}

