import { TRPCError } from "@trpc/server";
import { CreateUserRequestSchema, UpdateUserRequestSchema } from "../dto/user.dto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getTRPCError } from "@/utils/error";
import { user } from "@/server/db/auth-schema";
import z from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { userServiceImpl } from "@/server/api/service/user.service";
import { db } from "@/server/db";
import { interestXUser } from "@/server/db/interestXUser";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const record = await db.query.user.findFirst({
      where: eq(user.id, userId),
      with: {
        faculty: true,
        interests: {
          with: {
            interest: true,
          },
        },
      },
    });

    if (!record) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return {
      id: record.id,
      name: record.name,
      image: record.image,
      facultyId: record.facultyId,
      isReceiveMail: record.isReceiveMail,
      interests: record.interests.map((i) => i.interestId),
    };
  }),

  updateOnboardingInfo: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        image: z.string().optional(),
        facultyId: z.number().optional(),
        isReceiveMail: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const res = await userServiceImpl.update(eq(user.id, userId), input);
      if (res) return new TRPCError(getTRPCError(res));
      return null;
    }),

  updateInterests: protectedProcedure
    .input(
      z.object({
        interests: z.array(z.number()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await db.transaction(async (tx) => {
        await tx
          .delete(interestXUser)
          .where(eq(interestXUser.userId, userId));

        if (input.interests.length > 0) {
          await tx.insert(interestXUser).values(
            input.interests.map((interestId) => ({
              userId,
              interestId,
            })),
          );
        }
      });

      return null;
    }),

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
});
