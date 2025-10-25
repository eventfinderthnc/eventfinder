import { pgTable, serial, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user";
import { organization } from "./organization";

export const userXOrganization = pgTable(
  "user_x_organization",
  {
    userId: serial("user_id")
      .references(() => user.id)
      .notNull(),
    organizationId: serial("organization_id")
      .references(() => organization.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.organizationId] }),
  }),
);
