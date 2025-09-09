"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useFleet } from "@/contexts/FleetContext"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Calendar, DollarSign, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FleetVehicle } from "@/services/fleetService"

const categoryTitles: Record<string, string> = {
  sedan: "Sedans",
  suv: "SUVs",
  luxury: " Cars",
  van: "Vans",
  truck: "Trucks"
}

const categoryDescriptions: Record<string, string> = {
  sedan: "Our comfortable and fuel-efficient sedans are perfect for city driving and business trips.",
  suv: "Spacious SUVs with ample cargo space for family trips and outdoor adventures.",
  luxury: "Experience the finest in automotive luxury with our premium collection.",
  van: "Perfect for group transportation, moving, or spacious travel needs.",
  truck: "Powerful and reliable trucks for hauling, towing, and tough jobs."
}

export default function FleetCategoryPage({ params }: { params: { category: string } }) {
  const { getVehiclesByType, loading, error } = useFleet()
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([])
  
  const category = params.category.toLowerCase()
  const title = categoryTitles[category] || "Vehicles"
  const description = categoryDescriptions[category] || "Explore our fleet of high-quality vehicles available for rent."
  
  useEffect(() => {
    const filteredVehicles = getVehiclesByType(category)
    setVehicles(filteredVehicles.filter(v => v.status === "available"))
  }, [category, getVehiclesByType])
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/fleet" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Fleet Categories
      </Link>
      
      <h1 className="text-4xl font-bold mt-4 mb-4">{title}</h1>
      <p className="text-xl mb-12 max-w-4xl text-gray-600 dark:text-gray-300">
        {description}
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
      
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-0">
                <Skeleton className="w-full h-56" />
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* No Vehicles Available */}
      {!loading && !error && vehicles.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Vehicles Available</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            Our fleet of {title.toLowerCase()} is currently under maintenance or all vehicles are rented.
            Please check back soon or explore other vehicle categories.
          </p>
          <Link href="/fleet">
            <Button>View Other Categories</Button>
          </Link>
        </div>
      )}
      
      {/* Vehicle List */}
      {!loading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              <CardHeader className="p-0">
                {vehicle.imageUrl ? (
                  <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover transition-all duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-700 w-full h-56 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Image unavailable</p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{vehicle.make} {vehicle.model}</h3>
                  <Badge variant="outline">{vehicle.year}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">
                  {vehicle.type}
                </p>
                <div className="flex items-center mb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">KES {vehicle.dailyRate} / day</span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Link href={`/fleet/book/${vehicle.id}`} className="w-full">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 