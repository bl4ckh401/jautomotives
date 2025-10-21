import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Remove trailing slashes (except for root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }
  
  // Force lowercase URLs
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase()
    return NextResponse.redirect(url, 301)
  }

  // Authorization check
  const authzUrl = process.env.AUTHZ_SERVICE_URL || 'https://authz-backend-production.up.railway.app'
  const authzToken = process.env.AUTHZ_TOKEN

  if (!authzToken) {
    console.error('AUTHZ_TOKEN not configured')
    return NextResponse.rewrite(new URL('/suspended', request.url))
  }

  try {
    const response = await fetch(`${authzUrl}/v1/auth/check`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authzToken}`,
        'X-Original-URI': request.nextUrl.pathname,
        'X-Forwarded-For': request.ip || 'unknown'
      },
      signal: AbortSignal.timeout(1000)
    })

    if (response.status === 403) {
      const htmlContent = await response.text()
      return new NextResponse(htmlContent, {
        status: 403,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'private, no-store, max-age=0'
        }
      })
    }

    if (!response.ok) {
      console.error('AuthZ check failed:', response.status)
      const htmlContent = await response.text()
      return new NextResponse(htmlContent, {
        status: 403,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'private, no-store, max-age=0'
        }
      })
    }

    return NextResponse.next()
  } catch (error) {
    console.error('AuthZ service error:', error)
    return NextResponse.rewrite(new URL('/suspended', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|suspended|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
