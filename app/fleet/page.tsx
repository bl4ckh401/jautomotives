import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Car, Truck, Bus, Briefcase } from "lucide-react"

const fleetCategories = [
  { title: "Sedans", image: "/images/sedan.jpg", icon: Car, link: "/fleet/sedans" },
  { title: "SUVs", image: "/images/suv.jpg", icon: Car, link: "/fleet/suvs" },
  { title: "Luxury Cars", image: "/images/luxury.jpg", icon: Briefcase, link: "/fleet/luxury" },
  { title: "Vans", image: "/images/van.jpg", icon: Car, link: "/fleet/vans" },
  { title: "Buses", image: "/images/bus.jpg", icon: Bus, link: "/fleet/buses" },
  { title: "Trucks", image: "/images/truck.jpg", icon: Truck, link: "/fleet/trucks" },
]

export default function FleetPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Fleet</h1>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
        Explore our diverse range of vehicles suitable for any occasion. From compact cars to luxury vehicles, we have
        the perfect ride for your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fleetCategories.map((category, index) => (
          <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              <Link href={category.link}>
                <Button className="w-full">View {category.title}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

