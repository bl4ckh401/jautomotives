import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function AirportTransferPage() {


    const cars = [
        {
            title: "Mercedes-Benz V-Class",
            image:"https://www.topgear.com/sites/default/files/cars-car/image/2024/11/Mercedes_VClass__0002.jpg",
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
            title: "BMW 5 Series",
            image:"https://carsforsale.co.ke/wp-content/uploads/2024/08/2017-BMW-5-Series-530i-M-Sport-5.jpg",
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
            title: "Toyota Alphard",
            image:"https://cdn1.npcdn.net/images/77feadb55b7b02b37e31156b3fe7fe3c_1683616148.webp?md5id=baa9c50420112c3411e4d87614108554&new_width=1000&new_height=1000&size=max&w=1588155577&from=jpeg",
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
      <h1 className="text-3xl font-bold mb-8">Airport Transfer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="https://mauritiusattractions.com/content/images/category-page-images/airport-transfer.jpg"
            alt="Airport Transfer"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-4">
            Start or end your journey in comfort and style with our Airport Transfer service. We ensure a smooth and
            stress-free transition between the airport and your destination.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Meet and greet service at the airport</li>
            <li>Professional, punctual drivers</li>
            <li>Comfortable, well-maintained vehicles</li>
            <li>Flight tracking to adjust for any delays</li>
            <li>24/7 service availability</li>
          </ul>
          <Button size="lg">Book Transfer</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-6">Our Airport Transfer Fleet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

