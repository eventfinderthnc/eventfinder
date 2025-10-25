import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { post } from "./post";
import { user } from "./user";

export const calendarItem = pgTable("calendar_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  postId: serial("post_id")
    .references(() => post.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
