import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDown, Star, Award, Users, Car } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://dragon2000-multisite.s3.eu-west-2.amazonaws.com/wp-content/uploads/sites/309/2022/06/15163512/Avanti-car-hero_result.jpg"
          alt="Premium Vehicle Fleet"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-jaba-gold fill-current" />
            ))}
          </div>
          <span className="text-foreground/80 font-medium">Trusted by 10,000+ customers</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
          Your Premier Automotive 
          <span className="bg-gradient-to-r from-jaba-gold to-jaba-red bg-clip-text text-transparent block mt-2">
            Solution in Kenya
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          From luxury vehicle sales to 24/7 roadside assistance, we're your trusted partner for all automotive needs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-12">
          <Button 
            size="lg" 
            className="bg-jaba-gold text-background hover:bg-jaba-gold/90 min-w-[200px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Car className="w-5 h-5 mr-2" />
            Explore Vehicles
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-jaba-silver text-foreground hover:bg-jaba-silver hover:text-background min-w-[200px] font-semibold transition-all duration-300"
          >
            Rent a Vehicle
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-jaba-red text-jaba-red hover:bg-jaba-red hover:text-white min-w-[200px] font-semibold transition-all duration-300"
          >
            24/7 Assistance
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-foreground/70">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-jaba-gold" />
            <span className="font-medium">Award Winning Service</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-jaba-gold" />
            <span className="font-medium">10,000+ Happy Customers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-jaba-gold" />
            <span className="font-medium">500+ Premium Vehicles</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-jaba-gold" />
      </div>
    </section>
  )
}

