"use client"

import { useEffect, useState } from "react"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard"
import Link from "next/link"

export default function SecondHandPage() {
  const { getListings } = useMarketplace()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSecondHand = async () => {
      setLoading(true)
      try {
        const res = await getListings({} as any, 50)
        const secondHand = res.listings.filter((l: any) => l.secondHand === true)
        setVehicles(secondHand)
      } catch (error) {
        console.error("Error loading second hand listings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSecondHand()
  }, [getListings])

  return (
    <main className="container mx-auto px-4 pt-28 md:pt-8 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Second Hand Vehicles</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Vehicles marked as second hand by admin/sellers.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link href="/marketplace" className="text-sm text-foreground/80 hover:text-jaba-gold text-center w-full sm:w-auto py-2">
            Back to Marketplace
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse border border-border rounded-xl p-4">
              <div className="aspect-video bg-muted rounded-md mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No second hand listings yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <EnhancedVehicleCard key={v.id} vehicle={{
              id: v.id,
              make: v.make,
              model: v.model,
              year: parseInt(v.year) || 0,
              price: parseInt(v.price) || 0,
              mileage: parseInt(v.mileage) || 0,
              fuelType: v.fuelType || "",
              transmission: v.transmission || "",
              seats: parseInt(v.doors) || 4,
              rating: 4.5,
              images: v.images || ["/placeholder-car.jpg"],
              location: v.location || "",
              isNew: v.condition === "New",
              isFeatured: v.featured || false,
              tags: [v.vehicleType, v.condition].filter(Boolean),
              description: v.description || "",
            }} onViewDetails={() => window.location.href = `/vehicles/${v.id}`} />
          ))}
        </div>
      )}
    </main>
  )
}