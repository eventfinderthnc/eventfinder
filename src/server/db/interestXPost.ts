import { pgTable, serial, primaryKey } from "drizzle-orm/pg-core";
import { interest } from "./interest";
import { post } from "./post";

export const interestXPost = pgTable(
  "interest_x_post",
  {
    interestId: serial("interest_id")
      .references(() => interest.id)
      .notNull(),
    postId: serial("post_id")
      .references(() => post.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.interestId, table.postId] }),
  }),
);
