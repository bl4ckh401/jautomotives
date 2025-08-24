import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function LongTermCarHirePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Long-Term Car Hire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://carexpo.com.tr/wp-content/uploads/2023/03/long-term.jpg"
            alt="Long-Term Car Hire"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Our Long-Term Car Hire service offers flexibility and convenience for extended stays, relocations, or
            long-term projects. Enjoy the benefits of a personal vehicle without the commitment of ownership.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Flexible rental periods (1 month to 1 year or more)</li>
            <li>Wide range of vehicles to choose from</li>
            <li>Maintenance and insurance included</li>
            <li>Option to switch vehicles during rental period</li>
            <li>Competitive rates for long-term rentals</li>
          </ul>
          <Button size="lg">Get a Quote</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Popular Long-Term Rentals</h2>
  <RentalGrid category={"long-term" as RentalCategory} />
    </div>
  )
}

