"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const CACHE_KEY = "directImportListings_v1"

export default function DirectImportPage() {
  const { getListings } = useMarketplace()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const mountedRef = useRef(true)

  // read cache on mount, then revalidate in background
  useEffect(() => {
    mountedRef.current = true

    // try to read cache first so page shows immediately when navigating back
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const list = JSON.parse(raw) || []
        setVehicles(list)
        setFiltered(list)
        setIsLoading(false) // show cached UI immediately
      }
    } catch (e) {
      console.error("Failed to read cached listings", e)
    }

    const fetchListings = async () => {
      try {
        // only show loading spinner if we have no cached data
        if (!vehicles.length) setIsLoading(true)
        const res = await getListings({ directImport: true, status: "active" } as any, 100)
        if (!mountedRef.current) return
        const list = res.listings || []
        setVehicles(list)
        setFiltered((q) =>
          searchQuery
            ? list.filter((v: any) =>
                `${v.make || ""} ${v.model || ""}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (v.description || "").toLowerCase().includes(searchQuery.toLowerCase())
              )
            : list
        )
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list))
        } catch (e) {
          console.warn("Failed to write cache", e)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mountedRef.current) setIsLoading(false)
      }
    }

    // initial fetch / revalidate
    fetchListings()

    // revalidate on window focus so it's almost real-time when user returns
    const onFocus = () => fetchListings()
    window.addEventListener("focus", onFocus)

    // optional: also revalidate when page becomes visible
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchListings()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      mountedRef.current = false
      window.removeEventListener("focus", onFocus)
      document.removeEventListener("visibilitychange", onVisibility)
    }
    // intentionally exclude vehicles and searchQuery here to avoid re-running effect too often;
    // fetchListings uses latest searchQuery via closure in setFiltered call above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getListings])

  // keep filter in sync with search input and vehicles
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
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background pt-16">
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
              <Link href="/marketplace">
                <Button>Browse All Vehicles</Button>
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