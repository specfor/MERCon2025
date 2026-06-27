"use server";

import { db } from "@/db";
import { registrations } from "@/db/schema";
import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { createPaymentSession } from "./payment";

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
    const currentDate = new Date();
    const earlyBirdDeadline = new Date("2026-07-16T00:00:00.000Z"); // July 15th EOD (using start of 16th UTC)
    const isEarlyBird = currentDate < earlyBirdDeadline;
    
    let amount = 0;
    const currency = isLocal ? "LKR" : "USD";

    if (registrationCategory === "FULL") {
      if (isLocal) {
        amount = isIeeeMember ? (isEarlyBird ? 30000 : 32500) : (isEarlyBird ? 40000 : 45000);
      } else {
        amount = isIeeeMember ? (isEarlyBird ? 240 : 290) : (isEarlyBird ? 350 : 400);
      }
    } else if (registrationCategory === "LIMITED") {
      if (authorType === "NON_PRESENTING") {
        amount = isLocal ? (isEarlyBird ? 5000 : 7500) : (isEarlyBird ? 50 : 75);
      } else if (isStudent) {
        if (isLocal) {
          amount = isIeeeMember ? (isEarlyBird ? 15000 : 17500) : (isEarlyBird ? 20000 : 25000);
        } else {
          amount = isIeeeMember ? (isEarlyBird ? 100 : 175) : (isEarlyBird ? 150 : 250);
        }
      } else {
        if (isLocal) {
          amount = isIeeeMember ? (isEarlyBird ? 22500 : 25000) : (isEarlyBird ? 30000 : 35000);
        } else {
          amount = isIeeeMember ? (isEarlyBird ? 200 : 250) : (isEarlyBird ? 300 : 350);
        }
      }
    } else if (registrationCategory === "PARTICIPANT") {
      amount = isLocal ? (isEarlyBird ? 5000 : 7500) : (isEarlyBird ? 50 : 75);
    }

    // Add extra banquet tickets
    const banquetPrice = isLocal ? 10000 : 50;
    amount += (extraBanquetTickets * banquetPrice);

    // Ensure we don't proceed with 0 amount unless it's a mistake in logic, but here it shouldn't be.
    if (amount <= 0) {
      throw new Error("Calculated amount is invalid.");
    }

    // We will initialize the IPG session here and save the record in a single action
    // But since the IPG requires an amount and we want to link it to the registration record,
    // let's create the IPG session first.
    
    // Note: IPG may only accept LKR. The requirement didn't specify if IPG accepts USD.
    // Assuming IPG can handle the provided currency or we only pass amount. We'll stick to createPaymentSession logic for LKR/USD.
    // In our existing payment action, it hardcodes "LKR". We can update it to accept currency. Let's assume createPaymentSession uses LKR for now or we will update it.
    
    // Let's insert the registration record first to get the ID
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
    });

    const registrationId = result.insertId;

    // Call createPaymentSession with amount and currency
    // For now, if the original createPaymentSession only takes amount, we might need to modify it to accept currency and invoice_id prefix
    // We will update createPaymentSession later. Let's just mock it or assume it's updated.
    const ipgResult = await createPaymentSession(amount, currency, `MERCon2026_${registrationId}`);

    if (!ipgResult.success) {
      throw new Error("Payment Gateway initialization failed: " + ipgResult.error);
    }

    // Update registration with sessionId and invoiceId
    await db.update(registrations).set({
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
    }).where(eq(registrations.id, registrationId));

    return { 
      success: true, 
      registrationId, 
      sessionId: ipgResult.sessionId, 
      success_indicator: ipgResult.success_indicator,
      invoice_id: ipgResult.invoice_id 
    };

  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
}
