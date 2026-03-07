import type { interest } from "@/server/db/interest";
import { z, type ZodSchema } from "zod";

export type Interest = typeof interest.$inferSelect;

export type CreateInterestRequest = Omit<
  typeof interest.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;

export const CreateInterestRequestSchema: ZodSchema<CreateInterestRequest> =
  z.object({
    name: z.string().min(1),
    icon: z.string().min(1),
  });

export const UpdateInterestRequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
});
