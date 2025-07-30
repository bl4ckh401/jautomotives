"use client"

import { useEffect, useState } from "react"
// import type { Metadata } from "next"
import { TradeInForm } from "@/components/trade-in/trade-in-form"
import { TradeInProcess } from "@/components/trade-in/trade-in-process"
import { TradeInVehicles } from "@/components/trade-in/trade-in-vehicles"
import { TradeInFAQ } from "@/components/trade-in/trade-in-faq"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleListing } from "@/contexts/MarketplaceContext"
import { Skeleton } from "@/components/ui/skeleton"

// export const metadata: Metadata = {
//   title: "Trade-In Your Vehicle | JABA Automobiles",
//   description:
//     "Trade in your current vehicle for a new one at JABA Automobiles. Get a fair valuation and upgrade your ride today.",
// }

export default function TradeInPage() {
  const { getListings } = useMarketplace()
  const [vehicles, setVehicles] = useState<VehicleListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTradeInVehicles = async () => {
      try {
        setLoading(true)
        // Get vehicles tagged for trade-in
        const result = await getListings({
          // Use custom Firestore queries for filtering by listing type
          customQuery: {
            field: "listingType",
            operator: "==",
            value: "trade-in"
          },
          status: "active"
        }, 8)
        setVehicles(result.listings)
      } catch (error) {
        console.error("Error fetching trade-in vehicles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTradeInVehicles()
  }, [getListings])

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div
          className="h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center z-20 p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 max-w-2xl">
            Trade In Your Vehicle for Something New
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl mb-8">
            Get a fair valuation for your current vehicle and upgrade to one of our premium options with our hassle-free
            trade-in program.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <TradeInProcess />
      </section>

      {/* Form Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Get Your Trade-In Valuation</h2>
        <TradeInForm />
      </section>

      {/* Available Vehicles Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Available for Trade-In</h2>
        <p className="text-lg mb-8">
          These vehicles are available exclusively through our trade-in program, offering you special pricing when you
          trade in your current vehicle.
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <TradeInVehicles vehicles={vehicles} />
        )}
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <TradeInFAQ />
      </section>
    </div>
  )
}

