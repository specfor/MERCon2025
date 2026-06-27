import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { getDatabaseUrl } from "./url";

dotenv.config({ path: ".env.local" });

async function runMigrations() {
  console.log("⏳ Running migrations...");

  // Check if drizzle folder exists and has migrations
  const migrationsFolder = path.join(process.cwd(), "drizzle");
  if (!fs.existsSync(migrationsFolder)) {
    console.log("⚠️ No migrations folder found, skipping migrations.");
    process.exit(0);
  }

  const connection = await mysql.createConnection(getDatabaseUrl());
  const db = drizzle(connection);

  await migrate(db, { migrationsFolder });
  
  console.log("✅ Migrations complete!");
  await connection.end();
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("❌ Migration failed", err);
  process.exit(1);
});
