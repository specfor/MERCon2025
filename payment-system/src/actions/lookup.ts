"use server";

import { headers } from "next/headers";
import { timingSafeEqual } from "crypto";
import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { registrations, users } from "@/db/schema";
import { normalizeTag } from "@/lib/reference";
import { createPaymentSession } from "./payment";

// Naive in-memory per-IP rate limiter. Resets on restart; this is only
// defense-in-depth since the reference tag already carries 128 bits of entropy.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

async function rateLimitOk(): Promise<boolean> {
  const hdrs = await headers();
  const ip = (hdrs.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  rec.count += 1;
  return rec.count <= MAX_ATTEMPTS;
}

function emailMatches(a: string, b: string): boolean {
  const ab = Buffer.from(a.trim().toLowerCase(), "utf8");
  const bb = Buffer.from(b.trim().toLowerCase(), "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

async function findByTagAndEmail(tag: string, email: string) {
  const normalized = normalizeTag(tag || "");
  if (!normalized || !email?.trim()) return null;

  const [result] = await db
    .select({
      reg: registrations,
      user: users,
    })
    .from(registrations)
    .innerJoin(users, eq(registrations.userId, users.id))
    .where(sql`REPLACE(UPPER(${registrations.referenceTag}), '-', '') = ${normalized}`)
    .limit(1);

  if (!result) return null;
  if (!emailMatches(result.user.email, email)) return null;
  return result;
}

export async function getPaymentByReference(tag: string, email: string) {
  try {
    if (!(await rateLimitOk())) {
      return { success: false as const, error: "Too many attempts. Please try again shortly." };
    }

    const result = await findByTagAndEmail(tag, email);
    if (!result) {
      return { success: false as const, error: "No payment found for that reference and email." };
    }
    
    const { reg, user } = result;

    // Return only non-sensitive fields (never proof paths, NIC, session or tokens).
    return {
      success: true as const,
      payment: {
        referenceTag: reg.referenceTag || "",
        name: `${user.title} ${user.firstName} ${user.lastName}`,
        registrationCategory: reg.registrationCategory,
        authorType: reg.authorType,
        paperIds: reg.paperIds,
        extraBanquetTickets: reg.extraBanquetTickets,
        amount: reg.amount,
        currency: reg.currency,
        paymentStatus: reg.paymentStatus,
        invoiceId: reg.invoiceId,
        createdAt: reg.createdAt,
        paidAt: reg.paidAt,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("getPaymentByReference error:", error);
    return { success: false as const, error: message };
  }
}

export async function resumePayment(tag: string, email: string) {
  try {
    if (!(await rateLimitOk())) {
      return { success: false as const, error: "Too many attempts. Please try again shortly." };
    }

    const result = await findByTagAndEmail(tag, email);
    if (!result) {
      return { success: false as const, error: "No payment found for that reference and email." };
    }
    const { reg, user } = result;
    
    if (reg.paymentStatus === "completed") {
      return { success: false as const, error: "This payment is already completed." };
    }

    const date = new Date();
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const paddedRegId = String(reg.id).padStart(5, '0');
    const customOrderId = `2026${yy}${mm}${paddedRegId}`;

    const invoiceId = customOrderId;

    // IPG sessions expire, so create a fresh one to resume payment.
    const ipgResult = await createPaymentSession({
      amount: Number(reg.amount),
      currency: reg.currency,
      invoiceId,
      orderId: customOrderId,
      studentName: `${user.firstName} ${user.lastName}`.trim(),
      phoneNo: (user.phone || "").trim(),
      address: user.affiliation,
      description: "MERCon 2026 Registration",
    });

    if (!ipgResult.success) {
      return { success: false as const, error: "Payment gateway initialization failed: " + ipgResult.error };
    }

    await db
      .update(registrations)
      .set({
        sessionId: ipgResult.sessionId,
        invoiceId: ipgResult.invoice_id,
        orderId: customOrderId,
        successIndicator: ipgResult.success_indicator,
        paymentStatus: "pending",
      })
      .where(eq(registrations.id, reg.id));

    return {
      success: true as const,
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
      referenceTag: reg.referenceTag,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("resumePayment error:", error);
    return { success: false as const, error: message };
  }
}
