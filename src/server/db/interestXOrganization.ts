import { pgTable, serial, primaryKey } from "drizzle-orm/pg-core";
import { interest } from "./interest";
import { organization } from "./organization";

export const interestXOrganization = pgTable(
  "interest_x_organization",
  {
    interestId: serial("interest_id")
      .references(() => interest.id)
      .notNull(),
    organizationId: serial("organization_id")
      .references(() => organization.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.interestId, table.organizationId] }),
  }),
);
