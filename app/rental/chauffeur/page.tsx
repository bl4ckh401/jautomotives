import Image from "next/image"
import { Button } from "@/components/ui/button"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function ChauffeurDrivenRentalsPage() {
  const cars = [
    {
      title: "Mercedes-Benz E-Class",
      image: "https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
      benefits: ["Luxury interior", "Professional chauffeur", "Decorated for weddings"],
      pricing: {
        hourly: "2,000",
        daily: "15,000",
        weekly: "90,000",
      },
    },
    {
      title: "BMW 7 Series",
      image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
      benefits: ["Luxury interior", "Professional chauffeur", "Decorated for weddings"],
      pricing: {
        hourly: "2,000",
        daily: "15,000",
        weekly: "90,000",
      },
    },
    {
      title: "Audi A8",
      image: "https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
      benefits: ["Luxury interior", "Professional chauffeur", "Decorated for weddings"],
      pricing: {
        hourly: "2,000",
        daily: "15,000",
        weekly: "90,000",
      },
    },
  ]

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
            <li>Luxury vehicles for all occasions</li>
            <li>Door-to-door service</li>
            <li>Flexible booking options</li>
            <li>24/7 customer support</li>
          </ul>
          <Button size="lg">Book Now</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our Chauffeur-Driven Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index} />
        ))}
      </div>
    </div>
  )
}

