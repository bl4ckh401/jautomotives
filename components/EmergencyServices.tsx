import { Phone } from "lucide-react"
import Image from "next/image"

export default function EmergencyServices() {
  const services = [
    {
      title: "24 Hour Towing",
      description: "Emergency towing service available round the clock",
      items: ["Car towing", "Motorcycle towing", "Long distance towing"],
    },
    {
      title: "Roadside Assistance",
      description: "Quick help when you need it most",
      items: ["Unlocking doors", "Car battery replacement", "Emergency road services"],
    },
    {
      title: "Out of Gas Services",
      description: "Don't let an empty tank stop you",
      items: ["Fuel delivery", "Jump starting", "Fix flat tire/tire fix"],
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-18%20at%2015.16.44_55e87a61.jpg-pZSXR74d3Xojc11ZSBZDGNkuSC1vic.jpeg"
        alt="JABA Automobiles Emergency Services"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-red-900/90 z-1"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">24/7 Emergency Services</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional roadside assistance and towing services when you need them most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-red-600 rounded-full px-8 py-4 text-white text-xl font-bold">
            <Phone className="w-6 h-6 mr-3 animate-pulse" />
            Call Now: 0726 692704
          </div>
        </div>
      </div>
    </section>
  )
}

