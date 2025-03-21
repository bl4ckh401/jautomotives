import Hero from "@/components/Hero"
import SearchSection from "@/components/SearchSection"
import FeaturedVehicles from "@/components/FeaturedVehicles"
import WhyChooseUs from "@/components/WhyChooseUs"
import CustomerReviews from "@/components/CustomerReviews"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Hero />
      <SearchSection />
      <WhyChooseUs />
      <CustomerReviews />
      <FeaturedVehicles />
    </div>
  )
}

