"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { ArrowLeft, Edit, Trash2, MapPin, Calendar, Gauge, DollarSign } from "lucide-react"
import type { VehicleListing } from "@/contexts/MarketplaceContext"
import { formatVehicleTitle, getDisplayMake } from "@/utils/vehicleDisplay"

export default function ViewListingPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { getListing, deleteListing } = useMarketplace()
  const [listing, setListing] = useState<VehicleListing | null>(null)
  const [loading, setLoading] = useState(true)

  const listingId = params.id as string

  // Load listing data
  useEffect(() => {
    const loadListing = async () => {
      try {
        setLoading(true)
        const listingData = await getListing(listingId)
        setListing(listingData)
      } catch (error: any) {
        console.error("Error loading listing:", error)
        toast({
          title: "Error loading listing",
          description: error.message || "Failed to load listing data",
          variant: "destructive",
        })
        router.push("/admin/listings")
      } finally {
        setLoading(false)
      }
    }

    if (listingId) {
      loadListing()
    }
  }, [listingId, getListing, toast, router])

  const handleEdit = () => {
    router.push(`/admin/listings/edit/${listingId}`)
  }

  const handleDelete = async () => {
    if (!listing) return

    if (confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      try {
        await deleteListing(listingId)
        toast({
          title: "Listing deleted",
          description: "The vehicle listing has been successfully deleted.",
        })
        router.push("/admin/listings")
      } catch (error: any) {
        console.error("Error deleting listing:", error)
        toast({
          title: "Error deleting listing",
          description: error.message || "Failed to delete the listing",
          variant: "destructive",
        })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "sold":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Button onClick={() => router.push("/admin/listings")}>
            Back to Listings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push("/admin/listings")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Vehicle Listing</h1>
              <p className="text-muted-foreground">View and manage listing details</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                  <CardDescription className="text-lg font-semibold">
                    {listing.make} {listing.model} ({listing.year})
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(listing.status || "active")}>
                  {listing.status || "active"}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold">${listing.price?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold">{listing.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-semibold">{listing.mileage?.toLocaleString()} miles</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-semibold capitalize">{listing.condition}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-medium">{listing.make}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{listing.model}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{listing.year}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">VIN</p>
                  <p className="font-medium font-mono">{listing.vin || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Body Type</p>
                  <p className="font-medium">{listing.vehicleType || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{listing.fuelType || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{listing.transmission || "N/A"}</p>
                </div>
              </div>

              {listing.description && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm leading-relaxed">{listing.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Seller</p>
                  <p className="font-medium font-mono">{listing.dealer.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Listed Date</p>
                  <p className="font-medium">
                    {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {listing.updatedAt ? new Date(listing.updatedAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{listing.location || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          {listing.images && listing.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Images ({listing.images.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {listing.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Vehicle image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
