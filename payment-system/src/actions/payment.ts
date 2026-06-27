"use server";

import { headers } from "next/headers";

export async function createPaymentSession(amount: number, currency: string = "LKR", customInvoiceId?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const division = process.env.UOM_IPG_DIVISION || "TEST";
    const token = process.env.UOM_IPG_TOKEN;

    if (!token) {
      throw new Error("Missing UOM_IPG_TOKEN in environment variables.");
    }

    // Generate random order/invoice ids for testing
    const order_id = Math.floor(Math.random() * 1000000000);
    const invoice_id = customInvoiceId || `${division}${Math.floor(Math.random() * 1000000)}`;

    const payload = {
      division,
      studentName: "MERCon Participant",
      phoneNo: "0000000000",
      amount,
      nicPassport: "N/A",
      address: "N/A",
      description: "MERCon 2026 Registration",
      order_id,
      currency,
      returnUrl: `${baseUrl}/payment/return`,
      cancelUrl: `${baseUrl}/`,
      invoice_id,
      invoiceFlag: true,
    };

    const res = await fetch("https://pay.uom.lk/api/payments/createSessionExternal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Assuming Bearer token format
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to create session:", res.status, errorText);
      throw new Error(`Failed to create session: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return {
      success: true,
      sessionId: data.sessionId,
      success_indicator: data.success_indicator,
      invoice_id,
    };
  } catch (error: any) {
    console.error("createPaymentSession error:", error);
    return { success: false, error: error.message };
  }
}

export async function verifyPaymentResult(sessionId: string, invoice_id: string) {
  try {
    const division = process.env.UOM_IPG_DIVISION || "TEST";
    const token = process.env.UOM_IPG_TOKEN;

    if (!token) {
      throw new Error("Missing UOM_IPG_TOKEN in environment variables.");
    }

    const payload = {
      division,
      sessionId,
      invoice_id,
    };

    const res = await fetch("https://pay.uom.lk/api/payments/verifyPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to verify payment:", res.status, errorText);
      throw new Error(`Failed to verify payment: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message,
    };
  } catch (error: any) {
    console.error("verifyPaymentResult error:", error);
    return { success: false, error: error.message };
  }
}
