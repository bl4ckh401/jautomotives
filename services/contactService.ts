import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore"

export interface ContactRequest {
  id?: string
  name: string
  email: string
  message: string
  status: "new" | "in-progress" | "resolved"
  createdAt: Date
}

export const contactCollection = collection(db, "contactRequests")

export const addContactRequest = async (
  request: Omit<ContactRequest, "id" | "status" | "createdAt">,
): Promise<string> => {
  const docRef = await addDoc(contactCollection, {
    ...request,
    status: "new",
    createdAt: new Date(),
  })
  return docRef.id
}

export const updateContactRequest = async (id: string, updates: Partial<ContactRequest>): Promise<void> => {
  const docRef = doc(contactCollection, id)
  await updateDoc(docRef, updates)
}

export const getContactRequests = async (filters?: Partial<ContactRequest>): Promise<ContactRequest[]> => {
  let q = query(contactCollection)

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      q = query(q, where(key, "==", value))
    })
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ContactRequest)
}

