import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET_KEY || "super-secret-key-for-mercon-2026-payment-system-change-me";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  let session = null;
  console.log("[Middleware] Path:", request.nextUrl.pathname, "Cookie present:", !!sessionCookie);
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });
      session = payload;
      console.log("[Middleware] Decrypted session:", !!session);
    } catch (e) {
      console.error("[Middleware] Decrypt error:", e);
      session = null;
    }
  }

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
