import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleDetails } from "@/components/vehicle-details"
import { SimilarVehicles } from "@/components/similar-vehicles"
// import { Breadcrumbs } from "@/components/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share, Phone } from "lucide-react"

// This would come from your API/Database
const vehicle = {
  id: "mazda-cx5-diesel",
  title: "Mazda CX5 2.2 Diesel",
  price: 2950000,
  year: 2018,
  description:
    "Currently on highseas enroute to Port of Mombasa. Estimated arrival Nairobi, date 26th February. Low mileage. Well equipped model. Reserve early and get preferential number plate.",
  images: [
    "https://carsales.pxcrush.net/carsales/cars/dealer/14ahrwo9ssacqhc87rs2reguy.jpg?pxc_method=fitfill&pxc_bgtype=self&height=725&width=1087",
    // Add more images
  ],
  specs: {
    condition_score: 5,
    year_of_manufacture: 2018,
    current_location: "Highseas, enroute Mombasa",
    availability: "Available",
    drive: "4WD",
    mileage: "88,000 km",
    engine_size: "2200 CC",
    fuel_type: "Diesel",
    horse_power: "175 Hp",
    transmission: "Automatic",
    torque: "420 Nm",
    acceleration: "9.5 Secs",
  },
  seller: {
    type: "PRIVATE SELLER",
    phone: "0726692704",
    whatsapp: "0726692704",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${vehicle.title} - JABA Automobiles`,
    description: vehicle.description,
  }
}

export default function VehiclePage() {
  if (!vehicle) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Vehicles", href: "/vehicles" },
    { label: vehicle.title, href: `/vehicles/${vehicle.id}` },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <VehicleGallery images={vehicle.images} />
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{vehicle.title}</h1>
              <p className="text-2xl font-semibold mt-2">KES {vehicle.price.toLocaleString()}</p>
            </div>
            <Badge variant="outline" className="uppercase">
              {vehicle.seller.type}
            </Badge>
          </div>

          <p className="text-gray-400">{vehicle.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
              onClick={() => window.open(`https://wa.me/${vehicle.seller.whatsapp}`, "_blank")}
            >
              Enquire via whatsapp
            </Button>
            <Button
              className="bg-black hover:bg-gray-900 text-white w-full"
              onClick={() => window.open(`tel:${vehicle.seller.phone}`)}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call now
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <VehicleDetails specs={vehicle.specs} />
        </div>
      </div>

      <div className="mt-16">
        <SimilarVehicles currentVehicleId={vehicle.id} />
      </div>
    </div>
  )
}

