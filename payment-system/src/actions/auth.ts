"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { setSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const affiliation = formData.get("affiliation") as string;
    const country = formData.get("country") as string;
    const isLocal = formData.get("isLocal") === "true";

    // Check if user exists
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.insert(users).values({
      email,
      passwordHash,
      title,
      firstName,
      lastName,
      phone,
      affiliation,
      country,
      isLocal,
    });

    const userId = Number(result.insertId);

    // Create session
    await setSession(userId, email);

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message || "An error occurred during registration." };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    // Create session
    await setSession(user.id, user.email);

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message || "An error occurred during login." };
  }
}

export async function logoutUser() {
  await destroySession();
  redirect("/");
}
