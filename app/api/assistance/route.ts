import { NextResponse } from "next/server"
import { addAssistanceRequest, getAssistanceRequests, updateAssistanceRequest } from "@/services/assistanceService"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const assistanceRequest = await req.json()
  const id = await addAssistanceRequest({ ...assistanceRequest, userId })
  return NextResponse.json({ id }, { status: 201 })
}

export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const filters = Object.fromEntries(searchParams)

  // If user is not admin, they can only see their own requests
  if (!isAdmin(userId)) {
    filters.userId = userId
  }

  const requests = await getAssistanceRequests(filters)
  return NextResponse.json(requests)
}

export async function PUT(req: Request) {
  const { userId } = await auth()
  if (!userId || !isAdmin(userId)) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id, ...updates } = await req.json()
  await updateAssistanceRequest(id, updates)
  return NextResponse.json({ success: true })
}

// Helper function to check if user is admin (you'll need to implement this)
function isAdmin(userId: string): boolean {
  // Implement your admin check logic here
  return false // Placeholder return
}

