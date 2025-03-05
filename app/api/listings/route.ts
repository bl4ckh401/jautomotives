import { NextResponse } from "next/server"
import { addCarListing, getCarListings, updateCarListing, deleteCarListing } from "@/services/carListingService"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const carListing = await req.json()
  const id = await addCarListing({ ...carListing, sellerId: userId })
  return NextResponse.json({ id }, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const filters = Object.fromEntries(searchParams)
  const listings = await getCarListings(filters)
  return NextResponse.json(listings)
}

export async function PUT(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id, ...updates } = await req.json()
  await updateCarListing(id, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await req.json()
  await deleteCarListing(id)
  return NextResponse.json({ success: true })
}

