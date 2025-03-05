import Image from "next/image"
import { Button } from "@/components/ui/button"

const carDetails = {
  "rolls-royce-phantom": {
    name: "Rolls-Royce Phantom",
    image: "/images/rolls-royce-phantom.jpg",
    price: 50000,
    description: "The epitome of luxury, perfect for making a grand entrance on your special day.",
    features: [
      "Spacious interior with premium leather seats",
      "State-of-the-art sound system",
      "Champagne cooler",
      "Professional chauffeur",
      "Red carpet service available",
    ],
  },
  "mercedes-benz-s-class": {
    name: "Mercedes-Benz S-Class",
    image: "/images/mercedes-benz-s-class.jpg",
    price: 30000,
    description: "Combining elegance with cutting-edge technology for a sophisticated wedding experience.",
    features: [
      "Comfortable seating for up to 4 passengers",
      "Panoramic sunroof",
      "Advanced climate control",
      "Professional chauffeur",
      "Customizable interior lighting",
    ],
  },
  "bentley-continental": {
    name: "Bentley Continental",
    image: "/images/bentley-continental.jpg",
    price: 40000,
    description: "A blend of sportiness and luxury, perfect for stylish couples.",
    features: [
      "Handcrafted interior with premium materials",
      "Powerful performance for smooth rides",
      "Bespoke audio system",
      "Professional chauffeur",
      "Optional convertible option for scenic routes",
    ],
  },
}

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = carDetails[params.id as keyof typeof carDetails]

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{car.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={car.image || "/placeholder.svg"} alt={car.name} width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">{car.description}</p>
          <p className="text-2xl font-semibold mb-4">Price: KES {car.price} per day</p>
          <h2 className="text-xl font-semibold mb-2">Features:</h2>
          <ul className="list-disc list-inside mb-6">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Button size="lg">Book Now</Button>
        </div>
      </div>
    </div>
  )
}

