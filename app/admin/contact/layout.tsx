"use client"

import { AdminProvider } from "@/contexts/AdminContext"

export default function AdminContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="container mx-auto p-6">
        {children}
      </div>
    </AdminProvider>
  )
}