import { createHmac, timingSafeEqual, randomUUID } from "crypto"

export interface ClaimTokenPayload {
    postId: string,
    nonce: string,
    iat: number,
    exp: number,
}

function base64urlEncode(str: string): string {
    return Buffer.from(str, "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "")
}

function base64urlDecode(str: string): string {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
    return Buffer.from(base64, "base64").toString("utf8")
}

function computeHmac(secret: string, data: string): string {
    return base64urlEncode(
        createHmac("sha256", secret)
            .update(data)
            .digest("base64")
    )
}

function getSecret(): string {
    const secret = process.env.CALENDAR_CLAIM_SECRET
    if(!secret) throw new Error("CALENDAR_CLAIM_SECRET is not defined in .env")
    return secret
}

export function signToken(postId: string): string {
    const secret = getSecret()
    const now = Math.floor(Date.now() / 1000)

    const payload: ClaimTokenPayload = {
        postId,
        nonce: randomUUID(),
        iat: now,
        exp: now + 60*60*24*14, //14 days
    }

    const payloadB64 = base64urlEncode(JSON.stringify(payload))
    const sigB64 = computeHmac(payloadB64, secret)
    
    return `${payloadB64}.${sigB64}`
}

//null means reject
export function verifyToken(token: string): ClaimTokenPayload | null {
    try {
        const secret = getSecret()
        const parts = token.split(".")
        if(parts.length !== 2) return null
        const [payloadB64, sigB64] = parts as [string, string]
        const expectedSig = computeHmac(secret, payloadB64)
        const sigBuffer = Buffer.from(sigB64)
        const expectedBuffer = Buffer.from(expectedSig)

        if(sigBuffer.length !== expectedBuffer.length) return null
        if(!timingSafeEqual(sigBuffer, expectedBuffer)) return null

        const payload = JSON.parse(base64urlDecode(payloadB64)) as ClaimTokenPayload
        const now = Math.floor(Date.now() / 1000)

        if(payload.exp < now) return null
        if(payload.iat > now + 60) return null // I don't know how long should clock skew be

        const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        if(!regexUUID.test(payload.postId) || !regexUUID.test(payload.nonce)) return null

        return payload
    } catch {
        return null
    }
}