import type { post } from "@/server/db/post";
import { z, type ZodSchema } from "zod";

export type Post = typeof post.$inferSelect;

export type CreatePostRequest = Omit<typeof post.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreatePostRequestSchema: ZodSchema<CreatePostRequest> = z.object({
	title: z.string().min(1),
	activityType: z.string(),
	interest: z.array(z.number().int()).min(1), //interestId
	description: z.string().optional(),
	link: z.string(),
	image: z.string().url(),
	date: z.date(),
});

export const UpdatePostRequestSchema = z.object({
	id: z.number(),
	title: z.string().optional(),
	activityType: z.string().optional(),
	interest: z.array(z.number().int()).optional(),
	description: z.string().optional(),
	link: z.string().optional(),
	image: z.string().url().optional(),
	date: z.date().optional(),
});
