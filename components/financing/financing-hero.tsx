import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FinancingHero() {
  return (
    <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=2070&auto=format&fit=crop"
        alt="Financing your dream car"
        layout="fill"
        objectFit="cover"
        className="brightness-100"
        priority
      />
      <div className="absolute inset-0 opacity-50" />

      <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 max-w-7xl mx-auto z-20">
        <div className="bg-[#1a1f24]/80 backdrop-blur-sm p-8 rounded-xl max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Flexible Financing Solutions</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover the perfect financing option to drive home your dream vehicle today. We offer competitive rates,
            flexible terms, and a seamless application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-full"
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1a1f24] font-bold text-lg px-8 py-6 rounded-full"
            >
              Calculate Payments
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

