"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RentalDetailsProps {
  rental: any
}

export default function RentalDetails({ rental }: RentalDetailsProps) {
  const [current, setCurrent] = useState(0)
  const images: string[] = rental.images || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {images[current] ? (
              <Image src={images[current]} alt={rental.name || rental.title} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">No image</div>
            )}
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((src, idx) => (
              <button key={idx} onClick={() => setCurrent(idx)} className={`w-24 h-16 rounded overflow-hidden border ${current === idx ? 'ring-2 ring-jaba-gold' : ''}`}>
                <Image src={src} alt={`thumb-${idx}`} width={96} height={64} className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <aside className="p-4 bg-card rounded-lg space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{rental.name || `${rental.make} ${rental.model}`}</h1>
            <p className="text-sm text-muted-foreground">{rental.year}</p>
          </div>

          <div>
            <p className="text-3xl font-extrabold text-jaba-gold">KES {rental.pricePerDay?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">per day</p>
          </div>

          <div className="space-y-2">
            <Button className="w-full">Book Now</Button>
            <Button variant="outline" className="w-full">Contact Us</Button>
          </div>

          <div className="pt-2">
            <Badge variant="secondary">{rental.category}</Badge>
            {rental.available === false && <Badge className="ml-2">Unavailable</Badge>}
          </div>
        </aside>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-sm text-muted-foreground">{rental.description || 'No description provided.'}</p>

          <h3 className="text-lg font-semibold">Features</h3>
          <div className="flex flex-wrap gap-2">
            {(rental.features || []).map((f: string, i: number) => (
              <Badge key={i}>{f}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3 p-4 bg-card rounded-lg">
          <h3 className="text-lg font-semibold">Specifications</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Transmission: {rental.transmission || '-'}</li>
            <li>Fuel: {rental.fuelType || '-'}</li>
            <li>Seats: {rental.seats ?? '-'}</li>
            <li>Mileage: {rental.mileage ?? '-'} km</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
