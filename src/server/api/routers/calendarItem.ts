import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { calendarItemServiceImpl } from "@/server/api/service/calendarItem.service";
import { CreateCalendarItemRequestSchema, UpdateCalendarItemRequestSchema } from "@/server/api/dto/calendarItem.dto";
import { getTRPCError } from "@/utils/error";
import { TRPCError } from "@trpc/server";
import { calendarItem } from "@/server/db/calendarItem";
import { eq } from "drizzle-orm";

export const calendarItemRouter = createTRPCRouter({
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
