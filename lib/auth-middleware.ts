import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "./firebase-admin";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// Interface for the authenticated request with user information
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    uid: string;
    email: string;
    isAdmin?: boolean;
  };
}

// Middleware to check if the user is authenticated
export async function isAuthenticated(
  req: NextRequest
): Promise<{ isAuthenticated: boolean; user?: any; error?: string }> {
  try {
    const sessionCookie = cookies().get("session")?.value;

    if (!sessionCookie) {
      return { isAuthenticated: false, error: "No session cookie found" };
    }

    // Verify the session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    if (!uid) {
      return { isAuthenticated: false, error: "Invalid session" };
    }

    const user = await adminAuth.getUser(uid);
    return { 
      isAuthenticated: true, 
      user: {
        uid: user.uid,
        email: user.email,
      }
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { isAuthenticated: false, error: "Authentication failed" };
  }
}

// Middleware to check if the user is an admin
export async function isAdmin(
  req: NextRequest
): Promise<{ isAdmin: boolean; user?: any; error?: string }> {
  try {
    const authResult = await isAuthenticated(req);
    
    if (!authResult.isAuthenticated) {
      return { isAdmin: false, error: authResult.error };
    }

    // Check if user is in admins collection
    const adminDoc = await getDoc(doc(db, "admins", authResult.user.uid));
    
    if (!adminDoc.exists() || !adminDoc.data()?.isAdmin) {
      return { isAdmin: false, error: "User is not an admin", user: authResult.user };
    }

    return { 
      isAdmin: true, 
      user: {
        ...authResult.user,
        isAdmin: true,
        permissions: adminDoc.data()?.permissions || []
      }
    };
  } catch (error) {
    console.error("Admin check error:", error);
    return { isAdmin: false, error: "Admin check failed" };
  }
}

// Helper function to create an unauthorized response
export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

// Helper function to create a forbidden response
export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  );
}

// Apply auth middleware to a route handler
export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authResult = await isAuthenticated(req);
    
    if (!authResult.isAuthenticated) {
      return unauthorizedResponse(authResult.error);
    }
    
    // Extend the request with the user info
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.user = authResult.user;
    
    return handler(authenticatedReq);
  };
}

// Apply admin middleware to a route handler
export function withAdmin(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const adminResult = await isAdmin(req);
    
    if (!adminResult.isAdmin) {
      if (!adminResult.user) {
        // Not authenticated
        return unauthorizedResponse(adminResult.error);
      } else {
        // Authenticated but not admin
        return forbiddenResponse(adminResult.error);
      }
    }
    
    // Extend the request with the user info including admin status
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.user = adminResult.user;
    
    return handler(authenticatedReq);
  };
} 