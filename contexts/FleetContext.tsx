"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getFleetVehicles, type FleetVehicle } from "@/services/fleetService"

interface FleetContextType {
  vehicles: FleetVehicle[]
  loading: boolean
  error: string | null
  getVehiclesByType: (type: string) => FleetVehicle[]
  refreshFleet: () => Promise<void>
}

const FleetContext = createContext<FleetContextType | undefined>(undefined)

export function FleetProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFleetVehicles = async () => {
    try {
      setLoading(true)
      setError(null)
      const fleetVehicles = await getFleetVehicles()
      setVehicles(fleetVehicles)
    } catch (err) {
      console.error("Error fetching fleet vehicles:", err)
      setError("Failed to load fleet vehicles")
    } finally {
      setLoading(false)
    }
  }

  // Load fleet vehicles on mount
  useEffect(() => {
    fetchFleetVehicles()
  }, [])

  // Filter vehicles by type (sedan, suv, , etc.)
  const getVehiclesByType = (type: string) => {
    return vehicles.filter(
      vehicle => vehicle.type.toLowerCase() === type.toLowerCase()
    )
  }

  return (
    <FleetContext.Provider 
      value={{ 
        vehicles, 
        loading, 
        error, 
        getVehiclesByType,
        refreshFleet: fetchFleetVehicles
      }}
    >
      {children}
    </FleetContext.Provider>
  )
}

export function useFleet() {
  const context = useContext(FleetContext)
  if (context === undefined) {
    throw new Error("useFleet must be used within a FleetProvider")
  }
  return context
} 