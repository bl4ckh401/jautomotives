"use client";

import { useEffect, useState } from "react";
import { SearchFilters } from "@/components/motorbikes/search-filters";
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { VehicleListing } from "@/contexts/MarketplaceContext";
import { Skeleton } from "@/components/ui/skeleton";
// import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Motorbikes Marketplace | JABA Automobiles",
//   description: "Explore our collection of premium motorbikes available for purchase with cryptocurrency",
// }

export default function MotorbikesPage() {
  const { getListings } = useMarketplace();
  const [motorbikes, setMotorbikes] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicleType: ["Motorbike"],
    status: "active",
  });

  // Load motorbikes from database
  useEffect(() => {
    const fetchMotorbikes = async () => {
      try {
        setLoading(true);
        const result = await getListings(filters, 20);
        setMotorbikes(result.listings);
      } catch (error) {
        console.error("Error fetching motorbikes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorbikes();
  }, [getListings, filters]);

  const handleSearch = (searchFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...searchFilters,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="relative overflow-hidden bg-gradient-to-r from-background via-card to-background border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400/5 via-transparent to-jaba-silver/5" />
        </div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-400-light to-yellow-400 bg-clip-text text-transparent">
                Perfect Motorbike
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore premium motorbikes from verified sellers. Performance,
              style & reliability all in one place.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${motorbikes.length} motorbikes`}
            </span>
          </div>
          <div className="hidden md:block w-1/2">
            {/* Placeholder for future filters */}
          </div>
        </div>
        {/* Existing filters */}
        <SearchFilters onSearch={handleSearch} />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg overflow-hidden"
              >
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
        ) : motorbikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {motorbikes.map((motorbike) => (
              <MotorbikeCard
                key={motorbike.id}
                id={motorbike.id!}
                title={`${motorbike.make} ${motorbike.model}`}
                year={parseInt(motorbike.year)}
                image={motorbike.images[0] || "/placeholder.svg"}
                price={parseInt(motorbike.price)}
                specs={{
                  engine: motorbike.engineSize || "",
                  power: "",
                  torque: "",
                  weight: "",
                  condition: motorbike.condition,
                }}
                description={motorbike.description}
                dealer={{
                  name: motorbike.contactName || "JABA Automotives",
                  verified: true,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-2">No motorbikes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
