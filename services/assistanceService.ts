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

export const assistanceCollection = db ? collection(db, "assistanceRequests") : null

export const createAssistanceRequest = async (
  request: Omit<AssistanceRequest, "id" | "status" | "createdAt" | "priority">,
): Promise<string> => {
  if (!assistanceCollection) {
    throw new Error("Firebase not initialized")
  }
  
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
  if (!assistanceCollection) {
    throw new Error("Firebase not initialized")
  }
  
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
  try {
    // During build time or when Firebase is not available, return empty array
    if (!assistanceCollection || !db) {
      console.warn("Firebase not initialized, returning empty array")
      return []
    }
    
    let q = query(assistanceCollection, orderBy("createdAt", "desc"))

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          q = query(q, where(key, "==", value))
        }
      })
    }

    const querySnapshot = await getDocs(q)
    const results = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        // Safely convert Firestore timestamps to dates
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        acceptedAt: data.acceptedAt?.toDate ? data.acceptedAt.toDate() : undefined,
        completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : undefined,
        estimatedArrivalTime: data.estimatedArrivalTime?.toDate ? data.estimatedArrivalTime.toDate() : undefined
      }
    }) as AssistanceRequest[]
    
    return results
  } catch (error) {
    console.error("Error fetching assistance requests:", error)
    // Return empty array during build time or when Firebase is not available
    return []
  }
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

