import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { organizationServiceImpl } from "@/server/api/service/organization.service";
import { CreateOrganizationRequestSchema, UpdateOrganizationRequestSchema } from "@/server/api/dto/organization.dto";
import { getTRPCError } from "@/utils/error";
import { TRPCError } from "@trpc/server";
import { organization } from "@/server/db/organization";
import { eq } from "drizzle-orm";

export const organizationRouter = createTRPCRouter({
	create: protectedProcedure.input(CreateOrganizationRequestSchema).mutation(async ({ input }) => {
		const [res, error] = await organizationServiceImpl.create(input);
		if (error) return new TRPCError(getTRPCError(error));
		return res;
	}),

	update: protectedProcedure.input(UpdateOrganizationRequestSchema).mutation(async ({ input }) => {
		const res = await organizationServiceImpl.update(eq(organization.id, input.id), input);
		if (res) return new TRPCError(getTRPCError(res));
		return null;
	}),

	delete: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
			}),
		)
		.mutation(async ({ input }) => {
			const res = await organizationServiceImpl.delete(eq(organization.id, input.id));
			if (res) return new TRPCError(getTRPCError(res));
			return null;
		}),

	getOne: publicProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const [res, error] = await organizationServiceImpl.getOneByFilter(eq(organization.id, input.id));
			if (error) return new TRPCError(getTRPCError(error));
			return res;
		}),

	getAll: publicProcedure
		.query(async () => {
			const [res, error] = await organizationServiceImpl.getByFilter();
			if (error) return new TRPCError(getTRPCError(error));
			return res;
		}),
});
