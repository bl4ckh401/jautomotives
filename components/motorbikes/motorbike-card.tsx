import Image from "next/image"
import Link from "next/link"
import { BadgeLabel } from "@/components/ui/badge-label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DealerBadge } from "@/components/ui/dealer-badge"

interface MotorbikeCardProps {
  id: string
  title: string
  year: number
  image: string
  price: number
  specs: {
    engine: string
    power: string
    torque: string
    weight: string
    condition: string
  }
  description: string
  dealer: {
    name: string
    image?: string
    verified?: boolean
  }
}

export function MotorbikeCard({ id, title, year, image, price, specs, description, dealer }: MotorbikeCardProps) {
  return (
    <Card className="group bg-[#1a1f24] overflow-hidden">
      <div className="relative aspect-[4/3]">
        <BadgeLabel>AVAILABLE</BadgeLabel>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <DealerBadge {...dealer} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {year} {title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {specs.engine}
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {specs.power}
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {specs.condition}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-bold">KES {price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Link href={`/motorbikes/${id}`}>
            <Button size="sm">Contact Seller</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

