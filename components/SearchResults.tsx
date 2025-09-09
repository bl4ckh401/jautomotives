"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Vehicle {
  id: number
  name: string
  price: string
  image: string
  cryptoPrice: string
}

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Tesla Model S Plaid",
    price: "130,000 USD",
    image: "/tesla-model-s-plaid.jpg",
    cryptoPrice: "4.3 BTC",
  },
  { id: 2, name: "Porsche 911 GT3 RS", price: "220,000 USD", image: "/porsche-911-gt3-rs.jpg", cryptoPrice: "7.3 BTC" },
  {
    id: 3,
    name: "Lamborghini Huracán EVO",
    price: "260,000 USD",
    image: "/lamborghini-huracan-evo.jpg",
    cryptoPrice: "8.7 BTC",
  },
]

export default function SearchResults({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [vehicles] = useState(initialVehicles)

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Add filtering logic based on searchParams here.  This is a placeholder.
    return true
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVehicles.map((vehicle) => (
        <Card key={vehicle.id}>
          <CardContent className="p-4">
            <img
              src={vehicle.image || "/placeholder.svg"}
              alt={`${vehicle.name} -  car available for purchase with cryptocurrency`}
              width={400}
              height={300}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
            <p className="text-gray-600 mb-2">{vehicle.price}</p>
            <p className="text-primary font-semibold">{vehicle.cryptoPrice}</p>
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

