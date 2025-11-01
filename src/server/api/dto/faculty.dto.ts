import type { faculty } from "@/server/db/faculty";
import { z, type ZodSchema } from "zod";

export type Faculty = typeof faculty.$inferSelect;

export type CreateFacultyRequest = Omit<typeof faculty.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreateFacultyRequestSchema: ZodSchema<CreateFacultyRequest> = z.object({
  name: z.string().min(1).max(80),
});

export const UpdateFacultyRequestSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
})
// name is optional because we can find it based on id