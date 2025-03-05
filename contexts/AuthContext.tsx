"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
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

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Replace with your actual auth check
        const token = localStorage.getItem("token")
        if (token) {
          // Verify token and get user data
          setUser({
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Replace with your actual login logic
      setUser({
        id: "1",
        name: "John Doe",
        email,
        role: "user",
      })
      localStorage.setItem("token", "dummy-token")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem("token")
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Replace with your actual registration logic
      setUser({
        id: "1",
        name,
        email,
        role: "user",
      })
      localStorage.setItem("token", "dummy-token")
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
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

