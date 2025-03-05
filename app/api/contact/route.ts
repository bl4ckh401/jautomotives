import { NextResponse } from "next/server"
import { addContactRequest, getContactRequests, updateContactRequest } from "@/services/contactService"
import { currentUser } from "@clerk/nextjs"

export async function POST(req: Request) {
  const contactRequest = await req.json()
  const id = await addContactRequest(contactRequest)
  return NextResponse.json({ id }, { status: 201 })
}

export async function GET(req: Request) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const filters = Object.fromEntries(searchParams)
  const requests = await getContactRequests(filters)
  return NextResponse.json(requests)
}

export async function PUT(req: Request) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, ...updates } = await req.json()
  await updateContactRequest(id, updates)
  return NextResponse.json({ success: true })
}

