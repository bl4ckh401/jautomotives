import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"


export default function CorporateCarRentalPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Corporate Car Rental</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://deinfa.com/wp-content/uploads/2024/06/Reasons-Why-Corporate-Car-Rentals-are-the-Best-Choices-for-Businesses-Featured-Image.jpg"
            alt="Corporate Car Rental"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Our Corporate Car Rental service is designed to meet the transportation needs of businesses of all sizes.
            From executive sedans to fleet management, we've got your corporate mobility covered.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Wide range of vehicles to suit different needs</li>
            <li>Flexible short and long-term rental options</li>
            <li>Dedicated account manager</li>
            <li>Simplified billing and reporting</li>
            <li>24/7 support for corporate clients</li>
          </ul>
          <Button size="lg">Contact Sales</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Popular Corporate Rentals</h2>
  <RentalGrid category={"corporate" as RentalCategory} />
    </div>
  )
}

