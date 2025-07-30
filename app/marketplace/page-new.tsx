"use client"

import { useEffect, useState } from "react"
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  Share2, 
  Eye,
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Users,
  Camera,
  TrendingUp,
  Award,
  Shield,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  Play,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Car,
  Crown,
  Truck
} from "lucide-react"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { VehicleListing } from "@/contexts/MarketplaceContext"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Enhanced Vehicle Card Component
function PremiumVehicleCard({ vehicle, viewMode = 'grid' }: { vehicle: any, viewMode?: 'grid' | 'list' }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  if (viewMode === 'list') {
    return (
      <div className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border rounded-xl bg-card/50 backdrop-blur-sm">
        <div className="flex">
          <div className="relative w-80 h-56 overflow-hidden rounded-l-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-jaba-gold/20 to-transparent z-10" />
            <Image
              src={vehicle.images?.[0] || '/api/placeholder/400/300'}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              className={cn(
                "object-cover transition-all duration-700 group-hover:scale-110",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
            {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
            
            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              {vehicle.isFeatured && (
                <span className="bg-jaba-red text-white px-2 py-1 rounded text-xs font-medium shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
              {vehicle.isNew && (
                <span className="bg-jaba-gold text-black px-2 py-1 rounded text-xs font-semibold shadow-lg">
                  New
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-jaba-gold/20 border-0 z-20 flex items-center justify-center transition-colors"
            >
              <Heart className={cn("w-4 h-4", isFavorited && "fill-jaba-red text-jaba-red")} />
            </button>

            {/* Image Count */}
            {vehicle.images?.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20">
                <Camera className="w-3 h-3" />
                {vehicle.images.length}
              </div>
            )}
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-jaba-gold transition-colors">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < Math.floor(vehicle.rating || 4.5) ? "text-jaba-gold fill-current" : "text-muted-foreground")} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({vehicle.rating || '4.5'})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-jaba-gold">
                    ${(vehicle.price || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting price</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2">
                {vehicle.description || `Premium ${vehicle.make} ${vehicle.model} with excellent features and performance.`}
              </p>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <Eye className="w-4 h-4 text-jaba-silver mx-auto mb-1" />
                  <div className="text-sm font-medium">{(vehicle.mileage || 0).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Miles</div>
                </div>
                <div className="text-center">
                  <Fuel className="w-4 h-4 text-jaba-silver mx-auto mb-1" />
                  <div className="text-sm font-medium">{vehicle.fuelType || 'Gas'}</div>
                  <div className="text-xs text-muted-foreground">Fuel</div>
                </div>
                <div className="text-center">
                  <Settings className="w-4 h-4 text-jaba-silver mx-auto mb-1" />
                  <div className="text-sm font-medium">{vehicle.transmission || 'Auto'}</div>
                  <div className="text-xs text-muted-foreground">Trans</div>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 text-jaba-silver mx-auto mb-1" />
                  <div className="text-sm font-medium">{vehicle.seats || 5}</div>
                  <div className="text-xs text-muted-foreground">Seats</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-jaba-gold/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-jaba-gold" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">{vehicle.dealer?.name || 'Verified Dealer'}</div>
                  <div className="text-muted-foreground">★ {vehicle.dealer?.rating || '4.8'} rating</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-jaba-gold text-jaba-gold hover:bg-jaba-gold hover:text-black rounded-md transition-colors flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Schedule Test Drive
                </button>
                <Link href={`/vehicles/${vehicle.id}`}>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-jaba-gold to-jaba-gold-light text-black hover:from-jaba-gold-dark hover:to-jaba-gold font-semibold rounded-md transition-all flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80">
      <div className="relative overflow-hidden">
        <div className="aspect-video relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={vehicle.images?.[0] || '/api/placeholder/400/300'}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className={cn(
              "object-cover transition-all duration-700 group-hover:scale-110",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {vehicle.isFeatured && (
              <span className="bg-jaba-red text-white px-2 py-1 rounded text-xs font-medium shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            {vehicle.isNew && (
              <span className="bg-jaba-gold text-black px-2 py-1 rounded text-xs font-semibold shadow-lg">
                New
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 backdrop-blur hover:bg-jaba-gold/20 border-0 z-20 flex items-center justify-center transition-colors"
          >
            <Heart className={cn("w-4 h-4", isFavorited && "fill-jaba-red text-jaba-red")} />
          </button>

          {/* Image Count */}
          {vehicle.images?.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20">
              <Camera className="w-3 h-3" />
              {vehicle.images.length}
            </div>
          )}

          {/* Quick View Button (appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button className="px-4 py-2 text-sm bg-background/90 text-foreground hover:bg-jaba-gold hover:text-black backdrop-blur rounded-md transition-colors flex items-center gap-1">
              <Play className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-jaba-gold transition-colors">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < Math.floor(vehicle.rating || 4.5) ? "text-jaba-gold fill-current" : "text-muted-foreground")} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({vehicle.rating || '4.5'})</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-jaba-gold">
              ${(vehicle.price || 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Starting price</div>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="w-4 h-4 text-jaba-silver" />
            <span>{(vehicle.mileage || 0).toLocaleString()} miles</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.fuelType || 'Gasoline'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.transmission || 'Automatic'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-jaba-silver" />
            <span>{vehicle.seats || 5} seats</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {vehicle.description || `Premium ${vehicle.make} ${vehicle.model} with excellent features and performance.`}
        </p>

        {/* Tags */}
        {vehicle.tags && (
          <div className="flex flex-wrap gap-1">
            {vehicle.tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="text-xs bg-jaba-gold/10 text-jaba-gold border border-jaba-gold/20 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-jaba-gold/20 flex items-center justify-center">
              <Shield className="w-3 h-3 text-jaba-gold" />
            </div>
            <div className="text-xs">
              <div className="font-medium">{vehicle.dealer?.name || 'Verified Dealer'}</div>
              <div className="text-muted-foreground">★ {vehicle.dealer?.rating || '4.8'}</div>
            </div>
          </div>
          <Link href={`/vehicles/${vehicle.id}`}>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-jaba-gold to-jaba-gold-light text-black hover:from-jaba-gold-dark hover:to-jaba-gold font-semibold rounded-md transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Main Marketplace Component
export default function MarketplacePage() {
  const { getListings, loading } = useMarketplace()
  const [vehicles, setVehicles] = useState<VehicleListing[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleListing[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Load vehicles
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true)
      try {
        const result = await getListings({
          status: "active"
        }, 50)
        
        // Convert VehicleListing to enhanced format
        const enhancedVehicles = result.listings.map(vehicle => ({
          id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          year: parseInt(vehicle.year) || 2024,
          price: parseInt(vehicle.price) || 0,
          mileage: parseInt(vehicle.mileage) || 0,
          fuelType: vehicle.fuelType,
          transmission: vehicle.transmission,
          seats: parseInt(vehicle.doors) || 5,
          rating: 4.5 + Math.random() * 0.5, // Mock rating
          images: vehicle.images?.length ? vehicle.images : ['/api/placeholder/600/400'],
          location: vehicle.location || 'Location not specified',
          isNew: vehicle.condition === 'new',
          isFeatured: vehicle.featured || false,
          tags: [vehicle.vehicleType, vehicle.condition, vehicle.fuelType].filter(Boolean),
          description: vehicle.description,
          dealer: {
            name: vehicle.contactName || 'Verified Dealer',
            rating: (4.5 + Math.random() * 0.4).toFixed(1),
            phone: vehicle.contactPhone || '(555) 123-4567'
          }
        }))
        
        setVehicles(enhancedVehicles)
        setFilteredVehicles(enhancedVehicles)
      } catch (error) {
        console.error("Error loading vehicles:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadVehicles()
  }, [getListings])

  // Filter and search logic
  useEffect(() => {
    let filtered = [...vehicles]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(vehicle => {
        switch (activeCategory) {
          case 'luxury': return vehicle.price > 60000
          case 'suv': return vehicle.tags?.includes('SUV')
          case 'sedan': return vehicle.tags?.includes('Sedan')
          case 'electric': return vehicle.fuelType?.toLowerCase().includes('electric')
          case 'featured': return vehicle.isFeatured
          default: return true
        }
      })
    }

    // Price range filter
    filtered = filtered.filter(vehicle => 
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    )

    // Make filter
    if (selectedMakes.length > 0) {
      filtered = filtered.filter(vehicle => selectedMakes.includes(vehicle.make))
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage)
        break
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    }

    setFilteredVehicles(filtered)
  }, [vehicles, searchQuery, activeCategory, sortBy, priceRange, selectedMakes])

  const categories = [
    { id: 'all', label: 'All Vehicles', icon: Car, count: vehicles.length },
    { id: 'luxury', label: 'Luxury', icon: Crown, count: vehicles.filter(v => v.price > 60000).length },
    { id: 'suv', label: 'SUV', icon: Truck, count: vehicles.filter(v => v.tags?.includes('SUV')).length },
    { id: 'sedan', label: 'Sedan', icon: Car, count: vehicles.filter(v => v.tags?.includes('Sedan')).length },
    { id: 'electric', label: 'Electric', icon: Zap, count: vehicles.filter(v => v.fuelType?.toLowerCase().includes('electric')).length },
    { id: 'featured', label: 'Featured', icon: Star, count: vehicles.filter(v => v.isFeatured).length },
  ]

  const popularMakes = ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Lexus', 'Cadillac', 'Volvo']

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-background via-card to-background border-b border-border">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFD700\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"3\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-jaba-gold/10 text-jaba-gold border border-jaba-gold/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Premium Marketplace
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-jaba-gold via-jaba-gold-light to-jaba-gold bg-clip-text text-transparent">
                Perfect Vehicle
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover premium vehicles from verified dealers. Experience luxury, performance, and reliability all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                placeholder="Search by make, model, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border focus:border-jaba-gold rounded-2xl bg-card/50 backdrop-blur outline-none"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-jaba-gold">{vehicles.length}+</div>
                <div className="text-sm text-muted-foreground">Premium Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-jaba-gold">50+</div>
                <div className="text-sm text-muted-foreground">Verified Dealers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-jaba-gold">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "h-12 px-6 rounded-full transition-all duration-200 flex items-center gap-2 border",
                  activeCategory === category.id
                    ? "bg-jaba-gold text-black hover:bg-jaba-gold-dark shadow-lg border-jaba-gold"
                    : "border-border hover:border-jaba-gold hover:text-jaba-gold hover:bg-jaba-gold/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <span className="bg-background/50 px-2 py-1 rounded text-xs">
                  {category.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 px-4 border border-border hover:border-jaba-gold hover:text-jaba-gold rounded-md transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-4 border border-border rounded-md bg-background outline-none focus:border-jaba-gold"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest</option>
              <option value="mileage-low">Mileage: Lowest</option>
            </select>

            <div className="text-sm text-muted-foreground">
              {filteredVehicles.length} of {vehicles.length} vehicles
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center border transition-colors",
                viewMode === 'grid' ? "bg-jaba-gold text-black border-jaba-gold" : "border-border hover:border-jaba-gold"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center border transition-colors",
                viewMode === 'list' ? "bg-jaba-gold text-black border-jaba-gold" : "border-border hover:border-jaba-gold"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="mb-8 border border-border rounded-xl bg-card/50 backdrop-blur p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full mb-2 accent-jaba-gold"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Make Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">Make</label>
                <div className="flex flex-wrap gap-2">
                  {popularMakes.map((make) => (
                    <button
                      key={make}
                      onClick={() => {
                        setSelectedMakes(prev => 
                          prev.includes(make) 
                            ? prev.filter(m => m !== make)
                            : [...prev, make]
                        )
                      }}
                      className={cn(
                        "text-xs px-3 py-1 rounded border transition-colors",
                        selectedMakes.includes(make) ? "bg-jaba-gold text-black border-jaba-gold" : "border-border hover:border-jaba-gold"
                      )}
                    >
                      {make}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div>
                <label className="text-sm font-medium mb-3 block">Quick Filters</label>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-jaba-gold transition-colors flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Verified Dealers Only
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-jaba-gold transition-colors flex items-center gap-2">
                    <Award className="w-3 h-3" />
                    Award Winners
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-jaba-gold transition-colors flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Warranty Included
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse border border-border rounded-xl">
                <div className="aspect-video bg-muted rounded-t-xl" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No vehicles found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
                setSelectedMakes([])
                setPriceRange([0, 200000])
              }}
              className="px-6 py-3 bg-jaba-gold text-black rounded-md font-semibold hover:bg-jaba-gold-dark transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredVehicles.map((vehicle) => (
              <PremiumVehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && filteredVehicles.length > 0 && filteredVehicles.length >= 20 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 border border-jaba-gold text-jaba-gold hover:bg-jaba-gold hover:text-black rounded-md font-semibold transition-colors flex items-center gap-2 mx-auto">
              Load More Vehicles
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
