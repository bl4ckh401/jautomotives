import { NextResponse } from "next/server"
import { addFleetVehicle, getFleetVehicles, updateFleetVehicle, deleteFleetVehicle } from "@/services/fleetService"
import { currentUser } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const vehicle = await req.json()
  const id = await addFleetVehicle(vehicle)
  return NextResponse.json({ id }, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const filters = Object.fromEntries(searchParams)
  const vehicles = await getFleetVehicles(filters)
  return NextResponse.json(vehicles)
}

export async function PUT(req: Request) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, ...updates } = await req.json()
  await updateFleetVehicle(id, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()
  await deleteFleetVehicle(id)
  return NextResponse.json({ success: true })
}

