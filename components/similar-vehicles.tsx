"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useMarketplace, VehicleListing } from "@/contexts/MarketplaceContext"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SimilarVehiclesProps {
  currentVehicleId: string
  make?: string
  vehicleType?: string
  alwaysShow?: boolean // new: force render section even if none found
}

export function SimilarVehicles({ currentVehicleId, make, vehicleType, alwaysShow = false }: SimilarVehiclesProps) {
  const { getListings } = useMarketplace()
  const [similarVehicles, setSimilarVehicles] = useState<VehicleListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const fetchSimilarVehicles = async () => {
      try {
        setLoading(true)
        setError(null)
        // Base filters
        const baseFilters: any = { status: "active" }
        if (make) baseFilters.make = [make]
        if (vehicleType) baseFilters.vehicleType = [vehicleType]

        if (process.env.NEXT_PUBLIC_DEBUG_SIMILAR === "true") {
          // eslint-disable-next-line no-console
          console.log("[SimilarVehicles] Fetch 1 filters", baseFilters)
        }

        const result = await getListings(baseFilters, 6)
        let candidates = result.listings.filter(v => v.id !== currentVehicleId)

        // If not enough, relax make constraint
        if (candidates.length < 3 && make) {
          const relaxedFilters: any = { status: "active" }
          if (vehicleType) relaxedFilters.vehicleType = [vehicleType]
          if (process.env.NEXT_PUBLIC_DEBUG_SIMILAR === "true") {
            // eslint-disable-next-line no-console
            console.log("[SimilarVehicles] Fetch 2 relaxed filters", relaxedFilters)
          }
          const more = await getListings(relaxedFilters, 9)
          const additional = more.listings.filter(v => v.id !== currentVehicleId && !candidates.find(c => c.id === v.id))
          candidates = [...candidates, ...additional]
        }

        // Final global fallback if still less than 3
        if (candidates.length < 3) {
          const globalFallbackFilters: any = { status: "active" }
          if (process.env.NEXT_PUBLIC_DEBUG_SIMILAR === "true") {
            // eslint-disable-next-line no-console
            console.log("[SimilarVehicles] Fetch 3 global fallback", globalFallbackFilters)
          }
          const global = await getListings(globalFallbackFilters, 12)
          const globalExtra = global.listings.filter(v => v.id !== currentVehicleId && !candidates.find(c => c.id === v.id))
          candidates = [...candidates, ...globalExtra]
        }

        // Slice to 3 only
        if (!cancelled) setSimilarVehicles(candidates.slice(0, 3))
      } catch (e: any) {
        if (process.env.NEXT_PUBLIC_DEBUG_SIMILAR === "true") {
          // eslint-disable-next-line no-console
          console.error("[SimilarVehicles] Error", e)
        }
        if (!cancelled) {
          setError(e?.message || "Failed to load similar vehicles")
          setSimilarVehicles([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (currentVehicleId) {
      fetchSimilarVehicles()
    }

    return () => { cancelled = true }
  }, [currentVehicleId, getListings, make, vehicleType])

  const Header = (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Similar vehicles</h2>
      <p className="text-gray-400">People who viewed this vehicle also consider</p>
    </div>
  )

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {Header}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error or empty state
  if (error || similarVehicles.length === 0) {
    if (!alwaysShow) return null
    return (
      <div className="space-y-6">
        {Header}
        <div className="text-center text-sm text-muted-foreground border border-dashed border-border rounded-lg p-6">
          {error ? `Unable to load similar vehicles: ${error}` : "No similar vehicles available yet. Check back soon."}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Header}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarVehicles.map((vehicle) => (
          <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
            <Card className="h-full hover:bg-gray-800/50 transition-colors">
              <div className="relative aspect-[4/3]">
                <Badge className="absolute top-4 right-4 z-10" variant="secondary">
                  {vehicle.featured ? "FEATURED" : "AVAILABLE"}
                </Badge>
                <Image
                  src={vehicle.mainImage || vehicle.images[0] || "/placeholder.svg"}
                  alt={vehicle.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">
                    {vehicle.year} {vehicle.title}
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-400 mb-2">
                  <span>{vehicle.transmission}</span>
                  <span>{vehicle.engineSize || vehicle.fuelType}</span>
                  <span>{vehicle.condition}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} in ${vehicle.condition} condition.`}
                </p>
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between w-full">
                  <div className="text-lg font-bold">KES {parseInt(vehicle.price).toLocaleString()}</div>
                  <Badge variant="outline">{vehicle.negotiable ? "NEGOTIABLE" : "FIXED PRICE"}</Badge>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

