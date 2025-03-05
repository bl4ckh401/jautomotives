import Hero from "@/components/Hero"
import SearchSection from "@/components/SearchSection"
import FeaturedVehicles from "@/components/FeaturedVehicles"
import WhyChooseUs from "@/components/WhyChooseUs"
import CustomerReviews from "@/components/CustomerReviews"
import { SignedIn, SignedOut } from "@clerk/nextjs"
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
      <SignedOut>
        <div className="bg-[#1a1f24] py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join JABA Automobiles Today</h2>
          <p className="text-gray-300 mb-6">Create an account to access exclusive features and offers.</p>
          <Link href="/sign-up">
            <Button className="bg-white text-black hover:bg-gray-200">Sign Up Now</Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="bg-[#1a1f24] py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to JABA Automobiles</h2>
          <p className="text-gray-300 mb-6">Explore our services and find your perfect vehicle.</p>
          <Link href="/dashboard">
            <Button className="bg-white text-black hover:bg-gray-200">Go to Dashboard</Button>
          </Link>
        </div>
      </SignedIn>
    </div>
  )
}

