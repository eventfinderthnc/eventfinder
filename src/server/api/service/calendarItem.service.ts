import type { SQL } from "drizzle-orm";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { CalendarItem, CreateCalendarItemRequest } from "@/server/api/dto/calendarItem.dto";
import { calendarItem } from "@/server/db/calendarItem";

export interface ICalendarItemService {
    create(req: CreateCalendarItemRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]>;
    getByFilter(filter?: SQL): Promise<[CalendarItem[] | [], ErrorOrNull]>;
    getOneByFilter(filter: SQL): Promise<[CalendarItem | null, ErrorOrNull]>;
    update(filter: SQL, update: Partial<CalendarItem>, trx?: typeof db): Promise<ErrorOrNull>;
    delete(filter: SQL): Promise<ErrorOrNull>;
}

class CalendarItemService implements ICalendarItemService {
    async create(req: CreateCalendarItemRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]> {
        const database = trx ?? db;
        const res = await database
            .insert(calendarItem)
            .values(req)
            .returning({ id: calendarItem.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return [null, res];
        return [res[0]?.id ?? 0, null];
    }
    async getByFilter(filter?: SQL): Promise<[CalendarItem[], ErrorOrNull]> {
        const res = await db.query.calendarItem.findMany({ where: filter }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [[], res];
        return [res, null];
    }

    async getOneByFilter(filter: SQL): Promise<[CalendarItem | null, ErrorOrNull]> {
        const res = await db.query.calendarItem.findFirst({ where: filter }).catch((e) => {
            console.log(e);
            return new PostgreSQLError();
        });

        if (res instanceof Error) return [null, res];
        if (!res) return [null, new ErrorWithCategory("CalendarItem not found", ErrorCategory.ResourceNotFound)];
        return [res, null];
    }

    async update(filter: SQL, update: Partial<CalendarItem>, trx?: typeof db): Promise<ErrorOrNull> {
        const database = trx ?? db;

        const res = await database
            .update(calendarItem)
            .set({ ...update, updatedAt: new Date() })
            .where(filter)
            .returning({ updatedId: calendarItem.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return res;
        if (res.length === 0) return new ErrorWithCategory("CalendarItem not found", ErrorCategory.ResourceNotFound);
        return null;
    }

    async delete(filter: SQL): Promise<ErrorOrNull> {
        const res = await db
            .delete(calendarItem)
            .where(filter)
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return res;
        return null;
    }
}

export const calendarItemServiceImpl = new CalendarItemService();
