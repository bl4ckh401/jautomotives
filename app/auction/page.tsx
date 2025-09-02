"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AuctionPage() {
  const [auctions, setAuctions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/auctions')
      .then((r) => r.json())
      .then((data) => setAuctions(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Auctions</h1>
      <p className="text-muted-foreground mb-6">Browse upcoming and live auctions.</p>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {auctions.map((a) => (
          <div key={a.id} className="border rounded-md p-4">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-muted-foreground">Starts: {new Date(a.startsAt).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Ends: {new Date(a.endsAt).toLocaleString()}</p>
            <p className="mt-2">Starting Bid: {a.startingBid}</p>
            <div className="mt-4">
              <Link href={`/auction/${a.id}`} className="text-primary">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
