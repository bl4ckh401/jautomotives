"use client"

import type React from "react"
import { redirect, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminProvider, useAdmin } from "@/contexts/AdminContext"
import { useAuth } from "@/contexts/AuthContext"

// Client component that handles access check
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdmin()
  const { user, loading: authLoading } = useAuth()
  const pathname = usePathname()
  
  // Allow access to the init page without admin permissions
  const isInitPage = pathname === "/admin/init"
  
  if (isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }
  
  // User must be logged in for all admin pages including init
  if (!user) {
    redirect("/sign-in")
  }
  
  // If not the init page and not an admin, redirect to home
  if (!isInitPage && !isAdmin) {
    redirect("/")
  }

  // Skip sidebar and header for init page
  if (isInitPage) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 pt-8 md:py-8">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6 pt-6 md:pt-8">{children}</main>
      </div>
    </div>
  )
}

// Server component that wraps the client component with the provider
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  )
}

