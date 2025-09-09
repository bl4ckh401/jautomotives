"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { FleetVehicle } from "@/services/fleetService"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Calendar, Car, DollarSign, Info, MapPin, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<FleetVehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        setError(null)
        const vehicleDoc = await getDoc(doc(db, "fleet", params.id))
        
        if (vehicleDoc.exists()) {
          setVehicle({ id: vehicleDoc.id, ...vehicleDoc.data() } as FleetVehicle)
        } else {
          setError("Vehicle not found")
        }
      } catch (err) {
        console.error("Error fetching vehicle:", err)
        setError("Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }
    
    fetchVehicle()
  }, [params.id])
  
  // Vehicle features based on type
  const getVehicleFeatures = (type: string) => {
    const commonFeatures = [
      "Air Conditioning", 
      "Power Steering", 
      "Bluetooth Connectivity"
    ]
    
    const typeSpecificFeatures: Record<string, string[]> = {
      sedan: ["Fuel Efficient", "Cruise Control", "Compact Trunk Space"],
      suv: ["Spacious Interior", "Higher Seating Position", "All Wheel Drive"],
      luxury: ["Premium Sound System", "Leather Seats", "Advanced Climate Control", "Premium Navigation"],
      van: ["Sliding Doors", "Extra Cargo Space", "Multiple Seating Rows"],
      truck: ["Towing Package", "Truck Bed", "Heavy Duty Suspension"]
    }
    
    return [...commonFeatures, ...(typeSpecificFeatures[type] || [])]
  }
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/fleet" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Fleet
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-12 w-full mt-8" />
          </div>
        </div>
      </div>
    )
  }
  
  // Render error state
  if (error || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/fleet" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Fleet
        </Link>
        
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Vehicle Unavailable</AlertTitle>
          <AlertDescription>
            {error || "This vehicle is currently unavailable"}. Please browse our other available vehicles.
          </AlertDescription>
        </Alert>
        
        <div className="text-center py-12 mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Vehicle Under Maintenance</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
            The vehicle you're looking for is currently under maintenance or may have been removed from our fleet.
          </p>
          <Link href="/fleet">
            <Button>Browse Available Vehicles</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const features = getVehicleFeatures(vehicle.type)
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link href={`/fleet/${vehicle.type}`} className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}s
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Image Section */}
        <div>
          {vehicle.imageUrl ? (
            <Image
              src={vehicle.imageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-96 flex items-center justify-center rounded-lg">
              <Car className="h-24 w-24 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Info Section */}
        <div>
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="font-normal text-sm">
              {vehicle.type.toUpperCase()}
            </Badge>
            <Badge 
              // variant={vehicle.status === "available" ? "success" : "secondary"}
              className="ml-2"
            >
              {vehicle.status === "available" ? "Available" : "Unavailable"}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          
          <div className="flex items-center text-2xl font-semibold text-primary mb-6">
            <DollarSign className="h-6 w-6 mr-1" />
            <span>KES {vehicle.dailyRate}</span>
            <span className="text-base font-normal text-muted-foreground ml-1">/ day</span>
          </div>
          
          <Separator className="my-6" />
          
          {/* Vehicle Specs */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Make</span>
              <span className="font-medium">{vehicle.make}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Model</span>
              <span className="font-medium">{vehicle.model}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Year</span>
              <span className="font-medium">{vehicle.year}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Type</span>
              <span className="font-medium capitalize">{vehicle.type}</span>
            </div>
          </div>
          
          {/* Features Section */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Features</CardTitle>
              <CardDescription>Included with this vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Rental Details */}
          <div className="flex items-center text-primary mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Pick up at our main location</span>
          </div>
          
          {/* Book Now Button */}
          {vehicle.status === "available" ? (
            <Link href={`/fleet/book/${vehicle.id}`}>
              <Button className="w-full py-6 text-lg mt-4">
                <Calendar className="h-5 w-5 mr-2" />
                Book This Vehicle
              </Button>
            </Link>
          ) : (
            <Button className="w-full py-6 text-lg mt-4" disabled>
              Currently Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 