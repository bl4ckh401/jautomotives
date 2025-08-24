import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalGrid from "@/components/RentalGrid"
import type { RentalCategory } from "@/lib/rentalCategories"

export default function SelfDriveCarHirePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Self-Drive Car Hire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://www.pelago.com/img/products/ID-Indonesia/self-drive-car-rental-bali/0731-0602_self-drive-car-rental-bali-indonesia-pelago0.jpg"
            alt="Self-Drive Car Hire"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Experience the freedom of the open road with our Self-Drive Car Hire service. Choose from a wide range of
            vehicles and explore at your own pace.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Flexible rental periods</li>
            <li>Wide selection of vehicles</li>
            <li>Comprehensive insurance options</li>
            <li>24/7 roadside assistance</li>
            <li>Contactless pickup and drop-off available</li>
          </ul>
          <Button size="lg">Book a Car</Button>
        </div>
      </div>

  <h2 className="text-2xl font-semibold mt-12 mb-6">Popular Self-Drive Options</h2>
  {/* Dynamic grid backed by Firestore */}
  <RentalGrid category={"self-drive" as RentalCategory} />
    </div>
  )
}

