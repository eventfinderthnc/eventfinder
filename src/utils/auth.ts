import { env } from "@/env";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			mapProfileToUser: () => ({
				role: "ATTENDEE",
			}),
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
			},
			onboardingComplete: {
				type: "boolean",
				required: false,
				defaultValue: false,
				input: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					const ADMIN_EMAILS = ["cuatclub.chula@gmail.com"];
					const adminEmails = new Set(ADMIN_EMAILS.map((e) => e.toLowerCase()));
					if (user.email && adminEmails.has(user.email.toLowerCase())) {
						await db.update(schema.user).set({ role: "ADMIN" }).where(eq(schema.user.id, user.id));
					}
				},
			},
		},
	},

	advanced: {
		database: {
			generateId: () => crypto.randomUUID(),
		},
	},
});
