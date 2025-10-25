import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { postServiceImpl } from "@/server/api/service/post.service";
import { CreatePostRequestSchema, UpdatePostRequestSchema } from "@/server/api/dto/post.dto";
import { getTRPCError } from "@/utils/error";
import { TRPCError } from "@trpc/server";
import { post } from "@/server/db/post";
import { eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
	create: protectedProcedure.input(CreatePostRequestSchema).mutation(async ({ input }) => {
		const [res, error] = await postServiceImpl.create(input);
		if (error) return new TRPCError(getTRPCError(error));
		return res;
	}),

	update: protectedProcedure.input(UpdatePostRequestSchema).mutation(async ({ input }) => {
		const res = await postServiceImpl.update(eq(post.id, input.id), input);
		if (res) return new TRPCError(getTRPCError(res));
		return null;
	}),

	delete: protectedProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ input }) => {
			const res = await postServiceImpl.delete(eq(post.id, input.id));
			if (res) return new TRPCError(getTRPCError(res));
			return null;
		}),
});
