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

const priceRanges = ["0 - 500K", "500K - 1M", "1M - 2M", "2M - 3M", "3M - 5M", "Above 5M"]

interface SearchFiltersProps {
  onSearch?: (filters: any) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [make, setMake] = useState("")
  const [year, setYear] = useState("")
  const [priceRange, setPriceRange] = useState<string>("")

  const handleSearch = () => {
    if (onSearch) {
      const filters: any = {
        vehicleType: ["Motorbike"]
      }
      
      if (searchTerm) {
        filters.searchTerm = searchTerm
      }
      
      if (make) {
        filters.make = [make]
      }
      
      if (year) {
        filters.year = year
      }
      
      if (priceRange) {
        // Convert price range to min/max values
        const range = priceRange.split(" - ")
        if (range.length === 2) {
          let min = range[0].replace("K", "000").replace("M", "000000")
          let max = range[1].replace("K", "000").replace("M", "000000")
          
          if (max === "Above") {
            filters.minPrice = parseInt(min)
          } else {
            filters.minPrice = parseInt(min)
            filters.maxPrice = parseInt(max)
          }
        }
      }
      
      onSearch(filters)
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search motorbikes..."
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select value={make} onValueChange={setMake}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Brands</SelectLabel>
                    <SelectItem value="Ducati">Ducati</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Kawasaki">Kawasaki</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Yamaha">Yamaha</SelectItem>
                    <SelectItem value="Suzuki">Suzuki</SelectItem>
                    <SelectItem value="Harley-Davidson">Harley-Davidson</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Price Ranges</SelectLabel>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

