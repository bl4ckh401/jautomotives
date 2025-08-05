"use client"

// import { Metadata } from "next"
import AdvancedSellForm from "@/components/AdvancedSellForm"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useAdmin } from "@/contexts/AdminContext"

// export const metadata: Metadata = {
//   title: "Sell Your Vehicle | JABA Automobiles",
//   description: "List your vehicle for sale on our marketplace with detailed information and features.",
// }

export default function SellVehiclePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { isAdmin } = useAdmin()
  const [isEditMode, setIsEditMode] = useState(false)
  
  useEffect(() => {
    // Check if we're in edit mode
    const urlParams = new URLSearchParams(window.location.search)
    const editId = urlParams.get('edit') || sessionStorage.getItem('editListingId')
    if (editId) {
      setIsEditMode(true)
    }
    
    // Redirect if not logged in or not an admin
    if (!user || !isAdmin) {
      router.push("/")
    }
  }, [user, isAdmin, router])

  // Don't render content until we verify admin status
  if (!user || !isAdmin) {
    return null
  }

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Listings", href: "/admin/listings" },
          { label: isEditMode ? "Edit Vehicle" : "Sell Vehicle", href: "/sell-vehicle" },
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {isEditMode ? "Edit Vehicle Listing" : "Sell Your Vehicle"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isEditMode 
            ? "Update your vehicle listing with any changes to information, features, or contact details."
            : "Complete the form below to list your vehicle on our marketplace. More detailed information will help attract potential buyers."
          }
        </p>
        
        <AdvancedSellForm />
      </div>
    </main>
  )
}