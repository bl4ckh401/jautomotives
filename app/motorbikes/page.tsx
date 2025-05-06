"use client"

import { useEffect, useState } from "react"
import { SearchFilters } from "@/components/motorbikes/search-filters"
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleListing } from "@/contexts/MarketplaceContext" 
import { Skeleton } from "@/components/ui/skeleton"
// import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Motorbikes Marketplace | JABA Automobiles",
//   description: "Explore our collection of premium motorbikes available for purchase with cryptocurrency",
// }

export default function MotorbikesPage() {
  const { getListings } = useMarketplace()
  const [motorbikes, setMotorbikes] = useState<VehicleListing[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    vehicleType: ["Motorbike"],
    status: "active"
  })

  // Load motorbikes from database
  useEffect(() => {
    const fetchMotorbikes = async () => {
      try {
        setLoading(true)
        const result = await getListings(filters, 20)
        setMotorbikes(result.listings)
      } catch (error) {
        console.error("Error fetching motorbikes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMotorbikes()
  }, [getListings, filters])

  const handleSearch = (searchFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...searchFilters
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Motorbikes Marketplace</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `Showing ${motorbikes.length} motorbikes`}
            </span>
          </div>
        </div>
        
        <SearchFilters onSearch={handleSearch} />
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : motorbikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motorbikes.map((motorbike) => (
              <MotorbikeCard 
                key={motorbike.id} 
                id={motorbike.id!}
                title={`${motorbike.year} ${motorbike.make} ${motorbike.model}`} 
                year={parseInt(motorbike.year)}
                image={motorbike.images[0] || "/placeholder.svg"}
                price={parseInt(motorbike.price)}
                specs={{
                  engine: motorbike.engineSize || "",
                  power: "",
                  torque: "",
                  weight: "",
                  condition: motorbike.condition,
                }}
                description={motorbike.description}
                dealer={{
                  name: motorbike.contactName || "JABA Automotives",
                  verified: true,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">No motorbikes available</h3>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}

