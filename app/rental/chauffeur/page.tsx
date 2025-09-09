import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function ChauffeurDrivenRentalsPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Chauffeur-Driven Rentals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://murraychauffeurservices.com/wp-content/uploads/Chauffuer-Driven-Tours-Banner.jpg"
            alt="Chauffeur-Driven Rentals"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Experience the ultimate in comfort and convenience with our Chauffeur-Driven Rental service. Sit back,
            relax, and let our professional drivers take care of your journey.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Professional, experienced chauffeurs</li>
            <li> vehicles for all occasions</li>
            <li>Door-to-door service</li>
            <li>Flexible booking options</li>
            <li>24/7 customer support</li>
          </ul>
          <Button size="lg">Book Now</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Our Chauffeur-Driven Fleet</h2>
  <RentalGrid category={"chauffeur" as RentalCategory} />
    </div>
  )
}

