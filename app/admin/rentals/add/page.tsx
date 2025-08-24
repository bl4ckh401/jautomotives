"use client"

import { useAdmin } from "@/contexts/AdminContext"
import RentalVehicleForm from "../../../../components/admin/RentalVehicleForm"

export default function AdminAddRentalPage() {
  const { isAdmin } = useAdmin()

  if (!isAdmin) {
    return <div className="text-sm text-muted-foreground">Admin access required.</div>
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-xl font-semibold">Add Rental Vehicle</h1>
      <RentalVehicleForm />
    </div>
  )
}
