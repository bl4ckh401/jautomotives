import type React from "react"

export const metadata = {
  title: "Rentals - JABA Automobiles",
}

export default function RentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto mt-16 md:mt-0 lg:mt-0 px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  )
}
