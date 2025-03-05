import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function OfficePUDOPage() {


    const cars = [
        {
            title: "Toyota Camry",
            image:"https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
            benefits:[
                "Comfortable seating",
                "Professional, experienced drivers",
                "Comfortable, well-maintained vehicles",
                "Wi-Fi enabled",
            ],
            pricing:{
                hourly: "1,000",
                daily: "8,000",
                weekly: "50,000"
            }
        
        },
        {
            title: "Honda Accord",
            image:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
            benefits:[
                "Comfortable seating",
                "Professional, experienced drivers",
                "Comfortable, well-maintained vehicles",
                "Wi-Fi enabled",
            ],
            pricing:{
                hourly: "1,000",
                daily: "8,000",
                weekly: "50,000"
            }
        
        },
        {
            title: "Lexus ES",
            image:"https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
            benefits:[
                "Comfortable seating",
                "Professional, experienced drivers",
                "Comfortable, well-maintained vehicles",
                "Wi-Fi enabled",
            ],
            pricing:{
                hourly: "1,000",
                daily: "8,000",
                weekly: "50,000"
            }
        
        }
    ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Office Pick-Up and Drop-Off</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://callaride.co.ke/wp-content/uploads/2023/06/office-pick-up-and-drop-off-car-hire.jpg"
            alt="Office Pick-Up and Drop-Off"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Our Office Pick-Up and Drop-Off service provides reliable and punctual transportation for your employees or
            executives. Enjoy stress-free commuting with our professional drivers.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Punctual pickups and drop-offs</li>
            <li>Professional, experienced drivers</li>
            <li>Comfortable, well-maintained vehicles</li>
            <li>Flexible scheduling options</li>
            <li>Corporate accounts available</li>
          </ul>
          <Button size="lg">Book Now</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our Office PUDO Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

