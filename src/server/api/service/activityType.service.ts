import type { SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { ActivityType, CreateActivityTypeRequest } from "@/server/api/dto/activityType.dto";
import { activityType } from "@/server/db/activityType";

export interface IActivityTypeService {
	create(req: CreateActivityTypeRequest): Promise<[string | null, ErrorOrNull]>;
	getByFilter(filter?: SQL): Promise<[ActivityType[], ErrorOrNull]>;
	update(filter: SQL, update: Partial<ActivityType>): Promise<ErrorOrNull>;
	delete(filter: SQL): Promise<ErrorOrNull>;
}

class ActivityTypeService implements IActivityTypeService {
	async create(req: CreateActivityTypeRequest): Promise<[string | null, ErrorOrNull]> {
		const id = randomUUID();
		const res = await db
			.insert(activityType)
			.values({ ...req, id })
			.returning({ id: activityType.id })
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return [null, res];
		return [res[0]?.id ?? null, null];
	}

	async getByFilter(filter?: SQL): Promise<[ActivityType[], ErrorOrNull]> {
		const res = await db.query.activityType.findMany({ where: filter }).catch((e) => {
			console.log(e);
			return new PostgreSQLError();
		});

		if (res instanceof Error) return [[], res];
		return [res, null];
	}

	async update(filter: SQL, update: Partial<ActivityType>): Promise<ErrorOrNull> {
		const res = await db
			.update(activityType)
			.set({ ...update, updatedAt: new Date() })
			.where(filter)
			.returning({ updatedId: activityType.id })
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return res;
		if (res.length === 0) return new ErrorWithCategory("ActivityType not found", ErrorCategory.ResourceNotFound);
		return null;
	}

	async delete(filter: SQL): Promise<ErrorOrNull> {
		const res = await db
			.delete(activityType)
			.where(filter)
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return res;
		return null;
	}
}

export const activityTypeServiceImpl = new ActivityTypeService();
