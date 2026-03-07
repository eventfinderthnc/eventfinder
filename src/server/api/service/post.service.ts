import type { SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { and, asc, desc, ilike, or } from "drizzle-orm";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Post, CreatePostRequest } from "@/server/api/dto/post.dto";
import { post } from "@/server/db/post";

export interface IPostService {
	create(req: CreatePostRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]>;
	getAll(): Promise<[Post[], ErrorOrNull]>;
	getOne(id: string): Promise<[Post | null, ErrorOrNull]>;
	getBySearch(input: {
		searchQuery?: string;
		createdByAsc: boolean;
	}): Promise<[Post[], ErrorOrNull]>;
	getByFilter(filter?: SQL): Promise<[Post[] | [], ErrorOrNull]>;
	getOneByFilter(filter: SQL): Promise<[Post | null, ErrorOrNull]>;
	update(filter: SQL, update: Partial<Post>, trx?: typeof db): Promise<ErrorOrNull>;
	delete(filter: SQL): Promise<ErrorOrNull>;
}

class PostService implements IPostService {
	async create(req: CreatePostRequest, trx?: typeof db): Promise<[string | null, ErrorOrNull]> {
		const database = trx ?? db;
		const id = randomUUID();
		const res = await database
			.insert(post)
			.values({ ...req, id })
			.returning({ id: post.id })
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return [null, res];
		return [res[0]?.id ?? null, null];
	}

	async getAll(): Promise<[Post[], ErrorOrNull]> {
		const res = await db.query.post
			.findMany({
				orderBy: [desc(post.createdAt)],
			})
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return [[], res];
		return [res, null];
	}

	async getOne(id: string): Promise<[Post | null, ErrorOrNull]> {
		const res = await db.query.post
			.findFirst({
				where: (post, { eq }) => eq(post.id, id),
			})
			.catch((e) => {
				console.log(e);
				return new PostgreSQLError();
			});

		if (res instanceof Error) return [null, res];
		if (!res) return [null, new ErrorWithCategory("Post not found", ErrorCategory.ResourceNotFound)];
		return [res, null];
	}
	
	async getBySearch(input: {
		searchQuery?: string;
		createdByAsc: boolean;
	}): Promise<[Post[], ErrorOrNull]> {
		try {
			const conditions = [];

			if (input.searchQuery && input.searchQuery.trim().length > 0) {
				const searchTerm = `%${input.searchQuery.trim()}%`;
				conditions.push(
					or(
						ilike(post.title, searchTerm),
						ilike(post.description, searchTerm)
					)
				);
			}
			const orderBy = input.createdByAsc ? asc(post.createdAt) : desc(post.createdAt);

			const res = await db.query.post.findMany({
				where: conditions.length > 0 ? and(...conditions) : undefined,
				orderBy: [orderBy],
			});

			return [res, null];
		} catch (e) {
			console.log(e);
			return [[], new PostgreSQLError()];
		}
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
