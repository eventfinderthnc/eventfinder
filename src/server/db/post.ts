import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	instaLink: text("insta_link"), // nullable for now, but future will be required
	date: timestamp("date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
