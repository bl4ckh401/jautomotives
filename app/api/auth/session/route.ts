import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

// Session creation (POST)
export async function POST(req: NextRequest) {
  try {
    // Get the ID token from request body
    const { idToken } = await req.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: "No ID token provided" },
        { status: 400 }
      );
    }
    
    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Only process if the token is valid
    if (!decodedToken.uid) {
      return NextResponse.json(
        { error: "Invalid ID token" },
        { status: 401 }
      );
    }
    
    // Create a session cookie (2 weeks expiration)
    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 2 weeks in milliseconds
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    // Set the cookie
    cookies().set("session", sessionCookie, {
      maxAge: expiresIn / 1000, // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

// Session verification (GET)
export async function GET(req: NextRequest) {
  try {
    const sessionCookie = cookies().get("session")?.value;
    
    if (!sessionCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }
    
    try {
      // Verify the session cookie
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      const user = await adminAuth.getUser(decodedClaims.uid);
      
      return NextResponse.json({
        authenticated: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      }, { status: 200 });
    } catch (error) {
      // If verification fails, clear the cookie
      cookies().delete("session");
      
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}

// Session deletion (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    cookies().delete("session");
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    );
  }
} 