import "dotenv/config";
import { db } from "./index";
import { users, settings } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = process.argv[2];
  
  // Seed default USD to LKR exchange rate if not exists
  const [existingRate] = await db.select().from(settings).where(eq(settings.key, "usd_to_lkr_rate")).limit(1);
  if (!existingRate) {
    console.log("Seeding default usd_to_lkr_rate = 300");
    await db.insert(settings).values({
      key: "usd_to_lkr_rate",
      value: "300",
    });
  } else {
    console.log(`Current usd_to_lkr_rate = ${existingRate.value}`);
  }

  if (!email) {
    console.log("No email provided. To grant admin role to a user, run: npx tsx src/db/seed-admin.ts <email>");
    process.exit(0);
  }

  console.log(`Searching for user with email: ${email}...`);
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) {
    console.error(`User with email "${email}" not found! Please register the user first on the site.`);
    process.exit(1);
  }

  await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
  console.log(`Successfully granted admin role to ${email} (ID: ${user.id})!`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error running seed-admin:", err);
  process.exit(1);
});
