import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RentalCarProp {
  car: {
    title: string
    image?: string
    benefits: string[]
    pricing: {
      daily?: string
    }
    href?: string
  }
}

export default function RentalFleetCard({ car }: RentalCarProp) {
  return (
    <Card className="group card-modern hover:shadow-lg hover:scale-[1.01] transition-all duration-200 overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="aspect-[16/10] relative bg-gradient-to-br from-jaba-silver/10 to-transparent">
          <Image
            src={car.image || `/images/${car.title.toLowerCase().replaceAll(" ", "-")}.jpg`}
            alt={car.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-400"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary">Rental</Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">{car.title}</h3>
            <p className="text-sm text-muted-foreground">From KES {car.pricing.daily} / day</p>
          </div>
        </div>

        <ul className="text-sm text-muted-foreground space-y-1">
          {car.benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-jaba-gold">•</span>
              <span className="truncate">{b}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          {car.href ? (
            <Link href={car.href} className="w-full block">
              <Button className="w-full" onClick={() => {}}>
                View Details
              </Button>
            </Link>
          ) : (
            <Button className="w-full" variant="outline">View Details</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

