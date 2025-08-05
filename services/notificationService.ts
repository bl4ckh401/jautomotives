import { db } from "@/lib/firebase"
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  updateDoc,
  doc
} from "firebase/firestore"

export interface AdminNotification {
  id?: string
  type: "test_drive_booking" | "general" | "booking" | "inquiry"
  title: string
  message: string
  data?: any
  read: boolean
  createdAt?: any
  priority: "low" | "medium" | "high"
}

export const notificationsCollection = collection(db, "adminNotifications")

// Create a new admin notification
export const createAdminNotification = async (
  notification: Omit<AdminNotification, "id" | "createdAt">
): Promise<string> => {
  const docRef = await addDoc(notificationsCollection, {
    ...notification,
    createdAt: serverTimestamp()
  })
  return docRef.id
}

// Get all admin notifications
export const getAdminNotifications = async (): Promise<AdminNotification[]> => {
  const q = query(notificationsCollection, orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt
  })) as AdminNotification[]
}

// Get unread admin notifications
export const getUnreadAdminNotifications = async (): Promise<AdminNotification[]> => {
  const q = query(
    notificationsCollection, 
    where("read", "==", false),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt
  })) as AdminNotification[]
}

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const docRef = doc(notificationsCollection, notificationId)
  await updateDoc(docRef, {
    read: true
  })
}

// Create notification for new test drive booking
export const notifyAdminTestDriveBooking = async (
  customerName: string,
  vehicleName: string,
  preferredDate: Date,
  preferredTime: string,
  bookingId: string
): Promise<void> => {
  await createAdminNotification({
    type: "test_drive_booking",
    title: "New Test Drive Booking",
    message: `${customerName} has requested a test drive for ${vehicleName} on ${preferredDate.toLocaleDateString()} at ${preferredTime}`,
    data: {
      bookingId,
      customerName,
      vehicleName,
      preferredDate: preferredDate.toISOString(),
      preferredTime
    },
    read: false,
    priority: "high"
  })
}
