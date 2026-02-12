import { TRPCError } from "@trpc/server";
import { CreateUserRequestSchema, UpdateUserRequestSchema } from "../dto/user.dto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getTRPCError } from "@/utils/error";
import { user } from "@/server/db/auth-schema"
import z from "zod";
import { eq } from "drizzle-orm";
import { userServiceImpl } from "@/server/api/service/user.service";

export const userRouter = createTRPCRouter({
    
    update: protectedProcedure.input(UpdateUserRequestSchema).mutation(async ({ input }) => {
        const res = await userServiceImpl.update(eq(user.id, input.id), input);
        if (res) return new TRPCError(getTRPCError(res));
        return null;
    }),

    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        const res = await userServiceImpl.delete(eq(user.id, input.id));
        if (res) return new TRPCError(getTRPCError(res));
        return null;
    }),
})
