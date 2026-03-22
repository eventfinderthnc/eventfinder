import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        onboardingComplete: { type: "boolean" },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
