"use server";

import { headers } from "next/headers";
import { timingSafeEqual } from "crypto";
import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { registrations, users, paymentAttempts } from "@/db/schema";
import { createPaymentSession, generateInvoiceIdExternal } from "./payment";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Naive in-memory per-IP rate limiter.
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

async function findByInvoiceIdAndEmail(invoiceId: string, email: string) {
  if (!invoiceId?.trim() || !email?.trim()) return null;
  const normalized = invoiceId.trim().toUpperCase();

  const [result] = await db
    .select({
      reg: registrations,
      user: users,
    })
    .from(registrations)
    .innerJoin(users, eq(registrations.userId, users.id))
    .where(sql`UPPER(${registrations.invoiceId}) = ${normalized}`)
    .limit(1);

  if (!result) return null;
  if (!emailMatches(result.user.email, email)) return null;
  return result;
}

export async function getPaymentByInvoiceId(invoiceId: string, email: string, recaptchaToken: string) {
  try {
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return { success: false as const, error: "reCAPTCHA validation failed. Please try again." };
    }

    if (!(await rateLimitOk())) {
      return { success: false as const, error: "Too many attempts. Please try again shortly." };
    }

    const result = await findByInvoiceIdAndEmail(invoiceId, email);
    if (!result) {
      return { success: false as const, error: "No payment found for that Invoice ID and email." };
    }
    
    const { reg, user } = result;

    return {
      success: true as const,
      payment: {
        invoiceId: reg.invoiceId || "",
        name: `${user.title} ${user.firstName} ${user.lastName}`,
        registrationCategory: reg.registrationCategory,
        authorType: reg.authorType,
        paperIds: reg.paperIds,
        extraBanquetTickets: reg.extraBanquetTickets,
        amount: reg.amount,
        currency: reg.currency,
        paymentStatus: reg.paymentStatus,
        createdAt: reg.createdAt,
        paidAt: reg.paidAt,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("getPaymentByInvoiceId error:", error);
    return { success: false as const, error: message };
  }
}

export async function resumePayment(invoiceIdInput: string, email: string, recaptchaToken: string) {
  try {
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return { success: false as const, error: "reCAPTCHA validation failed. Please try again." };
    }

    if (!(await rateLimitOk())) {
      return { success: false as const, error: "Too many attempts. Please try again shortly." };
    }

    const result = await findByInvoiceIdAndEmail(invoiceIdInput, email);
    if (!result) {
      return { success: false as const, error: "No payment found for that Invoice ID and email." };
    }
    const { reg, user } = result;
    
    if (reg.paymentStatus === "completed") {
      return { success: false as const, error: "This payment is already completed." };
    }

    const invoiceReq = await generateInvoiceIdExternal({
      studentName: `${user.firstName} ${user.lastName}`.trim(),
      amount: Number(reg.amount),
      description: "MERCon 2026 Registration",
    });

    if (!invoiceReq.success || !invoiceReq.invoice_id) {
      return { success: false as const, error: "Failed to generate invoice ID: " + invoiceReq.error };
    }

    const invoiceId = invoiceReq.invoice_id;
    const customOrderId = invoiceId;

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

    await db.insert(paymentAttempts).values({
      registrationId: reg.id,
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
      orderId: customOrderId,
      successIndicator: ipgResult.success_indicator,
      status: "pending",
    });

    await db
      .update(registrations)
      .set({
        paymentStatus: "pending",
        invoiceId: ipgResult.invoice_id,
      })
      .where(eq(registrations.id, reg.id));

    return {
      success: true as const,
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("resumePayment error:", error);
    return { success: false as const, error: message };
  }
}
