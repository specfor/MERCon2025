"use server";

import { timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { registrations } from "@/db/schema";

// Base URL for the UoM IPG. Defaults to production; set UOM_IPG_BASE to
// "https://pay.uom.lk/api/test/payments" for the CITeS test environment.
const IPG_BASE = process.env.UOM_IPG_BASE || "https://pay.uom.lk/api/payments";

// The IPG perimeter rejects requests from non-browser User-Agents (e.g. the default
// undici/curl UA) with 403 "Access denied", so we send an explicit one. Override with
// UOM_IPG_USER_AGENT if CITeS specifies a different value.
const IPG_USER_AGENT =
  process.env.UOM_IPG_USER_AGENT ||
  "www.vestauth.com";

function ipgHeaders(token: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "User-Agent": IPG_USER_AGENT,
    Authorization: authHeader(token),
  };
}

/**
 * Build the Authorization header value. The CITeS guide only says "Authorization
 * header"; the scheme is configurable in case the division's token is raw rather
 * than Bearer. UOM_IPG_AUTH_SCHEME=none sends the bare token.
 */
function authHeader(token: string): string {
  const scheme = process.env.UOM_IPG_AUTH_SCHEME ?? "Bearer";
  return scheme.toLowerCase() === "none" ? token : `${scheme} ${token}`;
}

/** Length-safe, timing-safe string comparison. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export type CreateSessionParams = {
  amount: number;
  currency: string; // LKR or USD
  invoiceId: string;
  orderId: string;
  studentName: string;
  phoneNo: string;
  nicPassport?: string;
  address?: string;
  description?: string;
};

export async function createPaymentSession(params: CreateSessionParams) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const division = process.env.UOM_IPG_DIVISION || "TEST";
    const token = process.env.UOM_IPG_TOKEN;

    if (!token) {
      throw new Error("Missing UOM_IPG_TOKEN in environment variables.");
    }

    const payload = {
      division,
      studentName: params.studentName,
      phoneNo: params.phoneNo,
      amount: Number(params.amount),
      nicPassport: params.nicPassport || "200323000303",
      address: params.address || "",
      description: params.description || "MERCon 2026 Registration",
      order_id: params.orderId,
      currency: params.currency,
      // Carry the invoice id on the return URL so the return page can verify even
      // without client-side storage (localStorage remains a fallback).
      returnUrl: `${baseUrl}/payment/return?inv=${encodeURIComponent(params.invoiceId)}`,
      cancelUrl: `${baseUrl}/`,
    };

    const res = await fetch(`${IPG_BASE}/createSessionExternal`, {
      method: "POST",
      headers: ipgHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      if (process.env.NODE_ENV === "development") {
        console.error("--- IPG ERROR TRACE ---");
        console.error("Status:", res.status);
        console.error("Response:", errorText);
        console.error("Request Payload:", JSON.stringify(payload, null, 2));
        console.error("Target URL:", `${IPG_BASE}/createSessionExternal`);
        console.error("-----------------------");
      } else {
        console.error(`IPG Error: Status ${res.status}`);
      }
      throw new Error(`Failed to create session: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return {
      success: true as const,
      sessionId: data.sessionId as string,
      success_indicator: data.success_indicator as string,
      invoice_id: params.invoiceId,
      order_id: params.orderId,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("createPaymentSession error:", error);
    return { success: false as const, error: message };
  }
}

/**
 * Verify a payment with the IPG and persist the result on the registration row.
 *
 * Looks the registration up by invoice id (no reliance on client storage),
 * compares the IPG resultIndicator against the stored success_indicator in
 * constant time, then calls the IPG verify endpoint and marks the row paid.
 */
export async function verifyPaymentResult(invoiceId: string, resultIndicator?: string | null) {
  if (process.env.NODE_ENV === "development") {
    console.log("--- IPG REDIRECT RECEIVED ---");
    console.log("Invoice ID:", invoiceId);
    console.log("Result Indicator:", resultIndicator);
  }
  
  try {
    const division = process.env.UOM_IPG_DIVISION || "TEST";
    const token = process.env.UOM_IPG_TOKEN;

    if (!token) {
      throw new Error("Missing UOM_IPG_TOKEN in environment variables.");
    }

    const [reg] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.invoiceId, invoiceId))
      .limit(1);

    if (!reg) {
      return { success: false as const, error: "No registration found for this invoice." };
    }

    // Idempotent: already verified (covers IPG's "already paid" case too).
    if (reg.paymentStatus === "completed") {
      return {
        success: true as const,
        message: "Payment successful",
        referenceTag: reg.referenceTag,
        alreadyPaid: true,
      };
    }

    // Confirm the redirect actually came from a successful IPG session.
    if (
      !reg.successIndicator ||
      !resultIndicator ||
      !safeEqual(resultIndicator, reg.successIndicator)
    ) {
      await db
        .update(registrations)
        .set({ paymentStatus: "failed" })
        .where(eq(registrations.id, reg.id));
      return { success: false as const, error: "Payment was cancelled or could not be verified." };
    }

    if (!reg.sessionId) {
      return { success: false as const, error: "Missing payment session for this registration." };
    }

    const verifyPayload = { division, sessionId: reg.sessionId, invoice_id: invoiceId };
    
    if (process.env.NODE_ENV === "development") {
      console.log("--- IPG VERIFY PAYMENT REQUEST ---");
      console.log("Target URL:", `${IPG_BASE}/verifyPayment`);
      console.log("Payload:", JSON.stringify(verifyPayload, null, 2));
    }

    const res = await fetch(`${IPG_BASE}/verifyPayment`, {
      method: "POST",
      headers: ipgHeaders(token),
      body: JSON.stringify(verifyPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      if (process.env.NODE_ENV === "development") {
        console.error("--- IPG VERIFY PAYMENT ERROR ---");
        console.error("Status:", res.status);
        console.error("Response:", errorText);
        console.error("--------------------------------");
      } else {
        console.error("Failed to verify payment:", res.status);
      }
      await db
        .update(registrations)
        .set({ paymentStatus: "failed" })
        .where(eq(registrations.id, reg.id));
      return { success: false as const, error: `Payment not successful (${res.status}).` };
    }

    const data = await res.json();
    
    if (process.env.NODE_ENV === "development") {
      console.log("--- IPG VERIFY PAYMENT RESPONSE ---");
      console.log("Response:", JSON.stringify(data, null, 2));
    }

    await db
      .update(registrations)
      .set({ paymentStatus: "completed", paidAt: new Date() })
      .where(eq(registrations.id, reg.id));

    return {
      success: true as const,
      message: (data?.message as string) || "Payment successful",
      referenceTag: reg.referenceTag,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("verifyPaymentResult error:", error);
    return { success: false as const, error: message };
  }
}
