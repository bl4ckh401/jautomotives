import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, orderBy, where, updateDoc, doc, GeoPoint } from "firebase/firestore"

export interface AssistanceRequest {
  id?: string
  name: string
  phone: string
  email?: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  vehicleDetails: {
    make?: string
    model?: string
    year?: string
    licensePlate?: string
  }
  issueType: "flat_tire" | "battery" | "fuel" | "lockout" | "tow" | "other"
  description: string
  status: "pending" | "accepted" | "en_route" | "on_site" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "emergency"
  createdAt: Date
  acceptedAt?: Date
  completedAt?: Date
  assignedTo?: string
  estimatedArrivalTime?: Date
}

export const assistanceCollection = collection(db, "assistanceRequests")

export const createAssistanceRequest = async (
  request: Omit<AssistanceRequest, "id" | "status" | "createdAt" | "priority">,
): Promise<string> => {
  // Calculate priority based on issue type and time of day
  const priority = calculatePriority(request.issueType)
  
  const docRef = await addDoc(assistanceCollection, {
    ...request,
    status: "pending",
    priority,
    createdAt: new Date(),
    location: {
      ...request.location,
      geoPoint: new GeoPoint(request.location.latitude, request.location.longitude)
    }
  })
  return docRef.id
}

export const updateAssistanceRequest = async (
  id: string,
  updates: Partial<AssistanceRequest>
): Promise<void> => {
  const docRef = doc(assistanceCollection, id)
  await updateDoc(docRef, {
    ...updates,
    ...(updates.status === "completed" ? { completedAt: new Date() } : {}),
    ...(updates.status === "accepted" ? { acceptedAt: new Date() } : {})
  })
}

export const getAssistanceRequests = async (
  filters?: Partial<AssistanceRequest>
): Promise<AssistanceRequest[]> => {
  let q = query(assistanceCollection, orderBy("createdAt", "desc"))

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        q = query(q, where(key, "==", value))
      }
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    acceptedAt: doc.data().acceptedAt?.toDate(),
    completedAt: doc.data().completedAt?.toDate(),
    estimatedArrivalTime: doc.data().estimatedArrivalTime?.toDate()
  })) as AssistanceRequest[]
}

function calculatePriority(
  issueType: AssistanceRequest["issueType"]
): AssistanceRequest["priority"] {
  switch (issueType) {
    case "battery":
    case "lockout":
      return "medium"
    case "fuel":
      return "low"
    case "tow":
      return "high"
    default:
      return "medium"
  }
}

