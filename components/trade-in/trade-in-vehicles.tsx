"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeLabel } from "@/components/ui/badge-label"
import Link from "next/link"
import { VehicleListing } from "@/contexts/MarketplaceContext"

// ExtendedVehicleListing is the same as VehicleListing
// Remove the incorrect extension with optional description
type ExtendedVehicleListing = VehicleListing;

interface TradeInVehiclesProps {
  vehicles: ExtendedVehicleListing[]
}

export function TradeInVehicles({ vehicles }: TradeInVehiclesProps) {
  // Calculate trade-in price (for demo purposes - in real app this would be a proper field)
  const calculateTradeInPrice = (originalPrice: string) => {
    const price = parseInt(originalPrice);
    // Apply a 10% discount for trade-in
    return Math.round(price * 0.9);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => {
          const price = parseInt(vehicle.price);
          const tradeInPrice = calculateTradeInPrice(vehicle.price);
          
          return (
            <Card key={vehicle.id} className="bg-background overflow-hidden">
              <div className="relative aspect-[4/3]">
                <BadgeLabel variant="available">TRADE-IN ONLY</BadgeLabel>
                <Image 
                  src={vehicle.mainImage || vehicle.images[0] || "/placeholder.svg"} 
                  alt={vehicle.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-1">
                  {vehicle.year} {vehicle.title}
                </h3>
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold text-pistachio">KES {tradeInPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">KES {price.toLocaleString()}</span>
                  <span className="ml-2 text-xs bg-pistachio/20 text-pistachio px-2 py-0.5 rounded-full">
                    Save {Math.round(((price - tradeInPrice) / price) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {vehicle.description || vehicle.sellingReason || `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.condition} - Contact for more details`}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div>
                    <span className="font-semibold">Engine:</span> {vehicle.engineSize || vehicle.fuelType}
                  </div>
                  <div>
                    <span className="font-semibold">Transmission:</span> {vehicle.transmission}
                  </div>
                  <div>
                    <span className="font-semibold">Mileage:</span> {vehicle.mileage} km
                  </div>
                  <div>
                    <span className="font-semibold">Condition:</span> {vehicle.condition}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/trade-in/vehicles/${vehicle.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-bold mb-2">No trade-in vehicles available</h3>
          <p className="text-muted-foreground">Check back later for new trade-in opportunities.</p>
        </div>
      )}
    </div>
  )
}

