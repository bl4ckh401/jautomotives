import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"


export default function CorporateCarRentalPage() {

    const cars = [
        {
            title: "Toyota Prius",
            image:"https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
            benefits:[
                "Luxury interior",
                "Professional chauffeur",
                "Decorated for weddings"
            ],
            pricing:{
                hourly: "2,000",
                daily: "15,000",
                weekly: "90,000"
            }
        
        },
        {
            title: "Ford Transit",
            image:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
            benefits:[
                "Luxury interior",
                "Professional chauffeur",
                "Decorated for weddings"
            ],
            pricing:{
                hourly: "2,000",
                daily: "15,000",
                weekly: "90,000"
            }
        
        },
        {
            title: "Tesla Model 3",
            image:"https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
            benefits:[
                "Luxury interior",
                "Professional chauffeur",
                "Decorated for weddings"
            ],
            pricing:{
                hourly: "2,000",
                daily: "15,000",
                weekly: "90,000"
            }
        
        }
    ]

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

