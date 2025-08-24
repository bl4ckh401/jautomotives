"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { getRentalVehicles, type RentalVehicle } from "@/services/rentalService"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatRentalCategory } from "@/lib/rentalCategories"

export default function AdminRentalsPage() {
  const { isAdmin } = useAdmin()
  const [items, setItems] = useState<RentalVehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const all = await getRentalVehicles()
        if (mounted) setItems(all)
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (!isAdmin) {
    return <div className="text-sm text-muted-foreground">Admin access required.</div>
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Rental Vehicles</h1>
        <Button asChild>
          <Link href="/admin/rentals/add">Add Rental Vehicle</Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-sm">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-sm">No rental vehicles yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Make/Model</th>
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Price/Day</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id} className="border-b">
                  <td className="py-2 pr-4">{v.name}</td>
                  <td className="py-2 pr-4">{v.make} {v.model}</td>
                  <td className="py-2 pr-4">{v.year}</td>
                  <td className="py-2 pr-4">
                    <Badge variant="secondary">{formatRentalCategory(v.category)}</Badge>
                  </td>
                  <td className="py-2 pr-4">${'{'}v.pricePerDay.toFixed(2){'}'}</td>
                  <td className="py-2 pr-4">
                    <Badge variant={v.available ? "default" : "outline"}>
                      {v.available ? "Available" : "Unavailable"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
