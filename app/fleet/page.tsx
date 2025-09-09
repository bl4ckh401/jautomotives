"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Car, Truck, Bus, Briefcase, Settings } from "lucide-react"
import { useFleet } from "@/contexts/FleetContext"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import FleetCategoryCarousel from "@/components/FleetCategoryCarousel"

// Ensure these categories match the types in FleetVehicle
const fleetCategories = [
  { title: "Sedans", icon: Car, link: "/fleet/sedan", type: "sedan" },
  { title: "SUVs", icon: Car, link: "/fleet/suv", type: "suv" },
  { title: " Cars", icon: Briefcase, link: "/fleet/luxury", type: "luxury" },
  { title: "Vans", icon: Car, link: "/fleet/van", type: "van" },
  { title: "Trucks", icon: Truck, link: "/fleet/truck", type: "truck" },
]

export default function FleetPage() {
  const { vehicles, loading, error } = useFleet()
  const [categoryImages, setCategoryImages] = useState<Record<string, string[]>>({})
  
  // Group vehicle images by category
  useEffect(() => {
    if (!vehicles.length) return
    
    const images: Record<string, string[]> = {}
    
    // Initialize with empty arrays for each category
    fleetCategories.forEach(category => {
      images[category.type] = []
    })
    
    // Group images by vehicle type
    vehicles.forEach(vehicle => {
      if (vehicle.imageUrl && vehicle.status === "available") {
        const type = vehicle.type.toLowerCase()
        if (images[type]) {
          images[type].push(vehicle.imageUrl)
        }
      }
    })
    
    setCategoryImages(images)
  }, [vehicles])
  
  // Count vehicles in each category
  const getCountByType = (type: string) => {
    return vehicles.filter(vehicle => 
      vehicle.type.toLowerCase() === type.toLowerCase() && 
      vehicle.status === "available"
    ).length
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Fleet</h1>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
        Explore our diverse range of vehicles suitable for any occasion. From compact cars to luxury vehicles, we have
        the perfect ride for your needs.
      </p>
      
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fleetCategories.map((category, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0 relative">
              {loading ? (
                <Skeleton className="w-full h-48" />
              ) : (
                <FleetCategoryCarousel
                  images={categoryImages[category.type] || []}
                  title={category.title}
                  interval={10000}
                />
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : error ? (
                <Button variant="outline" className="w-full" disabled>
                  Temporarily Unavailable
                </Button>
              ) : getCountByType(category.type) > 0 ? (
                <Link href={category.link}>
                  <Button className="w-full">
                    View {category.title} ({getCountByType(category.type)} available)
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  No vehicles available
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

