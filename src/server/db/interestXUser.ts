import { pgTable, serial, primaryKey } from "drizzle-orm/pg-core";
import { interest } from "./interest";
import { user } from "./auth-schema";

export const interestXUser = pgTable(
  "interest_x_user",
  {
    interestId: serial("interest_id")
      .references(() => interest.id)
      .notNull(),
    userId: serial("user_id")
      .references(() => user.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.interestId, table.userId] }),
  }),
);
