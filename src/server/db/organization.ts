import { pgTable, serial, text, boolean, timestamp, pgEnum, jsonb, smallint } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const categoryEnum = pgEnum("category", ["CLUB", "EVENT"]);

export const organization = pgTable("organization", {
	id: serial("id").primaryKey(),
	category: categoryEnum("category").notNull(),
	averageHoursPerWeek: smallint("average_hours_per_week"),
	bio: text("bio"),
	recruitmentPeriod: jsonb("recruitment_period").$type<{
		allYear?: boolean;
		start?: Date;
		end?: Date;
	}>(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
	isBanned: boolean("is_banned").default(false).notNull(),
	socials: jsonb("socials").$type<{
		signUpForm?: string;
		discord: string;
		instagram: string;
	}>(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
