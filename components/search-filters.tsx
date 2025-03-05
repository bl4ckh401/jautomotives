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

export function SearchFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <Card className="bg-gray-800/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Brands</SelectLabel>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Select>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
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
              <label className="text-sm font-medium">Year</label>
              <Select>
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
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price Range</span>
              <span className="text-sm text-muted-foreground">KES 0 - 10M+</span>
            </div>
            <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant="outline"
                  className="border-gray-600 text-gray-200 hover:bg-gray-700/50"
                  size="sm"
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
                <label className="text-sm font-medium">Transmission</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Type</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Body Type</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
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

