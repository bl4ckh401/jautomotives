import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore"

export interface AssistanceRequest {
  id?: string
  userId: string
  type: "towing" | "battery" | "fuel" | "lockout" | "tire" | "other"
  location: {
    latitude: number
    longitude: number
    address?: string
  }
  description: string
  status: "pending" | "in-progress" | "completed"
  createdAt: Date
  completedAt?: Date
}

export const assistanceCollection = collection(db, "assistanceRequests")

export const addAssistanceRequest = async (
  request: Omit<AssistanceRequest, "id" | "status" | "createdAt">,
): Promise<string> => {
  const docRef = await addDoc(assistanceCollection, {
    ...request,
    status: "pending",
    createdAt: new Date(),
  })
  return docRef.id
}

export const updateAssistanceRequest = async (id: string, updates: Partial<AssistanceRequest>): Promise<void> => {
  const docRef = doc(assistanceCollection, id)
  await updateDoc(docRef, updates)
}

export const getAssistanceRequests = async (filters?: Partial<AssistanceRequest>): Promise<AssistanceRequest[]> => {
  let q = query(assistanceCollection)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      q = query(q, where(key, "==", value))
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as AssistanceRequest)
}

