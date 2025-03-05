import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Vehicle {
  name: string
  image: string
}

interface FleetCategoryPageProps {
  title: string
  description: string
  vehicles: Vehicle[]
}

export default function FleetCategoryPage({ title, description, vehicles }: FleetCategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <Image
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-all duration-300 hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{vehicle.name}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

