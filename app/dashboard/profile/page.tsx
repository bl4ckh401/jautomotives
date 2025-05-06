import UserProfileForm from "@/components/UserProfileForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Profile | JABA Automobiles",
  description: "Update your profile information and preferences",
}

export default function DashboardProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-muted-foreground mb-8">Update your personal information and preferences</p>
      <UserProfileForm />
    </div>
  )
} 