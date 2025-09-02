"use client"

import React, { useEffect, useState } from 'react'
import { useMarketplace } from '@/contexts/MarketplaceContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function AuctionAdminPage() {
  const { createAuction, getAuctions } = useMarketplace()
  const [isCreating, setIsCreating] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const [auctions, setAuctions] = useState<any[]>([])

  // Form state
  const [form, setForm] = useState({
    title: '',
    startingBid: '',
    reservePrice: '',
    vehicleId: '',
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    description: '',
  })

  useEffect(() => {
    loadAuctions()
  }, [])

  const loadAuctions = async () => {
    setLoadingList(true)
    try {
      const data = await getAuctions()
      setAuctions(data || [])
    } catch (e) {
      console.error('Failed to load auctions', e)
    } finally {
      setLoadingList(false)
    }
  }

  const handleChange = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }))

  const handleCreate = async () => {
    setIsCreating(true)
    try {
      const payload = {
        title: form.title,
        startingBid: form.startingBid,
        reservePrice: form.reservePrice,
        vehicleId: form.vehicleId,
        startsAt: form.startsAt,
        endsAt: form.endsAt,
        description: form.description,
      }

      await createAuction(payload)
      await loadAuctions()
      setForm({ ...form, title: '', startingBid: '', reservePrice: '', vehicleId: '', description: '' })
    } catch (err) {
      console.error(err)
      alert('Error creating auction')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">Auction Management</h1>
      <p className="text-muted-foreground mb-6">Create and manage vehicle auctions.</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create Auction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="vehicleId">Vehicle ID (optional)</Label>
              <Input id="vehicleId" value={form.vehicleId} onChange={(e) => handleChange('vehicleId', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="startingBid">Starting Bid</Label>
              <Input id="startingBid" value={form.startingBid} onChange={(e) => handleChange('startingBid', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="reservePrice">Reserve Price</Label>
              <Input id="reservePrice" value={form.reservePrice} onChange={(e) => handleChange('reservePrice', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button onClick={handleCreate} disabled={isCreating}>{isCreating ? 'Creating...' : 'Create Auction'}</Button>
              <Button variant="ghost" onClick={loadAuctions}>Refresh List</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Auctions</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList ? (
            <p>Loading auctions...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auctions.length === 0 && <p className="text-muted-foreground">No auctions found</p>}
              {auctions.map((a) => (
                <div key={a.id} className="border rounded-md p-4">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">Starts: {new Date(a.startsAt).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Ends: {new Date(a.endsAt).toLocaleString()}</p>
                  <p className="mt-2">Starting Bid: {a.startingBid}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
