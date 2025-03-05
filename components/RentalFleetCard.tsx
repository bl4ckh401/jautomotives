import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface RentalCarProp {
  car: {
    title: string
    image?: string
    benefits: string[]
    pricing: {
      hourly?: string
      daily?: string
      weekly?: string
    }
  }
}

export default function RentalFleetCard({ car }: RentalCarProp) {
  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>{car.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          src={car.image || `/images/${car.title.toLowerCase().replaceAll(" ", "-")}.jpg`}
          alt={car.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-lg font-semibold mb-2">From KES {car.pricing.daily} per day</p>
          <ul className="text-sm text-gray-600 mb-4">
            {car.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-300">• {benefit}</li>
            ))}
          </ul>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

