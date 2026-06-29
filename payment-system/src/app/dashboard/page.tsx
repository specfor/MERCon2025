import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users, registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  const [registration] = await db.select().from(registrations).where(eq(registrations.userId, session.userId)).limit(1);

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl text-red-600 mb-4">Session Invalid</h2>
          <p className="mb-4">It looks like your user account was deleted (perhaps during a database reset). Please log out and register again.</p>
          <form action={async () => {
            "use server";
            const { destroySession } = await import("@/lib/auth");
            await destroySession();
            const { redirect } = await import("next/navigation");
            redirect("/login");
          }}>
            <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Clear Session & Log Out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <DashboardClient user={user} initialRegistration={registration || null} />
  );
}
