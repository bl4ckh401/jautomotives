// app/api/admin/init/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { setUserAsAdmin } from "@/lib/admin";

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (process.env.ALLOW_ADMIN_INIT !== "true" && process.env.NODE_ENV !== "development") {
      return new NextResponse("Admin initialization not allowed", { status: 403 });
    }

    await setUserAsAdmin(userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error initializing admin:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}