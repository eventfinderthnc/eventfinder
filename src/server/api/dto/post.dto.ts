import type { post } from "@/server/db/post";
import { z, type ZodSchema } from "zod";

export type Post = typeof post.$inferSelect;

export type CreatePostRequest = Omit<typeof post.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreatePostRequestSchema: ZodSchema<CreatePostRequest> = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	instaLink: z.string(),
	date: z.date(),
});

export const UpdatePostRequestSchema = z.object({
	id: z.number(),
	title: z.string().optional(),
	description: z.string().optional(),
	instaLink: z.string().optional(),
	date: z.date().optional(),
});
