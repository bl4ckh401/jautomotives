import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface SimilarVehiclesProps {
  currentVehicleId: string
}

const similarVehicles = [
  {
    id: "toyota-harrier-2017",
    year: 2017,
    title: "Toyota Harrier",
    image: "/placeholder.svg",
    specs: {
      transmission: "Automatic",
      engine: "2000 CC",
      condition: "Kenyan Used",
    },
    description:
      "The Toyota Harrier is a stylish mid-size crossover SUV that expertly combines sophistication with practicality, making it a sought-after choice for those in need of a versatile vehicle. Its sleek...",
    price: 2949999,
    seller_type: "PRIVATE SELLER",
  },
  {
    id: "toyota-chr-2017",
    year: 2017,
    title: "Toyota CHR",
    image: "/placeholder.svg",
    specs: {
      transmission: "Automatic",
      engine: "1200 CC",
      condition: "Foreign Used",
    },
    description:
      "The Toyota C-HR ST is a sporty trim of the compact crossover SUV, known for its distinctive design and stylish features. It includes sportier exterior elements, such as unique trim accents and a mor...",
    price: 2949999,
    seller_type: "DIRECT IMPORT",
  },
  {
    id: "toyota-harrier-2014",
    year: 2014,
    title: "Toyota Harrier",
    image: "/placeholder.svg",
    specs: {
      transmission: "Automatic",
      engine: "2000 CC",
      condition: "Kenyan Used",
    },
    description:
      "Toyota Harrier Premium has some premium specs added to it including a Premiums sound system, Xenon Projector Lamps, cruise control, and memory height adjustment. Other specs include a...",
    price: 2949999,
    seller_type: "PRIVATE SELLER",
  },
]

export function SimilarVehicles({ currentVehicleId }: SimilarVehiclesProps) {
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
                  AVAILABLE
                </Badge>
                <Image
                  src={vehicle.image || "/placeholder.svg"}
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
                  <span>{vehicle.specs.transmission}</span>
                  <span>{vehicle.specs.engine}</span>
                  <span>{vehicle.specs.condition}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{vehicle.description}</p>
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between w-full">
                  <div className="text-lg font-bold">KES {vehicle.price.toLocaleString()}</div>
                  <Badge variant="outline">{vehicle.seller_type}</Badge>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

