import { db } from "@/lib/firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import type { RentalCategory } from "@/lib/rentalCategories"

export interface RentalVehicle {
  id: string
  name: string
  make: string
  model: string
  year: number
  images: string[]
  pricePerDay: number
  category: RentalCategory
  transmission?: "automatic" | "manual"
  fuelType?: "petrol" | "diesel" | "hybrid" | "electric"
  seats?: number
  mileage?: number
  available: boolean
  description?: string
  features?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export const rentalCollection = collection(db, "rentalVehicles")

export const addRentalVehicle = async (
  vehicle: Omit<RentalVehicle, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  const docRef = await addDoc(rentalCollection, {
    ...vehicle,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateRentalVehicle = async (
  id: string,
  updates: Partial<RentalVehicle>
): Promise<void> => {
  const ref = doc(rentalCollection, id)
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() })
}

export const deleteRentalVehicle = async (id: string): Promise<void> => {
  const ref = doc(rentalCollection, id)
  await deleteDoc(ref)
}

export const getRentalVehicles = async (filters?: {
  category?: RentalCategory
  available?: boolean
}): Promise<RentalVehicle[]> => {
  let q = query(rentalCollection, orderBy("createdAt", "desc"))
  if (filters?.category) {
    q = query(q, where("category", "==", filters.category))
  }
  if (typeof filters?.available === "boolean") {
    q = query(q, where("available", "==", filters.available))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as RentalVehicle[]
}

export const getRentalVehicleById = async (id: string): Promise<RentalVehicle | null> => {
  const ref = doc(rentalCollection, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as any) } as RentalVehicle
}
