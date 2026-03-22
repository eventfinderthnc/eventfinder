import { activityType } from "@/server/db/activityType";
import { z, type ZodSchema } from "zod";

export type ActivityType = typeof activityType.$inferSelect;

export type CreateActivityTypeRequest = Omit<typeof activityType.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreateActivityTypeRequestSchema: ZodSchema<CreateActivityTypeRequest> = z.object({
    name: z.string().min(1),
})

export const UpdateActivityTypeRequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).optional(),
})