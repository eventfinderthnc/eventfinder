import type { calendarItem } from "@/server/db/calendarItem";
import { z, type ZodSchema } from "zod";

export type CalendarItem = typeof calendarItem.$inferSelect;

export type CreateCalendarItemRequest = Omit<typeof calendarItem.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreateCalendarItemRequestSchema: ZodSchema<CreateCalendarItemRequest> = z.object({
    postId: z.number(),
    userId: z.string(),
});

export const UpdateCalendarItemRequestSchema = z.object({
    id: z.number(),
    postId: z.number().optional(),
    userId: z.string().optional()
});
