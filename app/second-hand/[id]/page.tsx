"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleDetails } from "@/components/vehicle-details"
import { SimilarVehicles } from "@/components/similar-vehicles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share, Phone, ArrowLeft, Calendar, Banknote } from "lucide-react"
import { TestDriveModal } from "@/components/TestDriveModal"
import VehicleShareModal from "@/components/VehicleShareModal"
import { formatPhoneNumber } from "@/utils/vehicleDisplay"

export default function SecondHandDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const { getListing, incrementViews } = useMarketplace()
  const [vehicle, setVehicle] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        const v = await getListing(id)
        if (!v) throw new Error("Not found")
        setVehicle(v)
        setError(null)
        await incrementViews(id)
      } catch (err: any) {
        setError(err.message || "Failed to load")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id, getListing, incrementViews])

  if (loading && !vehicle) return <div className="container mx-auto p-4">Loading...</div>
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>
  if (!vehicle) return <div className="container mx-auto p-4">Listing not found</div>

  const vehicleSpecs = {
    condition_score: vehicle?.condition || "N/A",
    year_of_manufacture: vehicle?.year || "N/A",
    current_location: vehicle?.location || "N/A",
    availability: vehicle?.status === "active" ? "Available" : "Sold",
    drive: vehicle?.features?.["All Wheel Drive"] ? "4WD" : "N/A",
    mileage: vehicle?.mileage ? `${vehicle.mileage} km` : "N/A",
    engine_size: vehicle?.engineSize || `${vehicle?.fuelType} Engine` || "N/A",
    fuel_type: vehicle?.fuelType || "N/A",
    transmission: vehicle?.transmission || "N/A",
    exterior_color: vehicle?.exteriorColor || "N/A",
    interior_color: vehicle?.interiorColor || "N/A",
    doors: vehicle?.doors || "N/A",
    vin: vehicle?.vin || "Not provided",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/second-hand" className="flex items-center text-primary hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Second Hand
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div>
          <VehicleGallery images={vehicle?.images || []} />
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{vehicle?.title}</h1>
              <p className="text-2xl font-semibold mt-2">KES {parseInt(vehicle?.price || '0').toLocaleString()}</p>
            </div>
            <Badge variant="outline" className="uppercase">{vehicle?.featured ? 'FEATURED' : 'STANDARD'}</Badge>
          </div>

          <p className="text-gray-400">{vehicle?.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-primary w-full" onClick={() => window.open(`https://wa.me/${formatPhoneNumber(vehicle?.contactPhone || '').replace(/\D/g, '')}`, "_blank") }>
              Enquire via whatsapp
            </Button>
            <Button className="bg-black hover:bg-gray-900 text-primary w-full" onClick={() => window.open(`tel:${formatPhoneNumber(vehicle?.contactPhone || '')}`, "_blank") }>
              <Phone className="mr-2 h-4 w-4" /> Call now
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsTestDriveModalOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" /> Book Test Drive
            </Button>
            <Button variant="ghost" size="sm" className="px-6" onClick={() => setIsShareModalOpen(true)}>
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>

          <VehicleDetails specs={vehicleSpecs} />
        </div>
      </div>

      <div className="mt-16">
        <SimilarVehicles currentVehicleId={vehicle?.id || ''} make={vehicle?.make || ''} vehicleType={vehicle?.vehicleType || ''} alwaysShow />
      </div>

      {vehicle && (
        <TestDriveModal isOpen={isTestDriveModalOpen} onClose={() => setIsTestDriveModalOpen(false)} vehicle={{ id: vehicle.id || '', make: vehicle.make || '', model: vehicle.model || '', year: vehicle.year || '', image: vehicle.images?.[0] || '/placeholder-car.jpg', price: vehicle.price || '' }} />
      )}

      {vehicle && (
        <VehicleShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} vehicle={{ id: vehicle.id || '', title: vehicle.title || '', make: vehicle.make || '', model: vehicle.model || '', year: vehicle.year || '', image: vehicle.images?.[0] || '/placeholder-car.jpg', price: vehicle.price || '' }} />
      )}
    </div>
  )
}
