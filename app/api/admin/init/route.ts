import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { adminAuth } from "@/lib/firebase-admin"
import { getFirestore } from "firebase-admin/firestore"

// Initialize admin user
export async function POST() {
  try {
    // Get the session cookie
    const sessionCookie = cookies().get("session")?.value

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized: No session" }, { status: 401 })
    }

    // Verify the session cookie and get the user
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
    const uid = decodedClaims.uid

    if (!uid) {
      return NextResponse.json({ error: "Unauthorized: Invalid session" }, { status: 401 })
    }

    console.log("Checking for existing admins")

    // Get admin Firestore instance
    const adminDb = getFirestore()

    // Check if there are any existing admins
    const adminsSnapshot = await adminDb.collection("admins").get()

    if (!adminsSnapshot.empty) {
      // If there are already admins, only existing admins can create new ones
      const userAdminSnap = await adminDb.collection("admins").doc(uid).get()

      if (!userAdminSnap.exists || !userAdminSnap.data()?.isAdmin) {
        return NextResponse.json(
          { error: "Unauthorized: Admin accounts already exist" },
          { status: 403 }
        )
      }
    }

    console.log("Creating an admin")

    // Get the user's email
    const userRecord = await adminAuth.getUser(uid)
    const email = userRecord.email

    // Create the admin record with a specific document ID
    await adminDb.collection("admins").doc(uid).set({
      userId: uid,
      email,
      isAdmin: true,
      permissions: ["all"],
      createdAt: new Date().toISOString()
    })

    // Update the user's role in the users collection
    const userSnap = await adminDb.collection("users").doc(uid).get()

    if (userSnap.exists) {
      // If user doc exists, update it
      await adminDb.collection("users").doc(uid).set({ 
        role: "admin",
        updatedAt: new Date().toISOString()
      }, { merge: true })
    } else {
      // Create a new user document if it doesn't exist
      await adminDb.collection("users").doc(uid).set({ 
        id: uid, 
        email, 
        role: "admin",
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    console.log(`Admin access granted to user: ${email}`)

    return NextResponse.json(
      { success: true, message: "Admin access granted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error initializing admin:", error)
    return NextResponse.json(
      { error: "Failed to initialize admin" },
      { status: 500 }
    )
  }
}