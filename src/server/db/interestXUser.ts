import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { interest } from "./interest";
import { user } from "./auth-schema";

export const interestXUser = pgTable(
	"interest_x_user",
	{
		interestId: text("interest_id")
			.references(() => interest.id)
			.notNull(),
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.interestId, table.userId] }),
	}),
);
