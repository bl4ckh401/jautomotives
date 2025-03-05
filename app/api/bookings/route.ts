import { NextResponse } from "next/server"
import { addBooking, getBookings, updateBooking, deleteBooking } from "@/services/bookingService"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const booking = await req.json()
  const id = await addBooking({ ...booking, userId })
  return NextResponse.json({ id }, { status: 201 })
}

export async function GET(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const filters = Object.fromEntries(searchParams)
  const bookings = await getBookings({ ...filters, userId })
  return NextResponse.json(bookings)
}

export async function PUT(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id, ...updates } = await req.json()
  await updateBooking(id, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await req.json()
  await deleteBooking(id)
  return NextResponse.json({ success: true })
}

