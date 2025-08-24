import { getRentalVehicleById } from "@/services/rentalService"
import RentalDetails from "@/components/RentalDetails"
import { notFound } from "next/navigation"

type Props = { params: { id: string } }

export default async function RentalPage({ params }: Props) {
  const rental = await getRentalVehicleById(params.id)
  if (!rental) return notFound()

  return (
    <div className="container py-8">
      <RentalDetails rental={rental} />
    </div>
  )
}
