"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { VehicleListing } from "@/contexts/MarketplaceContext"
import LazyImage from "./LazyImage"

interface VehicleGridProps {
  vehicles: VehicleListing[]
  loading: boolean
}

export function VehicleGrid({ vehicles, loading }: VehicleGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden">
          <div className="relative h-48">
            <LazyImage
              src={vehicle.images?.[0] || "/placeholder.jpg"}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              width={400}
              height={300}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-2">{vehicle.title}</h3>
            <p className="text-muted-foreground mb-2">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
            <p className="text-primary font-semibold">
              {typeof vehicle.price === 'string' ? vehicle.price : `KES ${vehicle.price?.toLocaleString()}`}
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/vehicles/${vehicle.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default VehicleGrid