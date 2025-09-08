"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Truck,
} from "lucide-react";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { VehicleListing } from "@/contexts/MarketplaceContext";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchFilters } from "@/components/search-filters";
import EnhancedVehicleCard from "@/components/EnhancedVehicleCard";
import { formatVehicleTitle } from "@/utils/vehicleDisplay";

// Enhanced vehicle interface for marketplace
interface EnhancedVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number | string;
  // numericPrice is used for filtering/sorting (KES or numeric extracted from string)
  numericPrice: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  seats: number;
  rating: number;
  images: string[];
  location: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
  description: string;
  dealer?: {
    name: string;
    rating: number;
    phone: string;
  };
  directImport?: boolean;
}

// Main Marketplace Component
export default function MarketplacePage() {
  const { getListings, loading } = useMarketplace();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<EnhancedVehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<EnhancedVehicle[]>(
    []
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 70000000]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters from "Find what fits you" section
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const brand = searchParams.get("brand");
    const bodyType = searchParams.get("bodyType");
    const priceRangeParam = searchParams.get("priceRange");

    if (keyword) {
      setSearchQuery(keyword);
    }

    if (brand) {
      setSelectedMakes([brand]);
    }

    if (bodyType) {
      // Map body type to category
      const categoryMap: { [key: string]: string } = {
        SUV: "suv",
        Sedan: "sedan",
        Truck: "truck",
        Coupe: "luxury",
        Convertible: "luxury",
      };
      setActiveCategory(categoryMap[bodyType] || "all");
    }

    if (priceRangeParam) {
      // Parse price range like "0 - 500K" to actual numbers
      const priceMap: { [key: string]: [number, number] } = {
        "0 - 500K": [0, 500000],
        "500K - 1M": [500000, 1000000],
        "1M - 2M": [1000000, 2000000],
        "2M - 3M": [2000000, 3000000],
        "3M - 5M": [3000000, 5000000],
        "5M - 10M": [5000000, 10000000],
        "Above 10M": [10000000, 70000000],
      };
      const range = priceMap[priceRangeParam];
      if (range) {
        setPriceRange(range);
      }
    }
  }, [searchParams]);

  // Load vehicles
  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const result = await getListings(
          {
            status: "active",
          },
          50
        );

        const enhancedVehicles: EnhancedVehicle[] = result.listings.map(
          (vehicle) => {
            // Preserve raw price for direct import formatting. Also compute a numericPrice used for filtering/sorting.
            const rawPrice = vehicle.price;
            const numericPrice =
              parseFloat(String(rawPrice || "").replace(/[^0-9.-]+/g, "")) || 0;

            return {
              id: vehicle.id || "unknown",
              make: vehicle.make,
              model: vehicle.model,
              year: parseInt(vehicle.year) || 2024,
              price: rawPrice,
              numericPrice,
              mileage: parseInt(vehicle.mileage) || 0,
              fuelType: vehicle.fuelType,
              transmission: vehicle.transmission,
              seats: parseInt(vehicle.doors) || 5,
              rating: 4.5 + Math.random() * 0.5, // Mock rating
              images: vehicle.images?.length
                ? vehicle.images
                : ["/api/placeholder/600/400"],
              location: vehicle.location || "Location not specified",
              isNew: vehicle.condition === "New",
              isFeatured: vehicle.featured || false,
              tags: [
                vehicle.vehicleType,
                vehicle.condition,
                vehicle.fuelType,
              ].filter(Boolean),
              description: vehicle.description,
              directImport: vehicle.directImport === true,
              dealer: {
                name: vehicle.contactName || "Verified Dealer",
                rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
                phone: vehicle.contactPhone || "(555) 123-4567",
              },
            };
          }
        );

        setVehicles(enhancedVehicles);
        setFilteredVehicles(enhancedVehicles);
      } catch (error) {
        console.error("Error loading vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [getListings]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...vehicles];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (vehicle) =>
          formatVehicleTitle(vehicle.year, vehicle.make, vehicle.model)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          vehicle.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((vehicle) => {
        switch (activeCategory) {
          case "luxury":
            return vehicle.numericPrice > 60000;
          case "suv":
            return vehicle.tags?.includes("SUV");
          case "sedan":
            return vehicle.tags?.includes("Sedan");
          case "electric":
            return vehicle.fuelType?.toLowerCase().includes("electric");
          case "featured":
            return vehicle.isFeatured;
          default:
            return true;
        }
      });
    }

    // Price range filter (use numericPrice)
    filtered = filtered.filter(
      (vehicle) =>
        vehicle.numericPrice >= priceRange[0] &&
        vehicle.numericPrice <= priceRange[1]
    );

    // Make filter
    if (selectedMakes.length > 0) {
      filtered = filtered.filter((vehicle) =>
        selectedMakes.includes(vehicle.make)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.numericPrice - b.numericPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.numericPrice - a.numericPrice);
        break;
      case "year-new":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "mileage-low":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      default: // newest
        // Sort by ID as a fallback
        break;
    }

    setFilteredVehicles(filtered);
  }, [
    vehicles,
    searchQuery,
    activeCategory,
    sortBy,
    priceRange,
    selectedMakes,
  ]);

  const categories = [
    { id: "all", label: "All Vehicles", icon: Car, count: vehicles.length },
    {
      id: "luxury",
      label: "Luxury",
      icon: Crown,
      count: vehicles.filter((v) => v.numericPrice > 60000).length,
    },
    {
      id: "suv",
      label: "SUV",
      icon: Truck,
      count: vehicles.filter((v) => v.tags?.includes("SUV")).length,
    },
    {
      id: "sedan",
      label: "Sedan",
      icon: Car,
      count: vehicles.filter((v) => v.tags?.includes("Sedan")).length,
    },
    {
      id: "electric",
      label: "Electric",
      icon: Zap,
      count: vehicles.filter((v) =>
        v.fuelType?.toLowerCase().includes("electric")
      ).length,
    },
    {
      id: "featured",
      label: "Featured",
      icon: Star,
      count: vehicles.filter((v) => v.isFeatured).length,
    },
  ];

  const popularMakes = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Tesla",
    "Porsche",
    "Lexus",
    "Cadillac",
    "Volvo",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-16 md:pt-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-background via-card to-background border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400/5 via-transparent to-jaba-silver/5" />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* <div className="flex items-center justify-center mb-6">
              <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Premium Marketplace
              </span>
            </div> */}

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-400-light to-yellow-400 bg-clip-text text-transparent">
                Perfect Vehicle
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover premium vehicles from verified dealers. Experience
              luxury, performance, and reliability all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                placeholder="Search by make, model, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border focus:border-yellow-400 rounded-2xl bg-card/50 backdrop-blur outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 dark:text-yellow-400">
                  {vehicles.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Premium Vehicles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 dark:text-yellow-400">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  Verified Dealers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 dark:text-yellow-400">
                  4.9
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "h-12 px-6 rounded-full transition-all duration-200 flex items-center gap-2 border",
                  activeCategory === category.id
                    ? "bg-yellow-400 text-black hover:bg-yellow-400-dark shadow-lg border-yellow-400"
                    : "border-border hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <span className="bg-background/50 px-2 py-1 rounded text-xs">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 px-4 border border-border hover:border-yellow-400 hover:text-yellow-400 rounded-md transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  showFilters && "rotate-180"
                )}
              />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-4 border border-border rounded-md bg-background text-foreground outline-none focus:border-yellow-400"
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
              onClick={() => setViewMode("grid")}
              className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center border transition-colors",
                viewMode === "grid"
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-border hover:border-yellow-400"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center border transition-colors",
                viewMode === "list"
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-border hover:border-yellow-400"
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
                <label className="text-sm font-medium mb-3 block">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="70000000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full mb-2 accent-yellow-400"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>KES {priceRange[0].toLocaleString()}</span>
                  <span>KES {priceRange[1].toLocaleString()}</span>
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
                        setSelectedMakes((prev) =>
                          prev.includes(make)
                            ? prev.filter((m) => m !== make)
                            : [...prev, make]
                        );
                      }}
                      className={cn(
                        "text-xs px-3 py-1 rounded border transition-colors",
                        selectedMakes.includes(make)
                          ? "bg-yellow-400 text-black border-yellow-400"
                          : "border-border hover:border-yellow-400"
                      )}
                    >
                      {make}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Quick Filters
                </label>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-yellow-400 transition-colors flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Verified Dealers Only
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-yellow-400 transition-colors flex items-center gap-2">
                    <Award className="w-3 h-3" />
                    Award Winners
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs border border-border rounded hover:border-yellow-400 transition-colors flex items-center gap-2">
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
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse border border-border rounded-xl"
              >
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
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setSelectedMakes([]);
                setPriceRange([0, 200000]);
              }}
              className="px-6 py-3 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-400-dark transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredVehicles.map((vehicle) => (
              <EnhancedVehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                viewMode={viewMode}
                onViewDetails={() => {
                  if ((vehicle as any).directImport === true) {
                    router.push(`/direct-import/${vehicle.id}`);
                  } else {
                    router.push(`/vehicles/${vehicle.id}`);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading &&
          filteredVehicles.length > 0 &&
          filteredVehicles.length >= 20 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-md font-semibold transition-colors flex items-center gap-2 mx-auto">
                Load More Vehicles
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
