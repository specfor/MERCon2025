import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './src/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from /login and /register and /
  if (['/login', '/register', '/'].includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/'],
}
