import { type NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

const ATTENDEE_ONBOARDING_PATH = "/auth/attendee/onboarding";
const ORGANIZER_ONBOARDING_PATH = "/auth/organizer/onboarding";
const SESSION_COOKIE = "better-auth.session_token";

type SessionUser = {
	role?: string;
	onboardingComplete?: boolean;
};

async function getSessionUser(request: NextRequest): Promise<SessionUser | null> {
	const cookieHeader = request.headers.get("cookie");
	if (!cookieHeader) return null;

	const cached = await getCookieCache(request);
	if (cached?.user) {
		return cached.user as SessionUser;
	}

	const res = await fetch(new URL("/api/auth/get-session", request.url), {
		headers: { cookie: cookieHeader },
		cache: "no-store",
	});
	if (!res.ok) return null;
	const data = (await res.json()) as { user?: SessionUser } | null;
	return data?.user ?? null;
}

/** Where this user must be if onboarding is not finished; null = no redirect. */
function pendingOnboardingPath(user: SessionUser | null): string | null {
	if (!user?.role) return null;
	if (user.role !== "ORGANIZATION" && user.role !== "ATTENDEE") return null;
	if (user.onboardingComplete === true) return null;
	return user.role === "ORGANIZATION" ? ORGANIZER_ONBOARDING_PATH : ATTENDEE_ONBOARDING_PATH;
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

	const user = hasSession ? await getSessionUser(request) : null;
	const onboardingTarget = pendingOnboardingPath(user);

	const isLoginPage =
		pathname === "/auth" ||
		pathname.startsWith("/auth/attendee/login") ||
		pathname.startsWith("/auth/organizer/login");

	if (isLoginPage && hasSession) {
		if (onboardingTarget) {
			return NextResponse.redirect(new URL(onboardingTarget, request.url));
		}
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (hasSession && onboardingTarget && !pathname.startsWith(onboardingTarget)) {
		return NextResponse.redirect(new URL(onboardingTarget, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
	],
};
