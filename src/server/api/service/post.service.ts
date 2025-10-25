import type { SQL } from "drizzle-orm";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Post, CreatePostRequest } from "@/server/api/dto/post.dto";
import { post } from "@/server/db/post";

export interface IPostService {
	create(req: CreatePostRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]>;
	getByFilter(filter?: SQL): Promise<[Post[] | [], ErrorOrNull]>;
	getOneByFilter(filter: SQL): Promise<[Post | null, ErrorOrNull]>;
	update(filter: SQL, update: Partial<Post>, trx?: typeof db): Promise<ErrorOrNull>;
	delete(filter: SQL): Promise<ErrorOrNull>;
}

class PostService implements IPostService {
	async create(req: CreatePostRequest, trx?: typeof db): Promise<[number | null, ErrorOrNull]> {
		const database = trx ?? db;
		const res = await database
			.insert(post)
			.values(req)
			.returning({ id: post.id })
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return [null, res];
		return [res[0]?.id ?? 0, null];
	}
	async getByFilter(filter?: SQL): Promise<[Post[], ErrorOrNull]> {
		const res = await db.query.post.findMany({ where: filter }).catch((e) => {
			console.log(e);
			return new PostgreSQLError();
		});

		if (res instanceof Error) return [[], res];
		return [res, null];
	}

	async getOneByFilter(filter: SQL): Promise<[Post | null, ErrorOrNull]> {
		const res = await db.query.post.findFirst({ where: filter }).catch((e) => {
			console.log(e);
			return new PostgreSQLError();
		});

		if (res instanceof Error) return [null, res];
		if (!res) return [null, new ErrorWithCategory("Post not found", ErrorCategory.ResourceNotFound)];
		return [res, null];
	}

	async update(filter: SQL, update: Partial<Post>, trx?: typeof db): Promise<ErrorOrNull> {
		const database = trx ?? db;

		const res = await database
			.update(post)
			.set({ ...update, updatedAt: new Date() })
			.where(filter)
			.returning({ updatedId: post.id })
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return res;
		if (res.length === 0) return new ErrorWithCategory("Post not found", ErrorCategory.ResourceNotFound);
		return null;
	}

	async delete(filter: SQL): Promise<ErrorOrNull> {
		const res = await db
			.delete(post)
			.where(filter)
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return res;
		return null;
	}
}

export const postServiceImpl = new PostService();
