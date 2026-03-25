import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const interest = pgTable("interest", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	icon: text("icon").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
