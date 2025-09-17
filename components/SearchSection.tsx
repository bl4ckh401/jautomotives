"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

interface SearchSectionProps {
  onSearch?: (searchParams: any) => void
}

export function SearchSection({ onSearch }: SearchSectionProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [brand, setBrand] = useState("")
  const [bodyType, setBodyType] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const priceRanges = ["0 - 500K", "500K - 1M", "1M - 2M", "2M - 3M", "3M - 5M", "5M - 10M", "Above 10M"]
  const carBrands = [
    "Audi", "BMW", "Chevrolet", "Dodge", "Ford", "Honda", "Hyundai", 
    "Jeep", "Kia", "Lexus", "Mazda", "Mercedes-Benz", "Nissan", 
    "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
  ]
  const bodyTypes = [
    "Sedan", "SUV", "Truck", "Coupe", "Convertible", "Wagon", 
    "Van/Minivan", "Hatchback", "Crossover", "Luxury"
  ]

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({
        keyword,
        brand,
        bodyType,
        priceRange
      })
    }
  }

  return (
    <section className="py-20 px-4 bg-background text-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Find what fits you</h2>
        <p className="text-center text-gray-400 mb-12">
          We help you find a car that fits Your personality, dream and pocket!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Search by Name</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-transparent border-border text-foreground placeholder:text-muted-foreground focus:border-jaba-gold"
                placeholder="Search vehicle name"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Brand</h3>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="bg-transparent border-border text-foreground">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Car Brands</SelectLabel>
                  {carBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Body Type</h3>
            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger className="bg-transparent border-border text-foreground">
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Body Types</SelectLabel>
                  {bodyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by budget</h3>
          <div className="flex flex-wrap gap-4">
            {priceRanges.map((range) => (
              <Button
                key={range}
                variant={priceRange === range ? "default" : "outline"}
                className={priceRange === range 
                  ? "bg-white text-yellow-400 dark:text-gray-800 hover:bg-gray-200" 
                  : "border-gray-700 dark:text-primary text-gray-800 hover:bg-white hover:text-black"}
                onClick={() => setPriceRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-primary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Click here for Advanced search
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>

          {showAdvanced && (
            <div className="mt-8 w-full max-w-2xl">
              {/* Advanced search options can be added here */}
              <p className="text-gray-400 text-sm text-center">
                Advanced search options coming soon!
              </p>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            className="mt-8 bg-white text-black hover:bg-gray-200 min-w-[200px]"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}

