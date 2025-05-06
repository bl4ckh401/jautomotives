"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "./AuthContext"
import { getAnalyticsMetrics, getChartData, getActivityLogs, logActivity, type ActivityLog, type AnalyticsMetrics, type ChartDataPoint } from "@/services/analyticsService"

// Admin user data interface
interface AdminData {
  isAdmin: boolean
  permissions: string[]
}

// Interface for the AdminContext
interface AdminContextType {
  isAdmin: boolean
  isLoading: boolean
  permissions: string[]
  users: any[]
  fetchUsers: () => Promise<any[]>
  updateUserRole: (userId: string, role: string) => Promise<void>
  deleteUser: (userId: string) => Promise<void>
  getMetrics: () => Promise<AnalyticsMetrics>
  getAnalytics: (days?: number) => Promise<AnalyticsMetrics>
  getChartMetrics: (months?: number) => Promise<ChartDataPoint[]>
  getRecentActivity: (limit?: number) => Promise<ActivityLog[]>
  logUserActivity: (activity: Omit<ActivityLog, "id" | "timestamp">) => Promise<void>
  initialAdminSetup: () => Promise<void>
}

// Create the context with default values
const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [permissions, setPermissions] = useState<string[]>([])
  const [users, setUsers] = useState<any[]>([])

  // Check if current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true)
      if (!user) {
        setIsAdmin(false)
        setPermissions([])
        setIsLoading(false)
        return
      }

      try {
        // Check admin collection for this user
        const adminRef = doc(db, "admins", user.id)
        const adminSnap = await getDoc(adminRef)

        if (adminSnap.exists()) {
          const adminData = adminSnap.data() as AdminData
          setIsAdmin(adminData.isAdmin)
          setPermissions(adminData.permissions || [])
        } else {
          setIsAdmin(false)
          setPermissions([])
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
        setPermissions([])
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [user])

  // Redirect non-admin users trying to access admin pages
  useEffect(() => {
    if (!isLoading && !isAdmin && user && 
        window.location.pathname.startsWith('/admin') && 
        window.location.pathname !== '/admin/init') {
      router.push('/')
    }
  }, [isAdmin, isLoading, user, router])

  // Fetch all users
  const fetchUsers = async () => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    try {
      const usersCollection = collection(db, "users")
      const usersSnap = await getDocs(usersCollection)
      
      const usersData = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setUsers(usersData)
      return usersData
    } catch (error) {
      console.error("Error fetching users:", error)
      throw error
    }
  }

  // Update a user's role
  const updateUserRole = async (userId: string, role: string) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    try {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, { role })
    } catch (error) {
      console.error("Error updating user role:", error)
      throw error
    }
  }

  // Delete a user
  const deleteUser = async (userId: string) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required")
    }

    try {
      const userRef = doc(db, "users", userId)
      await deleteDoc(userRef)
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  }

  // Analytics and metrics functions
  const getAnalytics = async (days = 30) => {
    if (!isAdmin) throw new Error("Unauthorized: Admin access required")
    return getAnalyticsMetrics(days)
  }

  const getChartMetrics = async (months = 6) => {
    if (!isAdmin) throw new Error("Unauthorized: Admin access required")
    return getChartData(months)
  }

  const getRecentActivity = async (limit = 10) => {
    if (!isAdmin) throw new Error("Unauthorized: Admin access required")
    return getActivityLogs(limit)
  }

  const logUserActivity = async (activity: Omit<ActivityLog, "id" | "timestamp">) => {
    if (!isAdmin) throw new Error("Unauthorized: Admin access required")
    return logActivity(activity)
  }

  // Legacy getMetrics for backward compatibility
  const getMetrics = async () => {
    return getAnalyticsMetrics() // Now returns full AnalyticsMetrics type
  }

  // Initialize admin setup
  const initialAdminSetup = async () => {
    if (!user) {
      throw new Error("Authentication required")
    }

    try {
      // Call the API route instead of directly updating Firestore
      const response = await fetch('/api/admin/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to set up admin access");
      }

      // Refresh admin status
      setIsAdmin(true);
      setPermissions(["all"]);
      
      return await response.json();
    } catch (error) {
      console.error("Error in admin setup:", error);
      throw error;
    }
  }

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        isLoading, 
        permissions, 
        users,
        fetchUsers,
        updateUserRole,
        deleteUser,
        getMetrics,
        getAnalytics,
        getChartMetrics,
        getRecentActivity,
        logUserActivity,
        initialAdminSetup
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}