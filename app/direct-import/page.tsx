"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function DirectImportPage() {
  const { getListings } = useMarketplace()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setIsLoading(true)
      try {
        const res = await getListings({ directImport: true, status: "active" } as any, 100)
        if (!mounted) return
        const list = res.listings || []
        setVehicles(list)
        setFiltered(list)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [getListings])

  useEffect(() => {
    if (!searchQuery) return setFiltered(vehicles)
    setFiltered(
      vehicles.filter((v) =>
        `${v.make || ""} ${v.model || ""}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.description || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, vehicles])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-jaba-gold">
            Direct Import Vehicles
          </h1>
          <p className="text-muted-foreground mt-3">Carefully curated overseas vehicles ready for import. Each listing contains full import details.</p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-muted-foreground" />
            <Input value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} placeholder="Search make, model, description..." className="pl-12" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse border border-border rounded-xl p-6" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No direct import vehicles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or check back later.</p>
              <Link href="/sell-vehicle">
                <Button>List a Direct Import</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((v) => (
                <EnhancedVehicleCard key={v.id} vehicle={v} onViewDetails={(id: string) => { window.location.href = `/direct-import/${id}` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
