import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  serverTimestamp
} from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface User {
  id: string
  name: string | null
  email: string | null
  photoURL?: string | null
  role: "admin" | "user" | "seller"
  status: "active" | "pending" | "suspended"
  createdAt: string
  lastLogin?: string
  phone?: string
  location?: string
  bio?: string
}

// Create or update a user record when they sign in
export async function createUserRecord(userId: string, userData: {
  name: string | null;
  email: string | null;
  photoURL?: string | null;
}) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      // Update existing user with new login time
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        ...userData
      });
      return userSnap.id;
    } else {
      // Create new user record
      await setDoc(userRef, {
        id: userId,
        name: userData.name,
        email: userData.email,
        photoURL: userData.photoURL,
        role: "user", // Default role
        status: "active", // Default status
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      return userId;
    }
  } catch (error) {
    console.error("Error creating/updating user record:", error);
    throw error;
  }
}

// Get all users with pagination
export async function getUsers(
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  pageSize: number = 10
) {
  try {
    let usersQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    )

    // If lastVisible is provided, start after that document
    if (lastVisible) {
      usersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      )
    }

    const usersSnapshot = await getDocs(usersQuery)
    
    // Return both the users and the last document for pagination
    return {
      users: usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt instanceof Timestamp 
          ? doc.data().createdAt.toDate().toISOString() 
          : doc.data().createdAt,
        lastLogin: doc.data().lastLogin instanceof Timestamp 
          ? doc.data().lastLogin.toDate().toISOString() 
          : doc.data().lastLogin
      })) as User[],
      lastVisible: usersSnapshot.docs.length > 0 
        ? usersSnapshot.docs[usersSnapshot.docs.length - 1] 
        : null
    }
  } catch (error) {
    console.error("Error getting users:", error)
    throw error
  }
}

// Get users by role
export async function getUsersByRole(role: string) {
  try {
    const usersQuery = query(
      collection(db, "users"),
      where("role", "==", role),
      orderBy("createdAt", "desc")
    )
    
    const usersSnapshot = await getDocs(usersQuery)
    
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp 
        ? doc.data().createdAt.toDate().toISOString() 
        : doc.data().createdAt,
      lastLogin: doc.data().lastLogin instanceof Timestamp 
        ? doc.data().lastLogin.toDate().toISOString() 
        : doc.data().lastLogin
    })) as User[]
  } catch (error) {
    console.error("Error getting users by role:", error)
    throw error
  }
}

// Get users by status
export async function getUsersByStatus(status: string) {
  try {
    const usersQuery = query(
      collection(db, "users"),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    )
    
    const usersSnapshot = await getDocs(usersQuery)
    
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt instanceof Timestamp 
        ? doc.data().createdAt.toDate().toISOString() 
        : doc.data().createdAt,
      lastLogin: doc.data().lastLogin instanceof Timestamp 
        ? doc.data().lastLogin.toDate().toISOString() 
        : doc.data().lastLogin
    })) as User[]
  } catch (error) {
    console.error("Error getting users by status:", error)
    throw error
  }
}

// Get a single user
export async function getUser(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    
    if (!userDoc.exists()) {
      throw new Error("User not found")
    }
    
    const userData = userDoc.data()
    
    return {
      id: userDoc.id,
      ...userData,
      createdAt: userData.createdAt instanceof Timestamp 
        ? userData.createdAt.toDate().toISOString() 
        : userData.createdAt,
      lastLogin: userData.lastLogin instanceof Timestamp 
        ? userData.lastLogin.toDate().toISOString() 
        : userData.lastLogin
    } as User
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

// Update a user
export async function updateUser(userId: string, userData: Partial<User>) {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, userData)
    
    // If updating role to admin, also update the admin collection
    if (userData.role === "admin") {
      const adminRef = doc(db, "admins", userId)
      const adminDoc = await getDoc(adminRef)
      
      if (!adminDoc.exists()) {
        await updateDoc(adminRef, {
          userId,
          isAdmin: true,
          permissions: ["all"],
          email: userData.email,
          createdAt: new Date().toISOString()
        })
      }
    }
    
    return true
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

// Delete a user
export async function deleteUser(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    await deleteDoc(userRef)
    
    // Also check and delete from admins collection if exists
    const adminRef = doc(db, "admins", userId)
    const adminDoc = await getDoc(adminRef)
    
    if (adminDoc.exists()) {
      await deleteDoc(adminRef)
    }
    
    return true
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
} 