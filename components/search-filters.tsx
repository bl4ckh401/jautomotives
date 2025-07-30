"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

const priceRanges = ["0 - 500K", "500K - 1M", "1M - 2M", "2M - 3M", "3M - 5M", "5M - 10M", "Above 10M"]

interface SearchFiltersProps {
  onSearchChange?: (searchQuery: string) => void
  onBrandChange?: (brand: string) => void
  onYearChange?: (year: string) => void
  onPriceRangeChange?: (range: [number, number]) => void
  onTransmissionChange?: (transmission: string) => void
  onFuelTypeChange?: (fuelType: string) => void
  onBodyTypeChange?: (bodyType: string) => void
  searchQuery?: string
  selectedBrand?: string
  selectedYear?: string
  priceRange?: [number, number]
}

export function SearchFilters({
  onSearchChange,
  onBrandChange,
  onYearChange,
  onPriceRangeChange,
  onTransmissionChange,
  onFuelTypeChange,
  onBodyTypeChange,
  searchQuery = "",
  selectedBrand = "",
  selectedYear = "",
  priceRange = [0, 10000000]
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <Card className="bg-card/80 backdrop-blur border">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 bg-background text-foreground placeholder:text-muted-foreground border-border focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Brand</label>
              <Select value={selectedBrand} onValueChange={onBrandChange}>
                <SelectTrigger className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Brands</SelectLabel>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Ford">Ford</SelectItem>
                    <SelectItem value="Nissan">Nissan</SelectItem>
                    <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Model</label>
              <Select>
                <SelectTrigger className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Brand First</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Year</label>
              <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year Range</SelectLabel>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Price Range</span>
              <span className="text-sm text-muted-foreground">
                KES {(priceRange[0] / 1000000).toFixed(1)}M - {(priceRange[1] / 1000000).toFixed(1)}M
              </span>
            </div>
            <Slider 
              value={priceRange} 
              onValueChange={(value) => onPriceRangeChange?.(value as [number, number])}
              max={10000000} 
              min={0}
              step={100000} 
              className="w-full" 
            />
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent"
                  size="sm"
                  onClick={() => {
                    const [min, max] = range.split(" - ")
                    let minVal = parseInt(min.replace("K", "000").replace("M", "000000"))
                    let maxVal = max === "Above" ? 10000000 : parseInt(max.replace("K", "000").replace("M", "000000"))
                    onPriceRangeChange?.([minVal, maxVal])
                  }}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? (
              <>
                Less Filters <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                More Filters <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Transmission</label>
                <Select onValueChange={onTransmissionChange}>
                  <SelectTrigger className="bg-background text-foreground border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Fuel Type</label>
                <Select onValueChange={onFuelTypeChange}>
                  <SelectTrigger className="bg-background text-foreground border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Body Type</label>
                <Select onValueChange={onBodyTypeChange}>
                  <SelectTrigger className="bg-background text-foreground border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="Pickup">Pickup</SelectItem>
                    <SelectItem value="Van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

