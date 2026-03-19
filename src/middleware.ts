import { type NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "better-auth.session_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  // Calendar route: must have session (strict role check is in calendar/layout.tsx)
  if (pathname.startsWith("/calendar")) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Admin routes: must have session (strict role check is in admin/layout.tsx)
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Create route: must have session (strict role check is in create/layout.tsx)
  if (pathname.startsWith("/create")) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Onboarding pages: must have session (strict role check is in each onboarding layout.tsx)
  if (
    pathname.startsWith("/auth/attendee/onboarding") ||
    pathname.startsWith("/auth/organizer/onboarding")
  ) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  // Auth/login pages: redirect away if already logged in
  const isLoginPage =
    pathname === "/auth" ||
    pathname.startsWith("/auth/attendee/login") ||
    pathname.startsWith("/auth/organizer/login");

  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calendar/:path*", "/admin/:path*", "/create", "/auth/:path*"],
};
