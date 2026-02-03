import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { calendarItemServiceImpl } from "@/server/api/service/calendarItem.service";
import { CreateCalendarItemRequestSchema, UpdateCalendarItemRequestSchema } from "@/server/api/dto/calendarItem.dto";
import { getTRPCError } from "@/utils/error";
import { TRPCError } from "@trpc/server";
import { calendarItem } from "@/server/db/calendarItem";
import { and, eq, gte, lte, SQL } from "drizzle-orm";
import { post } from "@/server/db/post";

export const calendarItemRouter = createTRPCRouter({
    getByMonth: protectedProcedure.input(
      z.object({
        userId: z.string(),
        month: z.number().gt(0).lt(13),
        year: z.number().gte(0)
      })
    ).query(async ({ input }) => {
        const startDate = new Date(input.year, input.month - 1, 1);
        const endDate = new Date(input.year, input.month, 0, 23, 59, 59); // day = 0 means the last day of the previous month and we specify 23:59:59 to make it the end of that day.
        const [res, error] = await calendarItemServiceImpl.getByMonth(and(eq(calendarItem.userId, input.userId), gte(post.date, startDate), lte(post.date, endDate)));
        if(error) throw new TRPCError(getTRPCError(error));
        return res;
    }),

    getOneByFilter: protectedProcedure.input(
      z.object({
        userId: z.string()
      })
    ).query(async ({ input }) => {
      const [res, error] = await calendarItemServiceImpl.getOneByFilter(eq(calendarItem.userId, input.userId))
    }),

    getAllByFilter: protectedProcedure.input(
      z.object({
        userId: z.string()
      })
    ).query(async ({ input }) => {
        const [res, error] = await calendarItemServiceImpl.getByFilter(eq(calendarItem.userId, input.userId));
        if(error) throw new TRPCError(getTRPCError(error));
        return res;
    }),

    create: protectedProcedure.input(CreateCalendarItemRequestSchema).mutation(async ({ input }) => {
        const [res, error] = await calendarItemServiceImpl.create(input);
        if (error) return new TRPCError(getTRPCError(error));
        return res;
    }),

    update: protectedProcedure.input(UpdateCalendarItemRequestSchema).mutation(async ({ input }) => {
        const res = await calendarItemServiceImpl.update(eq(calendarItem.id, input.id), input);
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
            const res = await calendarItemServiceImpl.delete(eq(calendarItem.id, input.id));
            if (res) return new TRPCError(getTRPCError(res));
            return null;
        }),
});
