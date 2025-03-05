import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"

export interface FleetVehicle {
  id?: string
  make: string
  model: string
  year: number
  type: "sedan" | "suv" | "truck" | "van" | "luxury"
  status: "available" | "in-use" | "maintenance"
  dailyRate: number
  imageUrl: string
}

export const fleetCollection = collection(db, "fleet")

export const addFleetVehicle = async (vehicle: Omit<FleetVehicle, "id">): Promise<string> => {
  const docRef = await addDoc(fleetCollection, vehicle)
  return docRef.id
}

export const updateFleetVehicle = async (id: string, updates: Partial<FleetVehicle>): Promise<void> => {
  const docRef = doc(fleetCollection, id)
  await updateDoc(docRef, updates)
}

export const deleteFleetVehicle = async (id: string): Promise<void> => {
  const docRef = doc(fleetCollection, id)
  await deleteDoc(docRef)
}

export const getFleetVehicles = async (filters?: Partial<FleetVehicle>): Promise<FleetVehicle[]> => {
  let q = query(fleetCollection)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      q = query(q, where(key, "==", value))
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as FleetVehicle)
}

