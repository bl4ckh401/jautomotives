import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const rentalServices = [
  { title: "Wedding Car Rental", href: "/rental/wedding" },
  { title: "Office Pick-Up and Drop-Off", href: "/rental/office" },
  { title: "Chauffeur-Driven Rentals", href: "/rental/chauffeur" },
  { title: "VIP Rental", href: "/rental/vip" },
  { title: "Corporate Car Rental", href: "/rental/corporate" },
  { title: "Long-Term Car Hire", href: "/rental/long-term" },
  { title: "Airport Transfer", href: "/rental/airport" },
  { title: "Self-Drive Car Hire", href: "/rental/self-drive" },
  { title: "Event Car Hire", href: "/rental/event" },
]

export default function RentalServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Rental Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalServices.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={service.href}>
                <Button className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

