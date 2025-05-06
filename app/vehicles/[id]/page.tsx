"use client"

import type { Metadata } from "next"
import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleDetails } from "@/components/vehicle-details"
import { SimilarVehicles } from "@/components/similar-vehicles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share, Phone, ArrowLeft } from "lucide-react"
import { useMarketplace, VehicleListing } from "@/contexts/MarketplaceContext"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

// We can't use generateMetadata with client components
// You would need to implement a separate server component for SEO metadata
// or use a Next.js API route for dynamic metadata

export default function VehiclePage() {
  const { id } = useParams() as { id: string }
  const { getListing, incrementViews } = useMarketplace()
  const [vehicle, setVehicle] = useState<VehicleListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        const vehicleData = await getListing(id)
        setVehicle(vehicleData)
        setError(null)
        
        // Increment view count on initial load
        if (!vehicle) {
          await incrementViews(id)
        }
      } catch (err: any) {
        console.error("Error fetching vehicle:", err)
        setError(err.message || "Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()

    // Set up auto-refresh
    const interval = setInterval(() => {
      if (document.hidden) return // Don't refresh if page is not visible
      fetchVehicle()
    }, 30000) // 30 seconds

    // Cleanup
    return () => clearInterval(interval)
  }, [id, getListing, incrementViews])

  // Loading state
  if (loading && !vehicle) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  // Not found state
  if (!vehicle) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Vehicle Not Found</h2>
          <p>The requested vehicle listing could not be found.</p>
        </div>
      </div>
    )
  }

  // Map vehicle specs from our data model
  const vehicleSpecs = {
    condition_score: vehicle?.condition || "N/A",
    year_of_manufacture: vehicle?.year || "N/A",
    current_location: vehicle?.location || "N/A",
    availability: vehicle?.status === "active" ? "Available" : "Sold",
    drive: vehicle?.features?.["All Wheel Drive"] ? "4WD" : 
           (vehicle?.features?.["Front Wheel Drive"] ? "FWD" : 
           (vehicle?.features?.["Rear Wheel Drive"] ? "RWD" : "N/A")),
    mileage: vehicle?.mileage ? `${vehicle.mileage} km` : "N/A",
    engine_size: vehicle?.engineSize || `${vehicle?.fuelType} Engine` || "N/A",
    fuel_type: vehicle?.fuelType || "N/A",
    transmission: vehicle?.transmission || "N/A",
    exterior_color: vehicle?.exteriorColor || "N/A",
    interior_color: vehicle?.interiorColor || "N/A",
    doors: vehicle?.doors || "N/A",
    vin: vehicle?.vin || "Not provided",
  }

  const breadcrumbItems = [
    { label: "Marketplace", href: "/marketplace" },
    { label: vehicle?.title || "Vehicle Details", href: `/vehicles/${vehicle?.id}` },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/marketplace" className="flex items-center text-primary hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div>
          <VehicleGallery images={vehicle?.images || []} />
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{vehicle?.title}</h1>
              <p className="text-2xl font-semibold mt-2">
                KES {parseInt(vehicle?.price || "0").toLocaleString()}
              </p>
            </div>
            <Badge variant="outline" className="uppercase">
              {vehicle?.featured ? "FEATURED" : "STANDARD"}
            </Badge>
          </div>

          <p className="text-gray-400">{vehicle?.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
              onClick={() => window.open(`https://wa.me/${vehicle?.contactPhone?.replace(/\D/g, '')}`, "_blank")}
            >
              Enquire via whatsapp
            </Button>
            <Button
              className="bg-black hover:bg-gray-900 text-white w-full"
              onClick={() => window.open(`tel:${vehicle?.contactPhone}`, "_blank")}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call now
            </Button>
          </div>

          <div className="bg-muted/30 p-3 rounded-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                {vehicle?.contactName?.slice(0, 1).toUpperCase() || "?"}
              </div>
              <div>
                <p className="font-medium">{vehicle?.contactName || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{vehicle?.contactEmail || "No email provided"}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {vehicle?.negotiable ? "Price is negotiable" : "Price is fixed"}
            </p>
          </div>

          <Button variant="ghost" size="sm" className="mt-2">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>

          <VehicleDetails specs={vehicleSpecs} />
        </div>
      </div>

      <div className="mt-16">
        <SimilarVehicles 
          currentVehicleId={vehicle?.id || ""} 
          make={vehicle?.make || ""}
          vehicleType={vehicle?.vehicleType || ""}
        />
      </div>
    </div>
  )
}

