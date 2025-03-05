import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const featuredVehicles = [
  {
    id: 1,
    name: "Tesla Model S Plaid",
    price: "130,000 USD",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoS_IYbjhrdD0Iz262tA709A9wsFjmgxWog&s",
    cryptoPrice: "4.3 BTC",
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    price: "220,000 USD",
    image:
      "https://carsales.pxcrush.net/carsales/cars/dealer/14ahrwo9ssacqhc87rs2reguy.jpg?pxc_method=fitfill&pxc_bgtype=self&height=725&width=1087",
    cryptoPrice: "7.3 BTC",
  },
  {
    id: 3,
    name: "Lamborghini Huracán EVO",
    price: "260,000 USD",
    image:
      "https://www.gtrent.com/upload/images/modelli/lamborghini_/huracan_evo_spyder_blu/1200x800/lamborghini_huracan_evo_spyder_rental_8.jpg",
    cryptoPrice: "8.7 BTC",
  },
]

export default function FeaturedVehicles() {
  return (
    <section className="w-screen bg-[#1a1f24]">
    <div className="py-20 px-4 max-w-6xl bg-[#1a1f24] w-full mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Luxury Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {featuredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-gray-800 border border-gray-700">
            <CardContent className="p-6">
              <Image
                src={vehicle.image || "/placeholder.svg"}
                alt={`${vehicle.name} - Luxury car available for purchase with cryptocurrency`}
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-white">{vehicle.name}</h3>
              <p className="text-gray-300 mb-2">{vehicle.price}</p>
              <p className="text-emerald-400 font-semibold">{vehicle.cryptoPrice}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/vehicles/${vehicle.id}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-white border-gray-600 hover:bg-white hover:text-gray-800"
                >
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      </div>
    </section>
  )
}

