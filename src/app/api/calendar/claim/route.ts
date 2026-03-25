import { NextRequest, NextResponse } from "next/server"
import { env } from "@/env"
import { verifyToken } from "@/server/utils/signedTokens"
import { auth } from "@/utils/auth"
import { calendarItemServiceImpl } from "@/server/api/service/calendarItem.service"
import { calendarItem } from "@/server/db/calendarItem"
import { and, eq, type SQL } from "drizzle-orm"

export async function GET(req: NextRequest) {
    const appBase = env.BETTER_AUTH_URL.replace(/\/$/, "")
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")
    
    //check case
    //1. no token
    if(!token){
        return NextResponse.redirect(`${appBase}/calendar?error=missing_token`)
    }
    //2. check auth
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session?.user?.id){
        const callbackUrl = encodeURIComponent(`/api/calendar/claim?token=${token}`)
        return NextResponse.redirect(`${appBase}/auth/attendee/login?callbackUrl=${callbackUrl}`)
    }
    //3. validate token
    const payload = verifyToken(token)
    if(!payload){
        return NextResponse.redirect(`${appBase}/calendar?error=invalid_token`)
    }
    //4. idempotency — skip create if this user already claimed this post
    const filter = and(
        eq(calendarItem.userId, session.user.id),
        eq(calendarItem.postId, payload.postId),
    ) as SQL
    const [existing, existingErr] = await calendarItemServiceImpl.getOneByFilter(filter)
    if (existingErr) {
        return NextResponse.redirect(`${appBase}/calendar?error=lookup_failed`)
    }
    if (!existing) {
        const [, error] = await calendarItemServiceImpl.create({
            userId: session.user.id,
            postId: payload.postId,
        })

        if (error) {
            //treat unique and duplicate error as success(not shown as error)
            const isDuplicate = error.message.includes("unique") || error.message.includes("duplicate")
            if(!isDuplicate){
                return NextResponse.redirect(`${appBase}/calendar?error=create_failed`)
            }
        }
    }

    return NextResponse.redirect(
        `${appBase}/calendar?claimed=1&postId=${payload.postId}`
    )
}