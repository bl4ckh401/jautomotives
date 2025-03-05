import SellerDashboard from "@/components/SellerDashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seller Dashboard | JABA Automobiles",
  description: "Manage your vehicle listings and track sales performance",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your listings and track your sales performance</p>
      <SellerDashboard />
    </div>
  )
}

