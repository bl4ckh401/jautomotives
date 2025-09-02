import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { adminAuth } from "@/lib/firebase-admin";
import { isAuthenticated } from "@/lib/auth-middleware";

// POST /api/auctions - create auction
export async function POST(req: NextRequest) {
  const auth = await isAuthenticated(req as any);
  if (!auth.isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const adminDb = getFirestore();

    const auction = {
      ...body,
      status: body.status || "scheduled",
      createdBy: auth.user.uid,
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("auctions").add(auction);

    return NextResponse.json({ id: docRef.id, ...auction }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating auction:", error);
    return NextResponse.json({ error: error.message || "Failed to create auction" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const adminDb = getFirestore();
    const snaps = await adminDb.collection("auctions").orderBy("createdAt", "desc").get();
    const auctions = snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(auctions, { status: 200 });
  } catch (error: any) {
    console.error("Error listing auctions:", error);
    return NextResponse.json({ error: error.message || "Failed to list auctions" }, { status: 500 });
  }
}
