"use client"

import { useEffect, useState } from "react"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard"
import Link from "next/link"

// export const metadata = {
//   title: "Second Hand Vehicles - JABA Motors",
//   description: "Browse second hand vehicles listed by users.",
// };

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
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Second Hand Vehicles</h1>
          <p className="text-muted-foreground">Vehicles marked as second hand by admin/sellers.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/second-hand/sell" className="btn btn-primary">
            Sell Your Vehicle
          </Link>
          <Link href="/marketplace" className="text-sm text-foreground/80 hover:text-jaba-gold">
            Back to Marketplace
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No second hand listings yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
