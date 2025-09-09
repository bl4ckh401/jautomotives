import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function VIPRentalPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VIP Rental</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src="https://nairobiwire.com/wp-content/uploads/2025/01/Rolls-Royce-Cullinan-28.jpg" alt="VIP Rental" width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">
            Our VIP Rental service offers the pinnacle of  and exclusivity. Perfect for high-profile events,
            celebrity transport, or when you simply want to indulge in the extraordinary.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Ultra- vehicles</li>
            <li>Highly trained and discreet chauffeurs</li>
            <li>Personalized service</li>
            <li>Enhanced privacy and security measures</li>
            <li>Bespoke amenities upon request</li>
          </ul>
          <Button size="lg">Inquire Now</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Our VIP Fleet</h2>
  <RentalGrid category={"vip" as RentalCategory} />
    </div>
  )
}

