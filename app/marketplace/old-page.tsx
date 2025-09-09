"use client"

import { useEffect, useState } from "react"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"
import { SearchFilters } from "@/components/search-filters"
import { VehicleCard } from "@/components/vehicle-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card"
import { TradeInVehicles } from "@/components/trade-in/trade-in-vehicles"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleListing } from "@/contexts/MarketplaceContext"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketplacePage() {
  const { getListings, loading } = useMarketplace()
  const [vehicles, setVehicles] = useState<VehicleListing[]>([])
  const [motorbikes, setMotorbikes] = useState<VehicleListing[]>([])
  const [tradeInVehicles, setTradeInVehicles] = useState<VehicleListing[]>([])
  const [activeTab, setActiveTab] = useState("vehicles")
  const [isLoading, setIsLoading] = useState(true)

  // Load data for the active tab
  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true)
      try {
        // Only load data for the current active tab to improve performance
        if (activeTab === "vehicles" && vehicles.length === 0) {
          const result = await getListings({
            vehicleType: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Wagon", "Van/Minivan", "Hatchback", "Crossover", ""],
            sortBy: "newest"
          }, 9);
          setVehicles(result.listings);
        } 
        else if (activeTab === "motorbikes" && motorbikes.length === 0) {
          const result = await getListings({
            vehicleType: ["Motorbike", "Motorcycle", "Scooter"],
            sortBy: "newest"
          }, 9);
          setMotorbikes(result.listings);
        }
        else if (activeTab === "trade-in" && tradeInVehicles.length === 0) {
          const result = await getListings({
            listingType: "trade-in",
            sortBy: "newest"
          }, 9);
          setTradeInVehicles(result.listings);
        }
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [activeTab, getListings, vehicles.length, motorbikes.length, tradeInVehicles.length]);

  // Convert VehicleListing to card props
  const mapListingToCardProps = (listing: VehicleListing) => {
    return {
      id: listing.id || "",
      title: listing.title,
      year: parseInt(listing.year),
      image: listing.mainImage || listing.images[0] || "/placeholder.svg",
      price: parseInt(listing.price),
      specs: {
        transmission: listing.transmission,
        engine: listing.engineSize || `${listing.fuelType} Engine`,
        condition: listing.condition,
      },
      description: listing.description,
      dealer: {
        name: listing.contactName,
        verified: true,
      },
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <MarketplaceCategories />
        </div>

        <Tabs 
          defaultValue="vehicles" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="motorbikes">Motorbikes</TabsTrigger>
            <TabsTrigger value="trade-in">Trade-In</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6">
            <SearchFilters />
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...mapListingToCardProps(vehicle)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                <p className="text-muted-foreground">Try adjusting your search filters or check back later.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="motorbikes" className="space-y-6">
            <SearchFilters />
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : motorbikes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {motorbikes.map((motorbike) => (
                  <VehicleCard key={motorbike.id} {...mapListingToCardProps(motorbike)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No motorbikes found</h3>
                <p className="text-muted-foreground">Try adjusting your search filters or check back later.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trade-in" className="space-y-6">
            <div className="bg-background p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-2">Trade-In Program</h2>
              <p className="text-gray-400 mb-4">
                These vehicles are available exclusively through our trade-in program, offering you special pricing when
                you trade in your current vehicle.
              </p>
              <a href="/trade-in" className="text-blue-400 hover:underline">
                Learn more about our trade-in process →
              </a>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(4).fill(0).map((_, index) => (
                  <div key={index} className="bg-background rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TradeInVehicles vehicles={tradeInVehicles} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

