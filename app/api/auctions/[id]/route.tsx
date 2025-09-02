import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { isAuthenticated, withAdmin } from "@/lib/auth-middleware";

// GET /api/auctions/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const adminDb = getFirestore();
    const doc = await adminDb.collection("auctions").doc(id).get();
    if (!doc.exists) return NextResponse.json({ error: "Auction not found" }, { status: 404 });
    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 });
  } catch (error: any) {
    console.error("Error getting auction:", error);
    return NextResponse.json({ error: error.message || "Failed to get auction" }, { status: 500 });
  }
}

// POST /api/auctions/:id/bid
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Place a bid (requires auth)
  const auth = await isAuthenticated(req as any);
  if (!auth.isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = params;
    const body = await req.json();
    const amount = body.amount;
    const adminDb = getFirestore();

    // Basic validation
    if (!amount) return NextResponse.json({ error: "Missing bid amount" }, { status: 400 });

    const bid = {
      auctionId: id,
      bidderId: auth.user.uid,
      amount,
      createdAt: new Date().toISOString(),
    };

    const bidRef = await adminDb.collection("auctionBids").add(bid);

    return NextResponse.json({ id: bidRef.id, ...bid }, { status: 201 });
  } catch (error: any) {
    console.error("Error placing bid:", error);
    return NextResponse.json({ error: error.message || "Failed to place bid" }, { status: 500 });
  }
}

// POST /api/auctions/:id/close - admin only
export const PATCH = withAdmin(async (req: any) => {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    const body = await req.json();
    const adminDb = getFirestore();

    // Update auction status to closed and record winner if provided
    const updateData: any = { status: body.status || "closed", updatedAt: new Date().toISOString() };
    if (body.winnerId) updateData.winnerId = body.winnerId;

    await adminDb.collection("auctions").doc(id).update(updateData);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error closing auction:", error);
    return NextResponse.json({ error: error.message || "Failed to close auction" }, { status: 500 });
  }
});
