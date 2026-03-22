import type { interestXPost } from "@/server/db/interestXPost";
import { z, type ZodSchema } from "zod";

export type InterestXPost = typeof interestXPost.$inferSelect;

export type CreateInterestXPostRequest = typeof interestXPost.$inferInsert;

export const CreateInterestXPostRequestSchema: ZodSchema<CreateInterestXPostRequest> = z.object({
  interestId: z.string().uuid(),
  postId: z.string().uuid(),
});

export const UpdateInterestXPostRequestSchema = z.object({
  interestId: z.string().uuid(),
  postId: z.string().uuid(),
  newInterestId: z.string().uuid().optional(),
  newPostId: z.string().uuid().optional(),
});
