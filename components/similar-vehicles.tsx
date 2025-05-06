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
}

export function SimilarVehicles({ currentVehicleId, make, vehicleType }: SimilarVehiclesProps) {
  const { getListings } = useMarketplace()
  const [similarVehicles, setSimilarVehicles] = useState<VehicleListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarVehicles = async () => {
      try {
        setLoading(true)
        
        // Create filters based on the current vehicle to find similar ones
        const filters: any = {
          status: "active",
        }
        
        // If we have make, add it to filters
        if (make) {
          filters.make = [make]
        }
        
        // If we have vehicleType, add it to filters
        if (vehicleType) {
          filters.vehicleType = [vehicleType]
        }
        
        const result = await getListings(filters, 3)
        
        // Filter out the current vehicle
        const filteredVehicles = result.listings.filter(
          vehicle => vehicle.id !== currentVehicleId
        )
        
        // If we don't have enough similar vehicles, get more without the make filter
        if (filteredVehicles.length < 3 && make) {
          const moreResults = await getListings({
            status: "active",
            vehicleType: vehicleType ? [vehicleType] : undefined
          }, 6)
          
          const additionalVehicles = moreResults.listings.filter(
            vehicle => vehicle.id !== currentVehicleId && !filteredVehicles.find(v => v.id === vehicle.id)
          )
          
          // Combine results but limit to 3
          setSimilarVehicles([...filteredVehicles, ...additionalVehicles].slice(0, 3))
        } else {
          setSimilarVehicles(filteredVehicles.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching similar vehicles:", error)
        setSimilarVehicles([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchSimilarVehicles()
  }, [currentVehicleId, getListings, make, vehicleType])

  // If we're still loading, show skeletons
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Similar vehicles</h2>
          <p className="text-gray-400">People who viewed this vehicle also consider</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#1a1f24] rounded-lg overflow-hidden">
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

  // Don't show the section if there are no similar vehicles
  if (similarVehicles.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Similar vehicles</h2>
        <p className="text-gray-400">People who viewed this vehicle also consider</p>
      </div>

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

