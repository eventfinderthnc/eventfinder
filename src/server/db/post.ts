import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { activityType } from "./activityType";

export const post = pgTable("post", {
	id: text("id").primaryKey(),
	organizationId: text("organization_id")
		.references(() => organization.id)
		.notNull(),
	activityTypeId: text("activity_type_id")
		.references(() => activityType.id)
		.notNull(),

	title: text("title").notNull(),
	description: text("description"),
	instaLink: text("insta_link"), // nullable for now, but future will be required
	image: text("image").notNull(),

	date: timestamp("date", { withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
