import type { Metadata } from "next"
import InsuranceHero from "@/components/insurance/insurance-hero"
import InsuranceCoverage from "@/components/insurance/insurance-coverage"
import InsuranceOptions from "@/components/insurance/insurance-options"
import InsuranceCalculator from "@/components/insurance/insurance-calculator"
import InsuranceProcess from "@/components/insurance/insurance-process"
import InsuranceFAQ from "@/components/insurance/insurance-faq"
import InsuranceCTA from "@/components/insurance/insurance-cta"

export const metadata: Metadata = {
  title: "Insurance Options | JABA Automobiles",
  description:
    "Protect your vehicle with our comprehensive insurance options. Get a quote today and drive with peace of mind.",
}

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#1a1f24] text-white">
      <InsuranceHero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <InsuranceCoverage />
        <InsuranceOptions />
        <InsuranceCalculator />
        <InsuranceProcess />
        <InsuranceFAQ />
        <InsuranceCTA />
      </div>
    </div>
  )
}

