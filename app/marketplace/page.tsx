import type { Metadata } from "next"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"
import { SearchFilters } from "@/components/search-filters"
import { VehicleCard } from "@/components/vehicle-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card"
import { TradeInVehicles } from "@/components/trade-in/trade-in-vehicles"

export const metadata: Metadata = {
  title: "Marketplace | JABA Automobiles",
  description: "Browse our selection of vehicles, motorbikes, and trade-in options at JABA Automobiles.",
}

// This would typically come from your API
const vehicles = [
  {
    id: "1",
    title: "Nissan Note Medalist",
    year: 2017,
    image:
      "https://carsales.pxcrush.net/carsales/cars/dealer/14ahrwo9ssacqhc87rs2reguy.jpg?pxc_method=fitfill&pxc_bgtype=self&height=725&width=1087",
    price: 1100000,
    specs: {
      transmission: "Automatic",
      engine: "1200 CC",
      condition: "Foreign Used",
    },
    description:
      "Comes equipped with 360 degree camera. Full leather interior. Its a fully loaded unit with a full size spare wheel and a pump. It has a new KYB suspension heavy duty coil springs and is tinted.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "2",
    title: "Mazda CX5 2.2 Diesel",
    year: 2018,
    image:
      "https://www.gtrent.com/upload/images/modelli/lamborghini_/huracan_evo_spyder_blu/1200x800/lamborghini_huracan_evo_spyder_rental_8.jpg",
    price: 2950000,
    specs: {
      transmission: "Automatic",
      engine: "2200 CC",
      condition: "Foreign Used",
    },
    description:
      "Currently on highseas enroute to Port of Mombasa. Estimated arrival Nairobi, date 26th February. Low mileage. Well equipped model. Reserve early and get preferential number plate.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  // Add more vehicles as needed
]

// Sample data for motorbikes
const motorbikes = [
  {
    id: "1",
    title: "Ducati Panigale V4",
    year: 2023,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    price: 2500000,
    specs: {
      engine: "1103 CC",
      power: "215.5 HP",
      torque: "124 Nm",
      weight: "175 kg",
      condition: "New",
    },
    description:
      "The Ducati Panigale V4 is the most powerful production motorcycle from the Borgo Panigale factory, delivering exceptional performance with advanced electronics and aerodynamics.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "2",
    title: "BMW S 1000 RR",
    year: 2022,
    image: "https://images.unsplash.com/photo-1635073908681-644d2b6f0ff2?q=80&w=1974&auto=format&fit=crop",
    price: 2200000,
    specs: {
      engine: "999 CC",
      power: "205 HP",
      torque: "113 Nm",
      weight: "197 kg",
      condition: "Foreign Used",
    },
    description:
      "The BMW S 1000 RR revolutionized the supersports motorcycle category right from the outset. Now it's raising the bar even higher with its optimized chassis and enhanced performance.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <MarketplaceCategories />
        </div>

        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="motorbikes">Motorbikes</TabsTrigger>
            <TabsTrigger value="trade-in">Trade-In</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6">
            <SearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="motorbikes" className="space-y-6">
            <SearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {motorbikes.map((motorbike) => (
                <MotorbikeCard key={motorbike.id} {...motorbike} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trade-in" className="space-y-6">
            <div className="bg-[#1a1f24] p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-2">Trade-In Program</h2>
              <p className="text-gray-400 mb-4">
                These vehicles are available exclusively through our trade-in program, offering you special pricing when
                you trade in your current vehicle.
              </p>
              <a href="/trade-in" className="text-blue-400 hover:underline">
                Learn more about our trade-in process →
              </a>
            </div>
            <TradeInVehicles />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

