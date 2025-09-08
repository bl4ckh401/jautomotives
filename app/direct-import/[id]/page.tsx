"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleDetails } from "@/components/vehicle-details"
import { TestDriveModal } from "@/components/TestDriveModal"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export default function DirectImportDetail() {
  const { id } = useParams() as { id: string }
  const { getListing } = useMarketplace()
  const [vehicle, setVehicle] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const { doc, onSnapshot } = require("firebase/firestore")
    const { db } = require("@/lib/firebase")

    const docRef = doc(db, "vehicleListings", id)
    const unsubscribe = onSnapshot(
      docRef,
      (snap: any) => {
        if (!snap.exists()) {
          setVehicle(null)
          setError("Vehicle not found")
          setLoading(false)
          return
        }

        const data = { id: snap.id, ...snap.data() }

        // Only show if marked as direct import
        if (!data.directImport) {
          setVehicle(null)
          setError("This vehicle is not a direct import")
          setLoading(false)
          return
        }

        setVehicle(data)
        setError(null)
        setLoading(false)
      },
      (err: any) => {
        console.error("Direct import detail realtime error:", err)
        setError(err?.message || "Failed to load vehicle")
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [id])

  if (loading && !vehicle) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-full mt-8" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/direct-import" className="text-primary hover:underline mb-4 inline-block">
          <ArrowLeft className="inline-block mr-2" /> Back to Direct Imports
        </Link>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">{error || "This vehicle is currently unavailable."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/direct-import" className="text-primary hover:underline mb-4 inline-block">
        <ArrowLeft className="mr-2 inline-block" /> Back to Direct Imports
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        <div>
          <VehicleGallery images={vehicle.images || []} />
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{vehicle.make} {vehicle.model} {vehicle.year}</h1>
              <p className="text-muted-foreground mt-1">{vehicle.location || 'Imported vehicle'}</p>
            </div>
          </div>

          <div className="text-2xl font-semibold">
            {((vehicle.directImport === true) || (typeof vehicle.price === 'string' && vehicle.price.trim().startsWith('$')))
              ? (typeof vehicle.price === 'string' ? vehicle.price : `$${vehicle.price}`)
              : `KES ${parseInt(String(vehicle.price || '0').replace(/[^0-9.-]+/g, '') || '0').toLocaleString()}`}
          </div>

          <div className="bg-muted/30 p-3 rounded-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">{(vehicle.contactName || '?').slice(0,1).toUpperCase()}</div>
              <div>
                <p className="font-medium">{vehicle.contactName || 'Sales'}</p>
                <p className="text-sm text-muted-foreground">{vehicle.contactPhone || 'No phone provided'}</p>
              </div>
            </div>
          </div>

          <VehicleDetails specs={{
            year_of_manufacture: vehicle.year || 'N/A',
            mileage: vehicle.mileage ? `${vehicle.mileage} km` : 'N/A',
            fuel_type: vehicle.fuelType || 'N/A',
            transmission: vehicle.transmission || 'N/A',
            vin: vehicle.vin || 'N/A'
          }} />

          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => setIsTestDriveModalOpen(true)}>Book Test Drive</Button>
            <a href={`https://wa.me/${(vehicle.contactPhone || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
              <Button variant="outline">Enquire</Button>
            </a>
          </div>
        </div>
      </div>

      {vehicle && (
        <TestDriveModal
          isOpen={isTestDriveModalOpen}
          onClose={() => setIsTestDriveModalOpen(false)}
          vehicle={{ id: vehicle.id, make: vehicle.make, model: vehicle.model, year: vehicle.year, image: vehicle.images?.[0], price: vehicle.price }}
        />
      )}
    </div>
  )
}
