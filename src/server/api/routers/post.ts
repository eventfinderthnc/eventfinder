import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { postServiceImpl } from "@/server/api/service/post.service";
import { CreatePostRequestSchema, UpdatePostRequestSchema } from "@/server/api/dto/post.dto";
import { getTRPCError } from "@/utils/error";
import { TRPCError } from "@trpc/server";
import { post } from "@/server/db/post";
import { and, eq } from "drizzle-orm";

const CreatePostWithInterestsSchema = CreatePostRequestSchema.and(
    z.object({
        interestIds: z.array(z.string().uuid()).min(1),
    })
)

export const postRouter = createTRPCRouter({
	create: protectedProcedure
	.input(CreatePostWithInterestsSchema)
	.mutation(async ({ input }) => {
		const { interestIds, ...postData } = input
		const [res, error] = await postServiceImpl.create(postData, undefined, interestIds);
		if (error) return new TRPCError(getTRPCError(error));
		return res;
	}),

	update: protectedProcedure.input(UpdatePostRequestSchema).mutation(async ({ input }) => {
		const res = await postServiceImpl.update(eq(post.id, input.id), input);
		if (res) return new TRPCError(getTRPCError(res));
		return null;
	}),

	getAll: protectedProcedure.query(async () => {
		const [res, error] = await postServiceImpl.getAll();
		if (error) throw new TRPCError(getTRPCError(error));
		return res;
	}),

	getOne: protectedProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const [res, error] = await postServiceImpl.getOne(input.id);
			if (error) throw new TRPCError(getTRPCError(error));
			return res;
		}),

	getBySearch: protectedProcedure
		.input(
			z.object({
				searchQuery: z.string().optional(),
				createdByAsc: z.boolean().default(false),
			})
		)
		.query(async ({ input }) => {
			const [res, error] = await postServiceImpl.getBySearch(input);
			if (error) throw new TRPCError(getTRPCError(error));
			return res;
		}),

	getByFilter: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid().optional(),
				userId: z.string().uuid().optional(), // can add more filter
			})
		)
		.query(async ({ input }) => {
			if (input.id && input.userId) {
				const [res, error] = await postServiceImpl.getByFilter(and(eq(post.id, input.id), eq(post.organizationId, input.userId)));
				if (error) throw new TRPCError(getTRPCError(error));
				return res;
			} else if (input.id) {
				const [res, error] = await postServiceImpl.getByFilter(eq(post.id, input.id));
				if (error) throw new TRPCError(getTRPCError(error));
				return res;
			} else if (input.userId) {
				const [res, error] = await postServiceImpl.getByFilter(eq(post.organizationId, input.userId));
				if (error) throw new TRPCError(getTRPCError(error));
				return res;
			}
		}),

	delete: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
			}),
		)
		.mutation(async ({ input }) => {
			const res = await postServiceImpl.delete(eq(post.id, input.id));
			if (res) return new TRPCError(getTRPCError(res));
			return null;
		}),
});
