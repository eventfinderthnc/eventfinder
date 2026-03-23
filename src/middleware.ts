/**
 * Edge auth: session cookie, login/home entry, and onboarding completion.
 * Role checks for app areas live in route-group layouts via `requireRole` (see `src/lib/require-role.ts`).
 */
import { type NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";
import {
	ATTENDEE_LOGIN_PATH,
	defaultHomePathForRole,
	pendingOnboardingPath,
	type SessionUserLike,
} from "@/lib/auth-paths";

const SESSION_COOKIE = "better-auth.session_token";

async function getSessionUser(request: NextRequest): Promise<SessionUserLike | null> {
	const cookieHeader = request.headers.get("cookie");
	if (!cookieHeader) return null;

	const cached = await getCookieCache(request);
	if (cached?.user) {
		return cached.user as SessionUserLike;
	}

	const res = await fetch(new URL("/api/auth/get-session", request.url), {
		headers: { cookie: cookieHeader },
		cache: "no-store",
	});
	if (!res.ok) return null;
	const data = (await res.json()) as { user?: SessionUserLike } | null;
	return data?.user ?? null;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasSession = request.cookies.has(SESSION_COOKIE);
	const loginUrl = new URL(ATTENDEE_LOGIN_PATH, request.url);

	if (pathname === "/auth" && !hasSession) {
		return NextResponse.redirect(loginUrl);
	}

	if (
		pathname.startsWith("/auth/attendee/onboarding") ||
		pathname.startsWith("/auth/organizer/onboarding")
	) {
		if (!hasSession) {
			return NextResponse.redirect(loginUrl);
		}
		return NextResponse.next();
	}

	if (
		pathname.startsWith("/calendar") ||
		pathname.startsWith("/admin") ||
		pathname.startsWith("/create") ||
		pathname.startsWith("/posts")
	) {
		if (!hasSession) {
			return NextResponse.redirect(loginUrl);
		}
	}

	const user = hasSession ? await getSessionUser(request) : null;
	const onboardingTarget = pendingOnboardingPath(user);

	if (pathname === "/") {
		if (!hasSession) {
			return NextResponse.redirect(loginUrl);
		}
		if (onboardingTarget) {
			return NextResponse.redirect(new URL(onboardingTarget, request.url));
		}
		return NextResponse.redirect(new URL(defaultHomePathForRole(user?.role), request.url));
	}

	const isLoginPage =
		pathname === "/auth" ||
		pathname.startsWith("/auth/attendee/login") ||
		pathname.startsWith("/auth/organizer/login");

	if (isLoginPage && hasSession) {
		if (onboardingTarget) {
			return NextResponse.redirect(new URL(onboardingTarget, request.url));
		}
		return NextResponse.redirect(new URL(defaultHomePathForRole(user?.role), request.url));
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
