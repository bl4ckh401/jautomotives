import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://dragon2000-multisite.s3.eu-west-2.amazonaws.com/wp-content/uploads/sites/309/2022/06/15163512/Avanti-car-hero_result.jpg"
          alt="Mercedes G-Wagon"
          layout="fill"
          // objectFit="cover"
          priority
          className="opacity-50"
        />
        <div className="absolute inset-0 " />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your One-Stop Automotive Solution in Kenya</h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button variant="default" size="lg" className="bg-black hover:bg-black/90 text-white min-w-[200px]">
            Explore vehicles
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black min-w-[200px]"
          >
            Rent a Vehicle
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black min-w-[200px]"
          >
            24/7 Assistance
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  )
}

