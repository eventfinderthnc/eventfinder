import { pgTable, serial, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import { faculty } from "./faculty";

export const userTypeEnum = pgEnum("user_type", [
  "ATTENDEE",
  "ORGANIZATION",
  "ADMIN",
]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  facultyId: serial("faculty_id").references(() => faculty.id),
  isReceiveMail: boolean("is_receive_mail").default(false).notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  type: userTypeEnum("type").notNull(),
});
