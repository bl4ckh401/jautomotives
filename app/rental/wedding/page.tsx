import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function WeddingCarRentalPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wedding Car Rental</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src="https://i.pinimg.com/736x/ee/be/90/eebe90fdfce7edf9bca64b07767c853d.jpg" alt="Wedding Car" width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">
            Make your special day even more memorable with our  wedding car rental service. We offer a wide range
            of elegant vehicles to suit your style and budget.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Elegant and well-maintained  vehicles</li>
            <li>Professional and courteous chauffeurs</li>
            <li>Customizable decorations</li>
            <li>Punctual service for stress-free travel</li>
            <li>Photo opportunities with the car</li>
          </ul>
          <Button size="lg">Book Now</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Our Wedding Fleet</h2>
  <RentalGrid category={"wedding" as RentalCategory} />
    </div>
  )
}

