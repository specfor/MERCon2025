"use server";

import { db } from "@/db";
import { users, pendingRegistrations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { setSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendVerificationEmail } from "@/lib/email";

export async function initiateRegistration(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return { success: false, error: "reCAPTCHA validation failed. Please try again." };
    }

    // Check if user already exists in main verified users table
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return { success: false, error: "An account with this email is already registered." };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate 6-digit OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Upsert into pending_registrations table
    await db
      .insert(pendingRegistrations)
      .values({
        email,
        passwordHash,
        verificationCode,
        expiresAt,
      })
      .onDuplicateKeyUpdate({
        set: {
          passwordHash,
          verificationCode,
          expiresAt,
          updatedAt: new Date(),
        },
      });

    // Send email
    await sendVerificationEmail(email, verificationCode);

    return { success: true, email };
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "An error occurred.";
    return { success: false, error: message };
  }
}

export async function verifyEmailCode(email: string, code: string) {
  try {
    if (!email || !code) {
      return { success: false, error: "Email and verification code are required." };
    }

    const [pending] = await db
      .select()
      .from(pendingRegistrations)
      .where(and(eq(pendingRegistrations.email, email), eq(pendingRegistrations.verificationCode, code)))
      .limit(1);

    if (!pending) {
      return { success: false, error: "Invalid verification code. Please check and try again." };
    }

    if (new Date() > pending.expiresAt) {
      return { success: false, error: "Verification code has expired. Please request a new code." };
    }

    return { success: true, email, code };
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "An error occurred.";
    return { success: false, error: message };
  }
}

export async function completeRegistration(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const verificationCode = formData.get("verificationCode") as string;
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const affiliation = formData.get("affiliation") as string;
    const country = formData.get("country") as string;
    const isLocal = formData.get("isLocal") === "true";

    if (!/^[0-9]+$/.test(phone)) {
      return { success: false, error: "Phone number can contain only numbers." };
    }

    // Re-verify the OTP to ensure security and prevent step bypassing
    const [pending] = await db
      .select()
      .from(pendingRegistrations)
      .where(and(eq(pendingRegistrations.email, email), eq(pendingRegistrations.verificationCode, verificationCode)))
      .limit(1);

    if (!pending || new Date() > pending.expiresAt) {
      return { success: false, error: "Email verification expired or invalid. Please start registration again." };
    }

    // Check if user exists in main table again
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return { success: false, error: "An account with this email is already registered." };
    }

    const [result] = await db.insert(users).values({
      email,
      passwordHash: pending.passwordHash,
      title,
      firstName,
      lastName,
      phone,
      affiliation,
      country,
      isLocal,
    });

    const userId = Number(result.insertId);

    // Delete from pending_registrations
    await db.delete(pendingRegistrations).where(eq(pendingRegistrations.email, email));

    // Create session
    await setSession(userId, email);

    return { success: true };
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "An error occurred.";
    return { success: false, error: message };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return { success: false, error: "reCAPTCHA validation failed. Please try again." };
    }

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
