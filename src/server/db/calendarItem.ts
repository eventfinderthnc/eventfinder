import { pgTable, timestamp, text } from "drizzle-orm/pg-core";
import { post } from "./post";
import { user } from "./auth-schema";

export const calendarItem = pgTable("calendar_item", {
	id: text("id").primaryKey(),
	postId: text("post_id")
		.references(() => post.id, { onDelete: "cascade" })
		.notNull(),
	userId: text("user_id")
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
