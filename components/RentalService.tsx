import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface RentalServiceProps {
  title: string
  description: string
  image: string
  benefits: string[]
  pricing: {
    hourly?: string
    daily?: string
    weekly?: string
  }
}

export default function RentalService({ title, description, image, benefits, pricing }: RentalServiceProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={image || "/placeholder.svg"} alt={title} width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-6">{description}</p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              {pricing.hourly && <p>Hourly: {pricing.hourly}</p>}
              {pricing.daily && <p>Daily: {pricing.daily}</p>}
              {pricing.weekly && <p>Weekly: {pricing.weekly}</p>}
            </CardContent>
          </Card>
          <Link href="/booking">
            <Button className="mt-6 w-full">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

