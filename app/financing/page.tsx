import type { Metadata } from "next"
import FinancingHero from "@/components/financing/financing-hero"
import FinancingOptions from "@/components/financing/financing-options"
import LoanCalculator from "@/components/financing/loan-calculator"
import FinancingComparison from "@/components/financing/financing-comparison"
import EligibilityProcess from "@/components/financing/eligibility-process"
import FinancingFAQ from "@/components/financing/financing-faq"
import FinancingCTA from "@/components/financing/financing-cta"

export const metadata: Metadata = {
  title: "Financing Options | JABA Automobiles",
  description:
    "Explore our flexible financing options to help you purchase your dream vehicle. Calculate payments, compare rates, and apply online.",
}

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-[#1a1f24] text-white">
      <FinancingHero />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <FinancingOptions />
        <LoanCalculator />
        <FinancingComparison />
        <EligibilityProcess />
        <FinancingFAQ />
        <FinancingCTA />
      </div>
    </div>
  )
}

