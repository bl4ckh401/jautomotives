"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CarListingSchema from "./CarListingSchema"
import SocialShare from "./SocialShare"
import LazyImage from "./LazyImage"

// ... (Vehicles array remains the same)

export default function VehicleGrid() {
  const [vehicles] = useState(Vehicles)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden">
          <CarListingSchema
            name={vehicle.name}
            description={` ${vehicle.brand} ${vehicle.model} available for purchase with cryptocurrency`}
            brand={vehicle.brand}
            model={vehicle.model}
            year={vehicle.year}
            price={vehicle.price}
            currency={vehicle.currency}
            image={`https://cryptodrive-.com${vehicle.image}`}
            url={`https://cryptodrive-.com/vehicles/${vehicle.id}`}
          />
          <div className="relative h-48">
            <LazyImage
              src={vehicle.image}
              alt={`${vehicle.name} -  car available for purchase with cryptocurrency`}
              width={400}
              height={300}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
            <p className="text-muted-foreground mb-2">
              {vehicle.price.toLocaleString()} {vehicle.currency}
            </p>
            <p className="text-primary font-semibold">{vehicle.cryptoPrice}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link href={`/vehicles/${vehicle.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
            <SocialShare
              url={`https://cryptodrive-.com/vehicles/${vehicle.id}`}
              title={`Check out this ${vehicle.name} on CryptoDrive !`}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

