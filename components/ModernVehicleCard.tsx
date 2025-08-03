"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, Eye, Calendar, Fuel, Users, Settings } from 'lucide-react'
import Image from 'next/image'

interface VehicleCardProps {
  title: string
  price: string
  image: string
  year: number
  mileage: string
  fuelType: string
  seats: number
  transmission: string
  rating: number
  isFeatured?: boolean
  isNew?: boolean
  onViewDetails?: () => void
  onFavorite?: () => void
}

export default function ModernVehicleCard({
  title,
  price,
  image,
  year,
  mileage,
  fuelType,
  seats,
  transmission,
  rating,
  isFeatured = false,
  isNew = false,
  onViewDetails,
  onFavorite
}: VehicleCardProps) {
  return (
    <Card className="group card-modern hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-video relative bg-gradient-to-br from-jaba-silver/20 to-jaba-silver/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isFeatured && (
              <Badge className="badge-featured">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-jaba-gold text-black px-2 py-1 rounded-full text-xs font-semibold">
                New Arrival
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onFavorite}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-jaba-gold/20 hover:text-jaba-red transition-all duration-200"
          >
            <Heart className="w-4 h-4" />
          </Button>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-jaba-gold transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-jaba-silver">{year}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-jaba-gold text-jaba-gold" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4 text-jaba-silver" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4 text-jaba-silver" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-jaba-silver" />
            <span>{seats} seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="w-4 h-4 text-jaba-silver" />
            <span>{transmission}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="text-2xl font-bold text-jaba-gold">{price}</p>
            <p className="text-xs text-muted-foreground">Starting price</p>
          </div>
          <Button 
            onClick={onViewDetails}
            className="btn-primary group-hover:shadow-lg"
          >
            View Details
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 btn-secondary text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            Book Test Drive
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 hover:bg-jaba-gold/10 hover:text-jaba-gold text-xs">
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Example usage component
export function VehicleShowcase() {
  const sampleVehicles = [
    {
      title: "BMW X5 xDrive40i",
      price: "$65,900",
      image: "/api/placeholder/400/300",
      year: 2024,
      mileage: "12,450 miles",
      fuelType: "Gasoline",
      seats: 7,
      transmission: "Automatic",
      rating: 4.8,
      isFeatured: true,
      isNew: true
    },
    {
      title: "Mercedes-Benz C-Class",
      price: "$45,500",
      image: "/api/placeholder/400/300", 
      year: 2023,
      mileage: "8,200 miles",
      fuelType: "Hybrid",
      seats: 5,
      transmission: "Automatic",
      rating: 4.6,
      isFeatured: false,
      isNew: false
    },
    {
      title: "Audi Q7 Premium Plus",
      price: "$58,900",
      image: "/api/placeholder/400/300",
      year: 2024,
      mileage: "5,800 miles", 
      fuelType: "Gasoline",
      seats: 7,
      transmission: "Automatic",
      rating: 4.7,
      isFeatured: true,
      isNew: false
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Modern Vehicle Cards</h2>
        <p className="text-muted-foreground">
          Showcasing the new design system with enhanced visual hierarchy and modern aesthetics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVehicles.map((vehicle, index) => (
          <ModernVehicleCard
            key={index}
            {...vehicle}
            onViewDetails={() => console.log(`View details for ${vehicle.title}`)}
            onFavorite={() => console.log(`Add ${vehicle.title} to favorites`)}
          />
        ))}
      </div>
    </div>
  )
}
