import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RentalFleetCard from "@/components/RentalFleetCard"

export default function LongTermCarHirePage() {

    const cars = [
        {
            title: "Toyota RAV4",
            image:"https://www.reverelondon.com/media/1664578800/1667039834-2fceb0bfab9b23fa8395e416379f36fa.jpg",
            benefits:[
                "Flexible rental periods (1 month to 1 year or more)",
                "Wide range of vehicles to choose from",
                "Maintenance and insurance included",
                "Option to switch vehicles during rental period",
                "Competitive rates for long-term rentals"
            ],
            pricing:{
                hourly: "Get a Quote",
                daily: "Get a Quote",
                weekly: "Get a Quote"
            }
        
        },
        {
            title: "Nissan Qashqai",
            image:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilz1Y3NWMYE0/v1/-1x-1.webp",
            benefits:[
                "Flexible rental periods (1 month to 1 year or more)",
                "Wide range of vehicles to choose from",
                "Maintenance and insurance included",
                "Option to switch vehicles during rental period",
                "Competitive rates for long-term rentals"
            ],
            pricing:{
                hourly: "Get a Quote",
                daily: "Get a Quote",
                weekly: "Get a Quote"
            }
        
        },
        {
            title: "Volkswagen Golf",
            image:"https://pugachev.miami/wp-content/uploads/2020/03/Bentley-Continental-GT-White-00-e1583427445802.jpg",
            benefits:[
                "Flexible rental periods (1 month to 1 year or more)",
                "Wide range of vehicles to choose from",
                "Maintenance and insurance included",
                "Option to switch vehicles during rental period",
                "Competitive rates for long-term rentals"
            ],
            pricing:{
                hourly: "Get a Quote",
                daily: "Get a Quote",
                weekly: "Get a Quote"
            }
        
        }
    ]

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <RentalFleetCard car={car} key={index}/>
        ))}
      </div>
    </div>
  )
}

