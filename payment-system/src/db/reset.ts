import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { getDatabaseUrl } from "./url";

dotenv.config({ path: ".env.local" });

async function resetDb() {
  console.log("⏳ Resetting database...");
  const connection = await mysql.createConnection(getDatabaseUrl());
  
  await connection.execute("SET FOREIGN_KEY_CHECKS = 0;");
  await connection.execute("DROP TABLE IF EXISTS payment_attempts;");
  await connection.execute("DROP TABLE IF EXISTS registrations;");
  await connection.execute("DROP TABLE IF EXISTS users;");
  await connection.execute("DROP TABLE IF EXISTS __drizzle_migrations;");
  await connection.execute("SET FOREIGN_KEY_CHECKS = 1;");

  console.log("✅ Database reset complete!");
  await connection.end();
  process.exit(0);
}

resetDb().catch((err) => {
  console.error("❌ Reset failed", err);
  process.exit(1);
});
