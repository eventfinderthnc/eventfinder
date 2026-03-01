"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NEW_USER_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

export default function AfterGooglePage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const { data: session } = await authClient.getSession();
      if (cancelled) return;
      if (!session?.user) {
        router.replace("/auth/attendee/login");
        return;
      }
      const createdAt = session.user.createdAt;
      const createdTime =
        typeof createdAt === "string"
          ? new Date(createdAt).getTime()
          : createdAt instanceof Date
            ? createdAt.getTime()
            : 0;
      const isNewUser = Date.now() - createdTime < NEW_USER_WINDOW_MS;
      if (isNewUser) {
        router.replace("/auth/attendee/onboarding");
      } else {
        router.replace("/");
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="auth-section auth-bg flex flex-col items-center justify-center gap-4 min-h-[400px]">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
