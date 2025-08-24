import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function AirportTransferPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Airport Transfer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://mauritiusattractions.com/content/images/category-page-images/airport-transfer.jpg"
            alt="Airport Transfer"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Start or end your journey in comfort and style with our Airport Transfer service. We ensure a smooth and
            stress-free transition between the airport and your destination.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Meet and greet service at the airport</li>
            <li>Professional, punctual drivers</li>
            <li>Comfortable, well-maintained vehicles</li>
            <li>Flight tracking to adjust for any delays</li>
            <li>24/7 service availability</li>
          </ul>
          <Button size="lg">Book Transfer</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Our Airport Transfer Fleet</h2>
  <RentalGrid category={"airport" as RentalCategory} />
    </div>
  )
}

