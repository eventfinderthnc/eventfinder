import type { calendarItem } from "@/server/db/calendarItem";
import { z, type ZodSchema } from "zod";

export type CalendarItem = typeof calendarItem.$inferSelect;

export type CreateCalendarItemRequest = Omit<typeof calendarItem.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreateCalendarItemRequestSchema: ZodSchema<CreateCalendarItemRequest> = z.object({
    postId: z.string().uuid(),
    userId: z.string().uuid(),
});

export const UpdateCalendarItemRequestSchema = z.object({
    id: z.string().uuid(),
    postId: z.string().uuid().optional(),
    userId: z.string().uuid().optional()
});