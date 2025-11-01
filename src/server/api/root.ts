import { postRouter } from "@/server/api/routers/post";
import { interestRouter } from "./routers/interest";
import { calendarItemRouter } from "@/server/api/routers/calendarItem";
import { organizationRouter } from "@/server/api/routers/organization";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  interest: interestRouter,
  calendarItem: calendarItemRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
