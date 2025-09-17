"use client"

import { useState, useEffect } from "react"
import { VehicleGallery } from "@/components/vehicle-gallery"
import { VehicleDetails } from "@/components/vehicle-details"
import { SimilarVehicles } from "@/components/similar-vehicles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share, Phone, ArrowLeft, Calendar, Banknote } from "lucide-react"
import { VehicleListing, useMarketplace } from "@/contexts/MarketplaceContext"
import { TestDriveModal } from "@/components/TestDriveModal"
import VehicleShareModal from "@/components/VehicleShareModal"
import { formatPhoneNumber } from "@/utils/vehicleDisplay"
import { VehicleAnalytics, trackVehicleEvent } from "@/components/VehicleAnalytics"
import Link from "next/link"

interface VehicleDetailClientProps {
  vehicle: VehicleListing
}

export default function VehicleDetailClient({ vehicle }: VehicleDetailClientProps) {
  const { incrementViews } = useMarketplace()
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  // Increment view count on mount
  useEffect(() => {
    if (vehicle.id) {
      incrementViews(vehicle.id)
    }
  }, [vehicle.id, incrementViews])

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

  // Price formatter supporting direct import USD/raw strings or local KES
  const formatPrice = (price: number | string | undefined, isDirectImport?: boolean) => {
    if (isDirectImport) {
      if (typeof price === "string") {
        const p = price.trim()
        if (p.startsWith("$")) return p
        const n = parseFloat(p.replace(/[^0-9.-]+/g, ""))
        if (!isNaN(n)) {
          return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
        }
        return p
      }
      if (typeof price === "number") {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
      }
      return ""
    }

    const numeric = typeof price === "number" ? price : parseFloat(String(price || "").replace(/[^0-9.-]+/g, ""))
    if (isNaN(numeric)) return String(price || "")
    return `KES ${parseInt(String(numeric || 0)).toLocaleString()}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VehicleAnalytics vehicle={vehicle} />
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
                {formatPrice(vehicle?.price as any, (vehicle as any).directImport === true)}
              </p>
            </div>
            <Badge variant="outline" className="uppercase">
              {vehicle?.featured ? "FEATURED" : "STANDARD"}
            </Badge>
          </div>

          <p className="text-gray-400">{vehicle?.description}</p>

          {/* Features badges */}
          {vehicle?.features && Object.keys(vehicle.features).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                {Object.entries(vehicle.features as Record<string, any>)
                  .filter(([_, value]) => {
                  // show only meaningful features:
                  // - boolean: only true
                  // - string: exclude empty or "false"
                  if (typeof value === "boolean") return value === true
                  if (typeof value === "string") {
                    const v = (value as string).trim().toLowerCase()
                    return v !== "" && v !== "false"
                  }
                  return !!value
                  })
                  .map(([name, value]) => {
                  const isTrueBoolean = typeof value === "boolean" && value === true
                  const displayValue =
                    typeof value === "string" && (value as string).trim().toLowerCase() !== "true"
                    ? `: ${value}`
                    : ""
                  return (
                    <Badge key={name} variant={isTrueBoolean ? "secondary" : "outline"}>
                    {name}
                    {displayValue}
                    </Badge>
                  )
                  })}
                </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-primary w-full"
              onClick={() => {
                trackVehicleEvent.whatsappClick(vehicle.id || '', vehicle.make || '', vehicle.model || '')
                window.open(`https://wa.me/${formatPhoneNumber(vehicle?.contactPhone || '').replace(/\D/g, '')}`, "_blank")
              }}
            >
              Enquire via whatsapp
            </Button>
            <Button
              className="bg-black hover:bg-gray-900 text-primary w-full"
              onClick={() => {
                trackVehicleEvent.phoneClick(vehicle.id || '', vehicle.make || '', vehicle.model || '')
                window.open(`tel:${formatPhoneNumber(vehicle?.contactPhone || '')}`, "_blank")
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call now
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                trackVehicleEvent.testDriveRequest(vehicle.id || '', vehicle.make || '', vehicle.model || '')
                setIsTestDriveModalOpen(true)
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Test Drive
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-6"
              onClick={() => {
                trackVehicleEvent.shareClick(vehicle.id || '', vehicle.make || '', vehicle.model || '')
                setIsShareModalOpen(true)
              }}
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Buy / Payment toggle */}
          <div>
            <Button
              onClick={() => {
                if (!showPaymentDetails) {
                  trackVehicleEvent.paymentDetailsView(vehicle.id || '', vehicle.make || '', vehicle.model || '')
                }
                setShowPaymentDetails(prev => !prev)
              }}
              variant={showPaymentDetails ? "secondary" : "outline"}
              className="w-full flex items-center justify-center gap-2 border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/10"
            >
              <Banknote className="h-4 w-4" />
              {showPaymentDetails ? "Hide Bank Payment Details" : "Buy Vehicle (Show Bank Details)"}
            </Button>
            {showPaymentDetails && (
              <div className="mt-4 border border-emerald-600/40 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/10">
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Bank Payment Details</h3>
                <p className="text-sm mb-4 text-muted-foreground">
                  Use the details below to make payment for this vehicle. After completing the transfer, share the transaction confirmation with our sales team via WhatsApp or email for faster processing.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">KES Account:</span>{' '}
                    <span className="font-mono">1340284300736</span> - JABA Automobiles Limited - Equity Bank - Ridgeways Mall Branch
                  </li>
                  <li>
                    <span className="font-medium">USD Account:</span>{' '}
                    <span className="font-mono">1340184300857</span> - JABA Automobiles Limited - Equity Bank - Ridgeways Mall Branch
                  </li>
                </ul>
                <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                  Reference: <span className="font-mono">VEH-{vehicle.id}</span> ({vehicle.make} {vehicle.model} {vehicle.year}). Ensure you include this reference in your bank transfer narration so we can allocate your payment quickly.
                </p>
                <p className="text-[11px] text-muted-foreground mt-2">
                  IMPORTANT: Always confirm availability with our team before sending funds. Vehicles are sold on a first payment received basis.
                </p>
              </div>
            )}
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

          <VehicleDetails specs={vehicleSpecs} />
        </div>
      </div>

      <div className="mt-16">
        <SimilarVehicles 
          currentVehicleId={vehicle?.id || ""} 
          make={vehicle?.make || ""}
          vehicleType={vehicle?.vehicleType || ""}
          alwaysShow
        />
      </div>

      {/* Test Drive Modal */}
      {vehicle && (
        <TestDriveModal
          isOpen={isTestDriveModalOpen}
          onClose={() => setIsTestDriveModalOpen(false)}
          vehicle={{
            id: vehicle.id || "",
            make: vehicle.make || "",
            model: vehicle.model || "",
            year: vehicle.year || "",
            image: vehicle.images?.[0] || "/placeholder-car.jpg",
            price: formatPrice(vehicle.price as any, (vehicle as any).directImport === true) || ""
          }}
        />
      )}

      {/* Share Modal */}
      {vehicle && (
        <VehicleShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          vehicle={{
            id: vehicle.id || "",
            title: vehicle.title || "",
            make: vehicle.make || "",
            model: vehicle.model || "",
            year: vehicle.year || "",
            image: vehicle.images?.[0] || "/placeholder-car.jpg",
            price: formatPrice(vehicle.price as any, (vehicle as any).directImport === true) || ""
          }}
        />
      )}
    </div>
  )
}