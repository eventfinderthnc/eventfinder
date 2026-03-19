import type { SQL } from "drizzle-orm";
import { randomUUID } from "crypto";
import { and, asc, desc, ilike, or, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { ErrorCategory, ErrorWithCategory, type ErrorOrNull, PostgreSQLError } from "@/utils/error";
import type { Post, CreatePostRequest } from "@/server/api/dto/post.dto";
import { post } from "@/server/db/post";
import { interestXPost } from "@/server/db/interestXPost";
import { signToken } from "@/server/utils/signedTokens"
import { user } from "@/server/db/auth-schema";
import { userXOrganization } from "@/server/db/userXOrganization";
import { sendMail } from "@/server/utils/mailer";

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
	async create(
		req: CreatePostRequest,
		trx?: typeof db, 
		interestIds?: string[]
	): Promise<[string | null, ErrorOrNull]> {
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
		const postId = res[0]?.id ?? null;
		if (!postId) return [null, new PostgreSQLError()];

		if (interestIds && interestIds.length > 0) {
			const interestRes = await database
				.insert(interestXPost)
				.values(interestIds.map((interestId) => ({
					interestId,
					postId,
				})))
				.catch((e) => {
					console.log(e);
					return new PostgreSQLError();
				});

			if (interestRes instanceof Error) return [null, interestRes];
		}

		await this.sendPostNotification(postId, req.title, req.organizationId)
			.catch((e)=>{
				console.log("Mail send failed: ", e)
			})

		return [postId, null];
	}

	private async sendPostNotification(
		postId: string,
		postTitle: string,
		organizationId: string,
	): Promise<void> {
		const subscribers = await db
			.select({
				email: user.email,
				name: user.name
			})
			.from(userXOrganization)
			.innerJoin(user, eq(userXOrganization.userId, user.id))
			.where(
				and(
					eq(userXOrganization.organizationId, organizationId),
					eq(user.isReceiveMail, true),
				)
			)
		if (subscribers.length === 0) return
		const appBase = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
		await Promise.all(
			subscribers.map((subscriber) =>{
				const token = signToken(postId)
				const claimLink = `${appBase}/api/calendar/claim?token=${token}`

				return sendMail({
					to: subscriber.email,
					subject:`กิจกรรมใหม่: ${postTitle}`,
					text: `มีกิจกรรมใหม่ "${postTitle}" คลิกลิงก์เพื่อเพิ่มลงในปฏิทิน: ${claimLink}`,
					// can add photo (use with useImageUpload)
					// need design
					html: `
						<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
							<h2 style="color: #DE5C8E;">กิจกรรมใหม่!</h2>
							<p>มีกิจกรรมใหม่ <strong>[ชิ่อกิจกรรม]</strong> ที่น่าสนใจสำหรับคุณ</p>
							<a 
								href="https://youtu.be/dQw4w9WgXcQ?si=07yHam1hbe1is-74"
								style="
									display: inline-block;
									background-color: #DE5C8E;
									color: white;
									padding: 12px 24px;
									border-radius: 8px;
									text-decoration: none;
									margin-top: 16px;
								"
							>
								เพิ่มลงในปฏิทิน
							</a>
						</div>
					`
				})
			})
		)
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