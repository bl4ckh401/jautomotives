"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
} from "firebase/auth"
import { app } from "@/lib/firebase"
import { createUserRecord } from "@/services/userService"

interface User {
  id: string
  name: string | null
  email: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get the ID token
          const idToken = await getIdToken(firebaseUser);
          
          // Create a session with the backend
          const response = await fetch("/api/auth/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });

          if (!response.ok) {
            console.error("Failed to create session");
            setUser(null);
            setLoading(false);
            return;
          }
          
          // Create the user object
          const userData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          };
          
          setUser(userData);
          
          // Save user data to Firestore
          try {
            await createUserRecord(firebaseUser.uid, {
              name: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            });
          } catch (error) {
            console.error("Error syncing user to Firestore:", error);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          setUser(null);
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const login = async (email: string, password: string) => {
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get the ID token
      const idToken = await getIdToken(userCredential.user);
      
      // Create a session with the backend
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }
      
      router.push("/dashboard")
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign in")
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      
      // Delete the session with the backend
      await fetch("/api/auth/session", {
        method: "DELETE",
      });
      
      router.push("/")
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign out")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      
      // Get the ID token
      const idToken = await getIdToken(userCredential.user);
      
      // Create a session with the backend
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }
      
      router.push("/dashboard")
    } catch (error: any) {
      throw new Error(error.message || "Failed to register")
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

