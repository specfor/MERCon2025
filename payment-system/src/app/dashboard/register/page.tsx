import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users, registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import DashboardClient from "../DashboardClient";
import { redirect } from "next/navigation";

export default async function RegisterDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  const userRegistrations = await db.select().from(registrations)
    .where(eq(registrations.userId, session.userId))
    .orderBy(registrations.createdAt);

  if (!user) {
    redirect("/dashboard");
  }

  return (
    <DashboardClient user={user} registrations={userRegistrations} mode="register" />
  );
}
