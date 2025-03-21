import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeLabel } from "@/components/ui/badge-label"
import Link from "next/link"

// Sample data for trade-in vehicles
const tradeInVehicles = [
  {
    id: "1",
    title: "Mercedes-Benz C-Class",
    year: 2021,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
    price: 4500000,
    tradeInPrice: 3800000,
    description:
      "Luxury sedan with premium features and excellent performance. Special pricing available exclusively for trade-in customers.",
    specs: {
      engine: "2.0L Turbo",
      transmission: "Automatic",
      mileage: "15,000 km",
      condition: "Excellent",
    },
  },
  {
    id: "2",
    title: "BMW X5",
    year: 2020,
    image: "https://images.unsplash.com/photo-1698417749491-56b4e5d0bad7?q=80&w=2070&auto=format&fit=crop",
    price: 6200000,
    tradeInPrice: 5500000,
    description: "Luxury SUV with spacious interior and advanced technology. Available with special trade-in discount.",
    specs: {
      engine: "3.0L Twin-Turbo",
      transmission: "Automatic",
      mileage: "25,000 km",
      condition: "Excellent",
    },
  },
  {
    id: "3",
    title: "Audi A6",
    year: 2022,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop",
    price: 5800000,
    tradeInPrice: 5100000,
    description:
      "Executive sedan with cutting-edge technology and refined driving experience. Special trade-in offer available.",
    specs: {
      engine: "2.0L TFSI",
      transmission: "Automatic",
      mileage: "10,000 km",
      condition: "Excellent",
    },
  },
  {
    id: "4",
    title: "Range Rover Sport",
    year: 2021,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2070&auto=format&fit=crop",
    price: 8500000,
    tradeInPrice: 7800000,
    description: "Premium SUV combining luxury and off-road capability. Exclusive pricing for trade-in customers.",
    specs: {
      engine: "3.0L V6",
      transmission: "Automatic",
      mileage: "20,000 km",
      condition: "Excellent",
    },
  },
]

export function TradeInVehicles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tradeInVehicles.map((vehicle) => (
        <Card key={vehicle.id} className="bg-[#1a1f24] overflow-hidden">
          <div className="relative aspect-[4/3]">
            <BadgeLabel variant="available">TRADE-IN ONLY</BadgeLabel>
            <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-1">
              {vehicle.year} {vehicle.title}
            </h3>
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold text-green-500">KES {vehicle.tradeInPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through ml-2">KES {vehicle.price.toLocaleString()}</span>
              <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                Save {Math.round(((vehicle.price - vehicle.tradeInPrice) / vehicle.price) * 100)}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{vehicle.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>
                <span className="font-semibold">Engine:</span> {vehicle.specs.engine}
              </div>
              <div>
                <span className="font-semibold">Transmission:</span> {vehicle.specs.transmission}
              </div>
              <div>
                <span className="font-semibold">Mileage:</span> {vehicle.specs.mileage}
              </div>
              <div>
                <span className="font-semibold">Condition:</span> {vehicle.specs.condition}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/trade-in/vehicles/${vehicle.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

