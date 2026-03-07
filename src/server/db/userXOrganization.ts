import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { organization } from "./organization";

export const userXOrganization = pgTable(
  "user_x_organization",
  {
    userId: text("user_id")
      .references(() => user.id)
      .notNull(),
    organizationId: text("organization_id")
      .references(() => organization.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.organizationId] }),
  }),
);
