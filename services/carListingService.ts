import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, serverTimestamp, Timestamp } from "firebase/firestore"

export interface CarListing {
  id?: string
  make: string
  model: string
  year: number
  price: number
  description: string
  imageUrls: string[]
  sellerId: string
  status: "available" | "sold" | "pending" | "archived"
  title?: string
  seller?: string
  createdAt?: Timestamp
}

export const carListingsCollection = collection(db, "vehicleListings")

export const addCarListing = async (carListing: Omit<CarListing, "id" | "createdAt">): Promise<string> => {
  const docRef = await addDoc(carListingsCollection, {
    ...carListing,
    createdAt: serverTimestamp()
  })
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
  return querySnapshot.docs.map((doc) => ({ 
    id: doc.id, 
    ...doc.data(),
    // Always include these fields with defaults if missing
    title: doc.data().title || `${doc.data().year} ${doc.data().make} ${doc.data().model}`,
    seller: doc.data().seller || doc.data().sellerId
  }) as CarListing)
}

