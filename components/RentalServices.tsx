import { Car, Users, Plane, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RentalServices() {
  const services = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Wedding Car Rental",
      description: "Make your special day even more memorable with our  wedding cars",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Corporate Car Rental",
      description: "Professional transport solutions for your business needs",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Airport Transfer",
      description: "Reliable and comfortable airport pickup and drop-off services",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Self Drive Car Hire",
      description: "Freedom to explore with our self-drive rental options",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-18%20at%2015.16.44_67615228.jpg-5Y0p9PfAYoeKezUwtQdUQKRENdbAwA.jpeg"
        alt="JABA Automobiles Rental Services"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-red-900/90 z-1"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Rent A Car At An Affordable Price</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From wedding cars to corporate rentals, we offer a wide range of vehicles to suit your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all">
              <div className="text-red-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <Button variant="outline" className="w-full text-primary border-red-500 hover:bg-red-500">
                Learn More
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-primary">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  )
}

