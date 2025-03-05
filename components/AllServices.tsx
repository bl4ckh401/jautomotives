import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Car, Truck, PenToolIcon as Tool, Calendar } from "lucide-react"

const services = [
  {
    title: "Car Sales",
    description: "Buy or sell your dream car with ease.",
    icon: <Car className="w-12 h-12 mb-4 text-blue-600" />,
    link: "/marketplace",
  },
  {
    title: "Car Rentals",
    description: "Wide range of rental options for every occasion.",
    icon: <Calendar className="w-12 h-12 mb-4 text-green-600" />,
    link: "/rental",
  },
  {
    title: "Towing Services",
    description: "24/7 towing and roadside assistance.",
    icon: <Truck className="w-12 h-12 mb-4 text-red-600" />,
    link: "/services/towing",
  },
  {
    title: "Maintenance",
    description: "Expert car maintenance and repair services.",
    icon: <Tool className="w-12 h-12 mb-4 text-yellow-600" />,
    link: "/services/maintenance",
  },
]

export default function AllServices() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-center">{service.icon}</div>
                <CardTitle className="text-xl font-bold text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

