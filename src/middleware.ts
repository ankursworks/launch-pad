import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * Clerk middleware is only active when `NEXT_PUBLIC_AUTH_MODE=clerk`.
 * In mock mode every request is a passthrough — no Clerk env required, no
 * cookie reads, nothing to configure.
 */
const clerk = clerkMiddleware();

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (process.env.NEXT_PUBLIC_AUTH_MODE === 'clerk') {
    return clerk(req, ev);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals + static assets, hit everything else.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
    '/',
  ],
};
