"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useMarketplace } from '@/contexts/MarketplaceContext'

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const { placeBid } = useMarketplace()
  const [auction, setAuction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [bid, setBid] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/auctions/${params.id}`)
      .then((r) => r.json())
      .then((data) => setAuction(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleBid = async () => {
    try {
      await placeBid(params.id, bid)
      alert('Bid placed')
    } catch (e) {
      console.error(e)
      alert('Failed to place bid')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!auction) return <p>Auction not found</p>

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">{auction.title}</h1>
      <p>Starts: {new Date(auction.startsAt).toLocaleString()}</p>
      <p>Ends: {new Date(auction.endsAt).toLocaleString()}</p>
      <p className="mt-4">Starting Bid: {auction.startingBid}</p>

      <div className="mt-6 max-w-sm">
        <label className="block mb-2">Your bid</label>
        <input value={bid} onChange={(e) => setBid(e.target.value)} className="w-full border p-2 rounded" />
        <button onClick={handleBid} className="mt-3 btn btn-primary">Place Bid</button>
      </div>
    </div>
  )
}
