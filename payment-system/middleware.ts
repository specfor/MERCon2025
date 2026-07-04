import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET_KEY || "super-secret-key-for-mercon-2026-payment-system-change-me";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  let session = null;
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });
      session = payload;
    } catch (e) {
      session = null;
    }
  }

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (session.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/users', request.url));
    }
  }

  // Redirect authenticated users away from /register, /reset-password, and /
  if (['/register', '/reset-password', '/'].includes(request.nextUrl.pathname)) {
    if (session) {
      if (session.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/users', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/register', '/reset-password', '/'],
};

