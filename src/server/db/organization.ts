import { pgTable, text, boolean, timestamp, pgEnum, jsonb, smallint } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { faculty } from "./faculty";

export const categoryEnum = pgEnum("category", ["CLUB", "EVENT"]);

export const organization = pgTable("organization", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	facultyId: text("faculty_id").references(() => faculty.id),
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
	image: text("image"),
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
