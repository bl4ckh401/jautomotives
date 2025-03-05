import { SearchFilters } from "@/components/search-filters"
import { VehicleCard } from "@/components/vehicle-card"

// This would typically come from your API
const vehicles = [
  {
    id: "1",
    title: "Nissan Note Medalist",
    year: 2017,
    image: "https://carsales.pxcrush.net/carsales/cars/dealer/14ahrwo9ssacqhc87rs2reguy.jpg?pxc_method=fitfill&pxc_bgtype=self&height=725&width=1087",
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
    image: "https://www.gtrent.com/upload/images/modelli/lamborghini_/huracan_evo_spyder_blu/1200x800/lamborghini_huracan_evo_spyder_rental_8.jpg",
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

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vehicle Marketplace</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Showing {vehicles.length} vehicles</span>
          </div>
        </div>
        <SearchFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </div>
    </div>
  )
}

