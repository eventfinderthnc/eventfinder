import { db } from "@/server/db";
import * as schema from "@/server/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
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
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});