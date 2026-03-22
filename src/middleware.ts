import { type NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

const ORGANIZER_ONBOARDING_PATH = "/auth/organizer/onboarding";
const SESSION_COOKIE = "better-auth.session_token";

type SessionUser = {
	role?: string;
	organizerOnboardingComplete?: boolean;
};

async function organizerNeedsOnboarding(request: NextRequest): Promise<boolean> {
	const cookieHeader = request.headers.get("cookie");
	if (!cookieHeader) return false;

	const cached = await getCookieCache(request);
	if (cached?.user) {
		const u = cached.user as SessionUser;
		if (u.role !== "ORGANIZATION") return false;
		return u.organizerOnboardingComplete !== true;
	}

	const res = await fetch(new URL("/api/auth/get-session", request.url), {
		headers: { cookie: cookieHeader },
		cache: "no-store",
	});
	if (!res.ok) return false;
	const data = (await res.json()) as { user?: SessionUser } | null;
	if (!data?.user) return false;
	if (data.user.role !== "ORGANIZATION") return false;
	return data.user.organizerOnboardingComplete !== true;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasSession = request.cookies.has(SESSION_COOKIE);

	if (pathname.startsWith("/calendar")) {
		if (!hasSession) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (pathname.startsWith("/admin")) {
		if (!hasSession) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (pathname.startsWith("/create")) {
		if (!hasSession) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (
		pathname.startsWith("/auth/attendee/onboarding") ||
		pathname.startsWith("/auth/organizer/onboarding")
	) {
		if (!hasSession) {
			return NextResponse.redirect(new URL("/auth", request.url));
		}
		return NextResponse.next();
	}

	const isLoginPage =
		pathname === "/auth" ||
		pathname.startsWith("/auth/attendee/login") ||
		pathname.startsWith("/auth/organizer/login");

	if (isLoginPage && hasSession) {
		if (await organizerNeedsOnboarding(request)) {
			return NextResponse.redirect(new URL(ORGANIZER_ONBOARDING_PATH, request.url));
		}
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (hasSession && !pathname.startsWith(ORGANIZER_ONBOARDING_PATH)) {
		if (await organizerNeedsOnboarding(request)) {
			return NextResponse.redirect(new URL(ORGANIZER_ONBOARDING_PATH, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
	],
};
