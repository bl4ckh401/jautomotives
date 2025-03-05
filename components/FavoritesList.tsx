"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const initialFavorites = [
  { id: 1, name: "Tesla Model S", price: "75,000 USD", image: "/car1.jpg", cryptoPrice: "2.5 BTC" },
  { id: 2, name: "Porsche 911", price: "120,000 USD", image: "/car2.jpg", cryptoPrice: "4 BTC" },
  { id: 3, name: "Audi e-tron", price: "65,000 USD", image: "/car3.jpg", cryptoPrice: "2.2 BTC" },
]

export default function FavoritesList() {
  const [favorites, setFavorites] = useState(initialFavorites)

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favorites.map((vehicle) => (
        <Card key={vehicle.id}>
          <CardContent className="p-4">
            <Image src={vehicle.image} alt={vehicle.name} width={400} height={300} className="rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
            <p className="text-gray-600 mb-2">{vehicle.price}</p>
            <p className="text-blue-600 font-semibold">{vehicle.cryptoPrice}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/vehicles/${vehicle.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <Button variant="ghost" onClick={() => removeFavorite(vehicle.id)}>
              <Heart className="w-5 h-5 fill-current text-red-500" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

