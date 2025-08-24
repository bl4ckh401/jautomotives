import Image from "next/image";
import { Button } from "@/components/ui/button";
import RentalGrid from "@/components/RentalGrid";
import type { RentalCategory } from "@/lib/rentalCategories";

export default function EventCarHirePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Car Hire</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://www.chennaivantravels.in/image/all/21.jpg"
            alt="Event Car Hire"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Make your event truly special with our Event Car Hire service.
            Whether it's a corporate gathering, music festival, or sports event,
            we have the perfect vehicles to enhance your occasion.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Wide range of vehicles for different event types</li>
            <li>Customizable branding options</li>
            <li>Professional drivers familiar with event logistics</li>
            <li>Flexible hire durations</li>
            <li>Dedicated event coordinator</li>
          </ul>
          <Button size="lg">Request a Quote</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">
        Popular Event Vehicles
      </h2>
      <RentalGrid category={"event" as RentalCategory} />
    </div>
  );
}
