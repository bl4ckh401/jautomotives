import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  
  // Protect admin routes - only users with admin role can access
  if (isAdminRoute(req)) {
    if ((sessionClaims?.metadata as { role?: string })?.role !== 'admin') {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }

  // Protect dashboard routes - any authenticated user can access
  if (isDashboardRoute(req)) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

// Updated matcher configuration
export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Match API routes
    '/api/:path*'
  ]
};