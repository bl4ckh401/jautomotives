import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function SelfDriveCarHirePage() {


    const cars = [
        {
            title: "Toyota Corolla",
            image:"https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
            benefits:[
                "Unlimited mileage",
                "GPS navigation",
                "24/7 support"
            ],
            pricing:{
                hourly: "1,500",
                daily: "5,000",
                weekly: "30,000"
            }
        },
        {
            title: "Mazda CX-5",
            image:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
            benefits:[
                "Unlimited mileage",
                "GPS navigation",
                "24/7 support"
            ],
            pricing:{
                hourly: "1,500",
                daily: "5,000",
                weekly: "30,000"
            }
        
        },
        {
            title: "Ford Mustang",
            image:"https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
            benefits:[
                "Unlimited mileage",
                "GPS navigation",
                "24/7 support"
            ],
            pricing:{
                hourly: "1,500",
                daily: "5,000",
                weekly: "30,000"
            }
        
        }
    ]

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

