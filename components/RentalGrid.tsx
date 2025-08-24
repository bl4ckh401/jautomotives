"use client"

import { useEffect, useState } from "react"
import RentalFleetCard from "@/components/RentalFleetCard"
import { getRentalVehicles, type RentalVehicle } from "@/services/rentalService"
import type { RentalCategory } from "@/lib/rentalCategories"

interface RentalGridProps {
  category: RentalCategory
}

function toCardModel(v: RentalVehicle) {
  const title = v.name || [v.make, v.model].filter(Boolean).join(" ") || "Vehicle"
  const image = v.images?.[0]
  const daily = typeof v.pricePerDay === "number" ? v.pricePerDay.toLocaleString() : "-"
  const baseBenefits: string[] = []
  if (v.seats) baseBenefits.push(`${v.seats} seats`)
  if (v.transmission) baseBenefits.push(v.transmission === "automatic" ? "Automatic" : "Manual")
  if (v.fuelType) baseBenefits.push(v.fuelType.charAt(0).toUpperCase() + v.fuelType.slice(1))
  const benefits = (v.features && v.features.length > 0 ? v.features : baseBenefits).slice(0, 3)
  return {
    title,
    image,
    benefits,
    pricing: {
      daily,
    },
  href: `/rental/${v.id}`,
  }
}

export default function RentalGrid({ category }: RentalGridProps) {
  const [items, setItems] = useState<RentalVehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getRentalVehicles({ category, available: true })
        if (mounted) setItems(data)
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [category])

  if (loading) return <div className="text-sm text-muted-foreground">Loading vehicles…</div>

  if (items.length === 0) return <div className="text-sm text-muted-foreground">No vehicles available right now.</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((v) => (
        <RentalFleetCard key={v.id} car={toCardModel(v)} />
      ))}
    </div>
  )
}
