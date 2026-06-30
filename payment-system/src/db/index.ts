import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import { getDatabaseUrl } from "./url";

dotenv.config({ path: ".env.local" });

const poolConnection = mysql.createPool(getDatabaseUrl());
export const db = drizzle(poolConnection, { schema, mode: "default" });
