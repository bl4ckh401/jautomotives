import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Phone,
  Truck,
  Key,
  Battery,
  PenToolIcon as Tools,
  BikeIcon as Motorcycle,
  Fuel,
  RouteIcon as Road,
  MapPin,
} from "lucide-react"

const assistanceServices = [
  { title: "24-Hour Towing", href: "/assistance/towing", icon: Truck },
  { title: "Unlocking Doors", href: "/assistance/unlocking", icon: Key },
  { title: "Car Battery Replacement", href: "/assistance/battery", icon: Battery },
  { title: "Emergency Road Services", href: "/assistance/emergency", icon: Tools },
  { title: "Truck Towing", href: "/assistance/truck-towing", icon: Truck },
  { title: "Motorcycle Towing", href: "/assistance/motorcycle-towing", icon: Motorcycle },
  { title: "Out-of-Gas Services", href: "/assistance/out-of-gas", icon: Fuel },
  { title: "Roadside Assistance", href: "/assistance/roadside", icon: Road },
  { title: "Long Distance Towing", href: "/assistance/long-distance", icon: MapPin },
]

export default function AssistancePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">24/7 Assistance Services</h1>
      <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
        We're here to help you, anytime, anywhere. Our professional team is ready to assist you with any automotive
        emergency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistanceServices.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                {React.createElement(service.icon, { className: "mr-2 h-6 w-6" })}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={service.href}>
                <Button className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
        <Button size="lg" className="bg-red-600 hover:bg-red-700">
          <Phone className="mr-2 h-5 w-5" />
          Call Now: 0795 684601
        </Button>
      </div>
    </div>
  )
}

