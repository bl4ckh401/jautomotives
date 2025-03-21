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

export function SearchFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <Card className="bg-gray-800/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search motorbikes..."
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
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="kawasaki">Kawasaki</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="ducati">Ducati</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="harley-davidson">Harley-Davidson</SelectItem>
                    <SelectItem value="triumph">Triumph</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Motorbike Types</SelectLabel>
                    <SelectItem value="sport">Sport</SelectItem>
                    <SelectItem value="cruiser">Cruiser</SelectItem>
                    <SelectItem value="touring">Touring</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="naked">Naked</SelectItem>
                    <SelectItem value="off-road">Off-Road</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
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
              <span className="text-sm text-muted-foreground">KES 0 - 5M+</span>
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
                <label className="text-sm font-medium">Engine Size</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-250">Under 250cc</SelectItem>
                    <SelectItem value="250-500">250-500cc</SelectItem>
                    <SelectItem value="500-750">500-750cc</SelectItem>
                    <SelectItem value="750-1000">750-1000cc</SelectItem>
                    <SelectItem value="over-1000">Over 1000cc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="foreign-used">Foreign Used</SelectItem>
                    <SelectItem value="locally-used">Locally Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Transmission</label>
                <Select>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
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

