import { db } from "@/server/db";
import type { CreateInterestRequest, Interest } from "../dto/interest.dto";
import { ErrorCategory, ErrorWithCategory, PostgreSQLError, type ErrorOrNull } from "@/utils/error";
import type { SQL } from "drizzle-orm";
import { interest } from "@/server/db/interest";

export interface IInterestService {
    create(req: CreateInterestRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]>
    getByFilter(filter?: SQL): Promise<[Interest[] | [], ErrorOrNull]>;
    getOneByFilter(filter: SQL): Promise<[Interest | null, ErrorOrNull]>;
    update(filter: SQL, update: Partial<Interest>, trx?: typeof db): Promise<ErrorOrNull>;
    delete(filter: SQL): Promise<ErrorOrNull>;
}

class InterestService implements IInterestService {
    async create(req: CreateInterestRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]> {
        const database = trx ?? db;
        const res = await database
            .insert(interest)
            .values(req)
            .returning({ id: interest.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            })

        if (res instanceof Error) return [null, res];

        return [res[0]?.id ?? 0, null];
    }

    async getByFilter(filter?: SQL): Promise<[Interest[] | [], ErrorOrNull]> {
        const res = await db.query.interest.findMany({ where: filter }).catch((e) => {
			console.log(e);
			return new PostgreSQLError();
		});

		if (res instanceof Error) return [[], res];
     
		return [res, null];
    }

    async getOneByFilter(filter: SQL): Promise<[Interest | null, ErrorOrNull]> {
        const res = await db.query.interest.findFirst({ where: filter }).catch((e) => {
			console.log(e);
			return new PostgreSQLError();
		});

		if (res instanceof Error) return [null, res];
        if (!res) return [null, new ErrorWithCategory("Post not found", ErrorCategory.ResourceNotFound)];

		return [res, null];
    }

    async update(filter: SQL, update: Partial<Interest>, trx?: typeof db): Promise<ErrorOrNull> {
        const database = trx ?? db;

        const res = await database
            .update(interest)
            .set({ ...update, updatedAt: new Date() })
            .where(filter)
            .returning({ updateId: interest.id })
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return res;
        if (res.length === 0) return new ErrorWithCategory("Interest not found", ErrorCategory.ResourceNotFound)

        return null;
    }

    async delete(filter: SQL): Promise<ErrorOrNull> {
        const res = await db
            .delete(interest)
            .where(filter)
            .catch((e) => {
                console.log(e);
                return new PostgreSQLError();
            });

        if (res instanceof Error) return res;

        return null;
    }
}

export const interestServiceImpl = new InterestService();