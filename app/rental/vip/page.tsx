import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function VIPRentalPage() {

    const cars = [
        {
            title: "Rolls-Royce Ghost",
            image:"https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
            benefits:[
                "Ultra-luxury interior",
                "Elite chauffeur",
                "Customizable amenities"
            ],
            pricing:{
                hourly: "Price upon request",
                daily: "Price upon request",
                weekly: "Price upon request"
            }
        
        },
        {
            title: "Bentley Mulsanne",
            image:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
            benefits:[
                "Ultra-luxury interior",
                "Elite chauffeur",
                "Customizable amenities"
            ],
            pricing:{
                hourly: "Price upon request",
                daily: "Price upon request",
                weekly: "Price upon request"
            }
        
        },
        {
            title: "Maybach S-Class",
            image:"https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
            benefits:[
                "Ultra-luxury interior",
                "Elite chauffeur",
                "Customizable amenities"
            ],
            pricing:{
                hourly: "Price upon request",
                daily: "Price upon request",
                weekly: "Price upon request"
            }
        
        }
    ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VIP Rental</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src="https://nairobiwire.com/wp-content/uploads/2025/01/Rolls-Royce-Cullinan-28.jpg" alt="VIP Rental" width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">
            Our VIP Rental service offers the pinnacle of luxury and exclusivity. Perfect for high-profile events,
            celebrity transport, or when you simply want to indulge in the extraordinary.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Ultra-luxury vehicles</li>
            <li>Highly trained and discreet chauffeurs</li>
            <li>Personalized service</li>
            <li>Enhanced privacy and security measures</li>
            <li>Bespoke amenities upon request</li>
          </ul>
          <Button size="lg">Inquire Now</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our VIP Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

