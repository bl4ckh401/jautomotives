"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import { VehicleListing } from "@/contexts/MarketplaceContext"

interface VehicleAnalyticsProps {
  vehicle: VehicleListing
}

export function VehicleAnalytics({ vehicle }: VehicleAnalyticsProps) {
  useEffect(() => {
    // Track vehicle page view
    track("vehicle_view", {
      vehicle_id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      condition: vehicle.condition,
      location: vehicle.location,
    })
  }, [vehicle])

  return null
}

// Utility functions for tracking specific events
export const trackVehicleEvent = {
  whatsappClick: (vehicleId: string, make: string, model: string) => {
    track("vehicle_whatsapp_click", { vehicle_id: vehicleId, make, model })
  },
  
  phoneClick: (vehicleId: string, make: string, model: string) => {
    track("vehicle_phone_click", { vehicle_id: vehicleId, make, model })
  },
  
  testDriveRequest: (vehicleId: string, make: string, model: string) => {
    track("test_drive_request", { vehicle_id: vehicleId, make, model })
  },
  
  shareClick: (vehicleId: string, make: string, model: string) => {
    track("vehicle_share", { vehicle_id: vehicleId, make, model })
  },
  
  paymentDetailsView: (vehicleId: string, make: string, model: string) => {
    track("payment_details_view", { vehicle_id: vehicleId, make, model })
  },
}