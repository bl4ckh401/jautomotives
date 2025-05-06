"use client"

import { Suspense } from "react"
import AdminContactPageContent from "@/components/admin/AdminContactPageContent"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AdminContactPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminContactPageContent />
    </Suspense>
  )
}

