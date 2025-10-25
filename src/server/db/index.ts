import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as user from "./user";
import * as faculty from "./faculty";
import * as organization from "./organization";
import * as interest from "./interest";
import * as post from "./post";
import * as calendarItem from "./calendarItem";
import * as userXOrganization from "./userXOrganization";
import * as interestXOrganization from "./interestXOrganization";
import * as interestXUser from "./interestXUser";
import * as interestXPost from "./interestXPost";
import * as relations from "./relations";

const schema = {
  ...user,
  ...faculty,
  ...organization,
  ...interest,
  ...post,
  ...calendarItem,
  ...userXOrganization,
  ...interestXOrganization,
  ...interestXUser,
  ...interestXPost,
  ...relations,
};

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
