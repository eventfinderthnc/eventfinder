import { Resend } from "resend";

// Initialize once at import time
const resend = new Resend(process.env.RESEND_API_KEY!);

export interface SendMailParams {
	to: string | string[];
	subject: string;
	text: string;
	html?: string;
	/**
	 * Attachments:
	 * - `path` for remote files (public URL)
	 * - `content` for base64 or Buffer content
	 * - `filename` is required
	 * - `contentType` (optional) to override MIME type
	 */
	attachments?: Array<{
		filename: string;
		path?: string;
		content?: string | Buffer;
		contentType?: string;
	}>;
}

/**
 * Send an email via Resend.
 * Requires at least `text` or `html`.
 */
export async function sendMail(params: SendMailParams) {
	// ── BUILD MESSAGE ───────────────────────────────
	const payload: Parameters<typeof resend.emails.send>[0] = {
		from: `CUATClub <${process.env.EMAIL_FROM!}>`,
		...params,
	};

	// ── SEND & ERROR HANDLING ────────────────────────
	try {
		const res = await resend.emails.send(payload);
		if (res.error) throw new Error(res.error.message);
	} catch (err) {
		console.error("✉️ Resend error:", err);
		throw new Error("Unable to send email right now. Please try again later.");
	}
}
