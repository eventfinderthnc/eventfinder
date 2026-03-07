import type { post } from "@/server/db/post";
import { z, type ZodSchema } from "zod";

export type Post = typeof post.$inferSelect;

export type CreatePostRequest = Omit<typeof post.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const CreatePostRequestSchema: ZodSchema<CreatePostRequest> = z.object({
	title: z.string().min(1),
	organizationId: z.string().uuid(),
	activityTypeId: z.string().uuid(),
	description: z.string().optional(),
	instaLink: z.string().optional(),
	image: z.string().url(),
	date: z.date(),
});

export const UpdatePostRequestSchema = z.object({
	id: z.string().uuid(),
	title: z.string().optional(),
	organizationId: z.string().uuid().optional(),
	activityTypeId: z.string().uuid().optional(),
	description: z.string().optional(),
	instaLink: z.string().optional(),
	image: z.string().url().optional(),
	date: z.date().optional(),
});
