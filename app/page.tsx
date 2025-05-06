"use client"

import { useRouter } from "next/navigation"
import Hero from "@/components/Hero"
import SearchSection from "@/components/SearchSection"
import FeaturedVehicles from "@/components/FeaturedVehicles"
import WhyChooseUs from "@/components/WhyChooseUs"
import CustomerReviews from "@/components/CustomerReviews"
import { useState } from "react"

export default function Home() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    brand: "",
    bodyType: "",
    priceRange: "",
    keyword: ""
  })

  const handleSearch = (params: any) => {
    // Construct query string from search parameters
    const queryParams = new URLSearchParams()
    
    if (params.keyword) {
      queryParams.set("keyword", params.keyword)
    }
    
    if (params.brand) {
      queryParams.set("brand", params.brand)
    }
    
    if (params.bodyType) {
      queryParams.set("bodyType", params.bodyType)
    }
    
    if (params.priceRange) {
      queryParams.set("priceRange", params.priceRange)
    }
    
    // Redirect to marketplace with search parameters
    router.push(`/marketplace?${queryParams.toString()}`)
  }

  return (
    <div>
      <Hero />
      <SearchSection onSearch={handleSearch} />
      <WhyChooseUs />
      <CustomerReviews />
      <FeaturedVehicles />
    </div>
  )
}

