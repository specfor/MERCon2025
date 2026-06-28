"use server";

import { db } from "@/db";
import { registrations } from "@/db/schema";
import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { createPaymentSession } from "./payment";
import { calculateAmount } from "@/lib/pricing";
import { generateReferenceTag } from "@/lib/reference";

export async function submitRegistration(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const affiliation = formData.get("affiliation") as string;
    const country = formData.get("country") as string;
    
    const isLocal = formData.get("isLocal") === "true";
    const registrationCategory = formData.get("registrationCategory") as string;
    const authorType = formData.get("authorType") as string;
    
    const isIeeeMember = formData.get("isIeeeMember") === "true";
    const isStudent = formData.get("isStudent") === "true";
    
    const ieeeMemberNumber = formData.get("ieeeMemberNumber") as string || null;
    const paperIds = formData.get("paperIds") as string || null;
    
    const extraBanquetTickets = parseInt((formData.get("extraBanquetTickets") as string) || "0", 10);
    
    // File uploads
    const ieeeProofFile = formData.get("ieeeProof") as File | null;
    const studentProofFile = formData.get("studentProof") as File | null;
    
    let ieeeProofPath = null;
    let studentProofPath = null;

    const uploadsDir = path.join(process.cwd(), "uploads", "proofs");
    await fs.mkdir(uploadsDir, { recursive: true });

    if (ieeeProofFile && ieeeProofFile.size > 0) {
      const arrayBuffer = await ieeeProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(ieeeProofFile.name);
      const filename = `${email.replace(/[^a-zA-Z0-9]/g, "_")}_ieee_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      ieeeProofPath = `uploads/proofs/${filename}`;
    }

    if (studentProofFile && studentProofFile.size > 0) {
      const arrayBuffer = await studentProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(studentProofFile.name);
      const filename = `${email.replace(/[^a-zA-Z0-9]/g, "_")}_student_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      studentProofPath = `uploads/proofs/${filename}`;
    }

    // Pricing Calculation
    const amount = calculateAmount(registrationCategory, authorType, isLocal, extraBanquetTickets);
    const currency = isLocal ? "LKR" : "USD";

    // Ensure we don't proceed with 0 amount unless it's a mistake in logic, but here it shouldn't be.
    if (amount <= 0) {
      throw new Error("Calculated amount is invalid.");
    }

    // Unguessable lookup tag, issued at submission so the registrant can look up
    // (and resume) the payment later even if it is abandoned.
    const referenceTag = generateReferenceTag();

    // Insert the registration first so we have a numeric id to use as the IPG order id.
    const [result] = await db.insert(registrations).values({
      title,
      firstName,
      lastName,
      email,
      phone,
      affiliation,
      country,
      isLocal,
      registrationCategory,
      authorType,
      isIeeeMember,
      isStudent,
      ieeeMemberNumber,
      paperIds,
      extraBanquetTickets,
      amount: amount.toString(),
      currency,
      ieeeProofPath,
      studentProofPath,
      referenceTag,
    });

    const registrationId = Number(result.insertId);

    // order_id and invoice_id share the numeric registration id so they line up for
    // the IPG verify step (see plan Open item A).
    const invoiceId = `MERCon2026_${registrationId}`;

    const ipgResult = await createPaymentSession({
      amount,
      currency,
      invoiceId,
      orderId: registrationId,
      studentName: `${firstName} ${lastName}`.trim(),
      phoneNo: (phone || "").trim(),
      address: affiliation,
      description: "MERCon 2026 Registration",
    });

    if (!ipgResult.success) {
      throw new Error("Payment Gateway initialization failed: " + ipgResult.error);
    }

    // Persist the session, invoice, order id and success indicator for server-side
    // verification on return.
    await db.update(registrations).set({
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
      orderId: String(ipgResult.order_id),
      successIndicator: ipgResult.success_indicator,
    }).where(eq(registrations.id, registrationId));

    return {
      success: true,
      registrationId,
      referenceTag,
      sessionId: ipgResult.sessionId,
      success_indicator: ipgResult.success_indicator,
      invoice_id: ipgResult.invoice_id,
    };

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Registration error:", error);
    return { success: false, error: message };
  }
}
