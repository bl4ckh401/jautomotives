"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Zap
} from "lucide-react"
import { VehicleCard } from "@/components/vehicle-card"
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { useRouter } from "next/navigation"

export default function MarketplacePage() {
  const { getListings, loading } = useMarketplace()
  const router = useRouter()
  const [vehicles, setVehicles] = useState<VehicleListing[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleListing[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration - replace with real data
  const mockVehicles = [
    {
      id: '1',
      make: 'BMW',
      model: 'X5 M50i',
      year: 2024,
      price: 89900,
      mileage: 2450,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      seats: 7,
      rating: 4.9,
      images: ['/api/placeholder/600/400'],
      location: 'Los Angeles, CA',
      isNew: true,
      isFeatured: true,
      tags: ['Premium', 'AWD', 'Luxury'],
      description: 'Ultimate luxury SUV with M Performance enhancements'
    },
    {
      id: '2',
      make: 'Mercedes-Benz',
      model: 'E-Class AMG',
      year: 2024,
      price: 75500,
      mileage: 1200,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      seats: 5,
      rating: 4.8,
      images: ['/api/placeholder/600/400'],
      location: 'Miami, FL',
      isNew: true,
      isFeatured: false,
      tags: ['Hybrid', 'Sport', 'Tech'],
      description: 'Executive sedan with cutting-edge technology'
    },
    {
      id: '3',
      make: 'Audi',
      model: 'RS6 Avant',
      year: 2023,
      price: 125000,
      mileage: 8900,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      seats: 5,
      rating: 4.9,
      images: ['/api/placeholder/600/400'],
      location: 'New York, NY',
      isNew: false,
      isFeatured: true,
      tags: ['Performance', 'Wagon', 'Rare'],
      description: 'High-performance luxury wagon - rare find'
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setVehicles(mockVehicles as any)
      setFilteredVehicles(mockVehicles as any)
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { id: 'all', name: 'All Vehicles', count: 156 },
    { id: 'luxury', name: 'Luxury', count: 89 },
    { id: 'suv', name: 'SUV', count: 45 },
    { id: 'sedan', name: 'Sedan', count: 34 },
    { id: 'sports', name: 'Sports', count: 23 },
    { id: 'electric', name: 'Electric', count: 18 },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredVehicles(vehicles)
    } else {
      const filtered = vehicles.filter(vehicle => 
        `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredVehicles(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-jaba-gold/5 via-transparent to-jaba-red/5" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-jaba-gold/20 text-jaba-gold border-jaba-gold/30 px-4 py-2 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Premium Marketplace
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-jaba-gold bg-clip-text text-transparent leading-tight">
                Find Your Perfect
                <span className="block text-jaba-gold">Dream Car</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover premium vehicles from trusted dealers across the nation. 
                Every car verified, every deal guaranteed.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by make, model, or keyword..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 h-14 text-lg border-border/50 bg-background/50 focus:border-jaba-gold focus:ring-jaba-gold/20"
                  />
                </div>
                <Button size="lg" className="btn-primary h-14 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Cars
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-border/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1,247</div>
                  <div className="text-sm text-muted-foreground">Available Cars</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-jaba-gold">89</div>
                  <div className="text-sm text-muted-foreground">Premium Dealers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-jaba-red">4.9</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Categories and Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Categories */}
            <Card className="card-modern">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-jaba-gold text-black font-medium'
                          : 'hover:bg-secondary text-foreground'
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Deal */}
            <Card className="marketplace-card bg-gradient-to-br from-jaba-gold/10 to-jaba-red/10 border-jaba-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-jaba-gold" />
                  <span className="text-sm font-semibold text-jaba-gold">Deal of the Day</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">2024 Tesla Model S</h4>
                <p className="text-sm text-muted-foreground mb-4">Limited time offer - Save $15,000</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-jaba-gold">$79,990</div>
                  <Button size="sm" className="btn-primary">
                    View Deal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredVehicles.length} of {vehicles.length} vehicles
                </span>
                <Badge variant="secondary" className="bg-jaba-gold/20 text-jaba-gold border-jaba-gold/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Updated 2 min ago
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-jaba-gold text-black' : ''}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-jaba-gold text-black' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Vehicle Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="marketplace-card animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardContent className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-8 bg-muted rounded w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredVehicles.map((vehicle) => {
                  // Convert VehicleListing to EnhancedVehicleCard format
                  const enhancedVehicle = {
                    id: vehicle.id || '',
                    make: vehicle.make,
                    model: vehicle.model,
                    year: parseInt(vehicle.year) || 2024,
                    price: parseInt(vehicle.price) || 0,
                    mileage: parseInt(vehicle.mileage) || 0,
                    fuelType: vehicle.fuelType,
                    transmission: vehicle.transmission,
                    seats: parseInt(vehicle.doors) || 4,
                    rating: 4.5,
                    images: vehicle.images.length > 0 ? vehicle.images : ['/placeholder-car.jpg'],
                    location: vehicle.location,
                    isNew: vehicle.condition === 'new',
                    isFeatured: vehicle.featured,
                    tags: [vehicle.vehicleType, vehicle.condition, vehicle.fuelType].filter(Boolean),
                    description: vehicle.description,
                    dealer: {
                      name: vehicle.contactName,
                      rating: 4.8,
                      phone: vehicle.contactPhone || '(555) 123-4567'
                    }
                  }
                  
                  return (
                    <EnhancedVehicleCard 
                      key={vehicle.id} 
                      vehicle={enhancedVehicle} 
                      viewMode={viewMode}
                      onViewDetails={(id) => router.push(`/vehicles/${id}`)}
                      onContact={(id) => console.log('Contact:', id)}
                      onFavorite={(id) => console.log('Favorite:', id)}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
