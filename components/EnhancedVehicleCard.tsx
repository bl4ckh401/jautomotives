"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Heart, 
  Share2, 
  Eye, 
  MapPin, 
  Fuel, 
  Settings, 
  Users, 
  Camera,
  Phone,
  MessageCircle,
  Calendar
} from 'lucide-react'
import Image from 'next/image'

interface EnhancedVehicleCardProps {
  vehicle: {
    id: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    fuelType: string
    transmission: string
    seats: number
    rating: number
    images: string[]
    location: string
    isNew?: boolean
    isFeatured?: boolean
    tags: string[]
    description: string
    dealer?: {
      name: string
      rating: number
      phone: string
    }
  }
  viewMode?: 'grid' | 'list'
  onViewDetails?: (id: string) => void
  onContact?: (id: string) => void
  onFavorite?: (id: string) => void
}

export default function EnhancedVehicleCard({
  vehicle,
  viewMode = 'grid',
  onViewDetails,
  onContact,
  onFavorite
}: EnhancedVehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.(vehicle.id)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (viewMode === 'list') {
    return (
      <Card className="marketplace-card group overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-96 relative">
              <div className="aspect-video lg:aspect-[4/3] relative overflow-hidden">
                <Image
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Navigation */}
                {vehicle.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {vehicle.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-yellow-400 scale-125' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {vehicle.isFeatured && (
                    <Badge className="badge-featured shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {vehicle.isNew && (
                    <Badge className="bg-yellow-400 text-black shadow-lg font-semibold">
                      New Arrival
                    </Badge>
                  )}
                </div>

                {/* Image Count */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-sm">
                    <Camera className="w-3 h-3 mr-1" />
                    {vehicle.images.length}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col">
              <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-green-400 dark:group-hover:text-yellow-400 transition-colors duration-200">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      {vehicle.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{vehicle.rating}</span>
                        <span className="text-xs text-muted-foreground">(127 reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {vehicle.location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFavorite}
                      className={`h-10 w-10 rounded-full ${
                        isFavorite 
                          ? 'text-jaba-red bg-jaba-red/10 hover:bg-jaba-red/20' 
                          : 'text-muted-foreground hover:text-jaba-red hover:bg-jaba-red/10'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 rounded-full text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {vehicle.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-secondary/50 hover:bg-yellow-400/20 text-foreground border border-border hover:border-yellow-400/30 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <Eye className="w-5 h-5 text-jaba-silver" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{vehicle.mileage.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Miles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <Fuel className="w-5 h-5 text-jaba-silver" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{vehicle.fuelType}</div>
                      <div className="text-xs text-muted-foreground">Fuel Type</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <Settings className="w-5 h-5 text-jaba-silver" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{vehicle.transmission}</div>
                      <div className="text-xs text-muted-foreground">Transmission</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                    <Users className="w-5 h-5 text-jaba-silver" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{vehicle.seats}</div>
                      <div className="text-xs text-muted-foreground">Seats</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-green-400 dark:text-yellow-400">
                    {formatPrice(vehicle.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    KES {Math.round(vehicle.price / 60).toLocaleString()}/mo*
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => onContact?.(vehicle.id)}
                    className="border-green-400 dark:border-yellow-400 text-green-400 dark:text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    className="btn-primary"
                    onClick={() => onViewDetails?.(vehicle.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid View
  return (
    <Card className="marketplace-card group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={vehicle.images[currentImageIndex]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Image Navigation */}
        {vehicle.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {vehicle.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {vehicle.isFeatured && (
            <Badge className="badge-featured shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          {vehicle.isNew && (
            <Badge className="bg-yellow-400 text-black shadow-lg font-semibold">
              New
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className={`h-8 w-8 rounded-full backdrop-blur-sm ${
              isFavorite 
                ? 'bg-jaba-red/90 text-white' 
                : 'bg-black/40 text-white hover:bg-jaba-red/90'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-yellow-400/90 hover:text-black"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Count */}
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 backdrop-blur-sm">
            <Camera className="w-3 h-3 mr-1" />
            {vehicle.images.length}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-green-400 dark:group-hover:text-yellow-400 transition-colors duration-200 leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-foreground">{vehicle.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {vehicle.location}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {vehicle.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-secondary/50 hover:bg-yellow-400/20 text-foreground border border-border hover:border-yellow-400/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {vehicle.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground">
              +{vehicle.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.seats} seats</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-green-400 dark:text-yellow-400">
              {formatPrice(vehicle.price)}
            </div>
            <div className="text-xs text-muted-foreground">
              KES {Math.round(vehicle.price / 60).toLocaleString()}/mo*
            </div>
          </div>
          <Button 
            className="btn-primary group-hover:shadow-lg"
            onClick={() => onViewDetails?.(vehicle.id)}
          >
            View Details
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs border-green-400 text-green-400 dark:border-yellow-400 dark:text-yellow-400 hover:bg-yellow-400 hover:text-black"
            onClick={() => onContact?.(vehicle.id)}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Message
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs hover:bg-secondary"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Test Drive
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
