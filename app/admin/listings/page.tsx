"use client"

import { Button } from "@/components/ui/button"
import { getCarListings } from "@/services/carListingService"
import { AdminListingsTable } from "@/components/admin/AdminListingsTable"
import { Plus, FileDown, FileUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { CarListing } from "@/services/carListingService"
import type { Listing } from "@/components/admin/AdminListingsTable"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { useToast } from "@/hooks/use-toast"

export default function AdminListingsPage() {
  const { getListings, exportListings } = useMarketplace()
  const { toast } = useToast()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      await exportListings(format)
    } catch (error) {
      console.error("Error exporting listings:", error)
    }
  }

  const handleRefresh = () => {
    fetchListings()
  }

  const fetchListings = async () => {
    try {
      setLoading(true)
      
      // Use marketplace context to get all listings
      const result = await getListings(undefined, 100) // Get more listings for admin view
      
      // Map VehicleListing to Listing type for the table
      const formattedListings: Listing[] = result.listings.map(vehicle => ({
        id: vehicle.id || "",
        title: vehicle.title || `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        price: typeof vehicle.price === 'string' ? parseFloat(vehicle.price) : vehicle.price,
        year: typeof vehicle.year === 'string' ? parseInt(vehicle.year) : vehicle.year,
        make: vehicle.make || "",
        model: vehicle.model || "",
        status: vehicle.status === "inactive" ? "archived" : vehicle.status,
        seller: vehicle.contactName || vehicle.userEmail || "Unknown",
        createdAt: vehicle.createdAt ? 
          (typeof vehicle.createdAt === 'string' ? vehicle.createdAt : new Date(vehicle.createdAt.seconds * 1000).toISOString()) 
          : new Date().toISOString()
      }))

      setListings(formattedListings)
    } catch (error) {
      console.error("Error fetching listings:", error)
      toast({
        title: "Error fetching listings",
        description: "Failed to load vehicle listings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Car Listings</h1>
          <p className="text-muted-foreground">Manage all vehicle listings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleExport('csv')}
          >
            <FileDown className="h-4 w-4" /> Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleExport('json')}
          >
            <FileDown className="h-4 w-4" /> Export JSON
          </Button>
          <Link href="/sell-vehicle">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Listing
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading listings...</div>
        ) : (
          <AdminListingsTable listings={listings} onRefresh={handleRefresh} />
        )}
      </div>
    </div>
  )
}
