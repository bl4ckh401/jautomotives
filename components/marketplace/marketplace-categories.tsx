"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Car, Bike, RefreshCw } from "lucide-react"

export function MarketplaceCategories() {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => router.push("/marketplace?tab=vehicles")}
      >
        <Car className="h-4 w-4" />
        <span>Vehicles</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => router.push("/marketplace?tab=motorbikes")}
      >
        <Bike className="h-4 w-4" />
        <span>Motorbikes</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => router.push("/marketplace?tab=trade-in")}
      >
        <RefreshCw className="h-4 w-4" />
        <span>Trade-In</span>
      </Button>
    </div>
  )
}

