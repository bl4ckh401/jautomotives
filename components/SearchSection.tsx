"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"

export default function SearchSection() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const priceRanges = ["0 - 500K", "500K - 1M", "1M - 2M", "2M - 3M", "3M - 5M", "5M - 10M", "Above 10M"]

  return (
    <section className="py-20 px-4 bg-[#1a1f24] text-white">
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
                className="pl-10 bg-transparent border-gray-700 text-white placeholder:text-gray-500"
                placeholder="Search vehicle name"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Brand</h3>
            <Input
              className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
              placeholder="Select brand"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Body Type</h3>
            <Input
              className="bg-transparent border-gray-700 text-white placeholder:text-gray-500"
              placeholder="Select body type"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by budget</h3>
          <div className="flex flex-wrap gap-4">
            {priceRanges.map((range) => (
              <Button
                key={range}
                variant="outline"
                className="border-gray-700 text-white hover:bg-white hover:text-black"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Click here for Advanced search
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>

          {showAdvanced && (
            <div className="mt-8 w-full max-w-2xl">{/* Advanced search options can be added here */}</div>
          )}

          <Button className="mt-8 bg-white text-black hover:bg-gray-200 min-w-[200px]">Search</Button>
        </div>
      </div>
    </section>
  )
}

