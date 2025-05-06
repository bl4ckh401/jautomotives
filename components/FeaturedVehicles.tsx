"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarIcon } from "lucide-react"
import { BadgeLabel } from "@/components/ui/badge-label"
import { VehicleListing, useMarketplace } from "@/contexts/MarketplaceContext"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedVehicles() {
  const { getListings } = useMarketplace()
  const [featuredVehicles, setFeaturedVehicles] = useState<VehicleListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true)
        // Get featured vehicles (newest listings marked as featured)
        const result = await getListings({
          featured: true,
          status: "active"
        }, 4)
        setFeaturedVehicles(result.listings)
      } catch (error) {
        console.error("Error fetching featured vehicles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedVehicles()
  }, [getListings])

  // Helper function to format price
  const formatPrice = (price: string) => {
    const numPrice = parseInt(price)
    return numPrice.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    })
  }

  // Condition display
  const getConditionStars = (condition: string) => {
    switch (condition) {
      case "New": return 5;
      case "Certified Pre-Owned": return 4;
      case "Used": return 3;
      default: return 3;
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-[#1a1f24]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Vehicles</h2>
        <p className="text-center text-gray-400 mb-12">
          Explore our handpicked selection of premium vehicles
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="bg-[#1a1f24] overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-1 py-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 rounded-full" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-[#1a1f24] overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <BadgeLabel variant="featured">FEATURED</BadgeLabel>
                  <Image 
                    src={vehicle.images[0] || "/placeholder.svg"} 
                    alt={`${vehicle.make} ${vehicle.model}`} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < getConditionStars(vehicle.condition) 
                            ? "text-yellow-500 fill-yellow-500" 
                            : "text-gray-400"
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-white mb-2">
                    {formatPrice(vehicle.price)}
                  </p>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} - 
                    ${vehicle.mileage} miles, ${vehicle.transmission}, ${vehicle.fuelType}`}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/marketplace/${vehicle.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No featured vehicles available at the moment.</p>
            <Link href="/marketplace">
              <Button variant="link" className="mt-4">View All Vehicles</Button>
            </Link>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link href="/marketplace">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Browse All Vehicles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

