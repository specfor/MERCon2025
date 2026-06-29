"use server";

import { db } from "@/db";
import { registrations, users } from "@/db/schema";
import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { createPaymentSession } from "./payment";
import { calculateAmount } from "@/lib/pricing";
import { generateReferenceTag } from "@/lib/reference";
import { getSession } from "@/lib/auth";

export async function submitRegistration(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      throw new Error("Unauthorized");
    }

    const userId = session.userId;
    
    // Check if the user already has a registration that is completed
    const [existingRegistration] = await db.select().from(registrations).where(eq(registrations.userId, userId)).limit(1);
    if (existingRegistration && existingRegistration.paymentStatus === "completed") {
      throw new Error("Registration is already completed and cannot be modified.");
    }
    
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
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
    
    let ieeeProofPath = existingRegistration?.ieeeProofPath || null;
    let studentProofPath = existingRegistration?.studentProofPath || null;

    const uploadsDir = path.join(process.cwd(), "uploads", "proofs");
    await fs.mkdir(uploadsDir, { recursive: true });

    if (ieeeProofFile && ieeeProofFile.size > 0) {
      const arrayBuffer = await ieeeProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(ieeeProofFile.name);
      const filename = `${user.email.replace(/[^a-zA-Z0-9]/g, "_")}_ieee_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      ieeeProofPath = `uploads/proofs/${filename}`;
    }

    if (studentProofFile && studentProofFile.size > 0) {
      const arrayBuffer = await studentProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(studentProofFile.name);
      const filename = `${user.email.replace(/[^a-zA-Z0-9]/g, "_")}_student_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      studentProofPath = `uploads/proofs/${filename}`;
    }

    // Pricing Calculation
    const amount = calculateAmount(registrationCategory, authorType, user.isLocal, extraBanquetTickets);
    const currency = user.isLocal ? "LKR" : "USD";

    if (amount <= 0) {
      throw new Error("Calculated amount is invalid.");
    }

    const referenceTag = existingRegistration?.referenceTag || generateReferenceTag();
    let registrationId: number;

    if (existingRegistration) {
      await db.update(registrations).set({
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
      }).where(eq(registrations.id, existingRegistration.id));
      registrationId = existingRegistration.id;
    } else {
      const [result] = await db.insert(registrations).values({
        userId,
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
      registrationId = Number(result.insertId);
    }
  
    // Generate custom order ID: MER{YYMM}{5 digit number}
    const date = new Date();
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const paddedRegId = String(registrationId).padStart(5, '0');
    const customOrderId = `MER${yy}${mm}${paddedRegId}`;

    const invoiceId = customOrderId;

    const ipgResult = await createPaymentSession({
      amount,
      currency,
      invoiceId,
      orderId: customOrderId,
      studentName: `${user.firstName} ${user.lastName}`.trim(),
      phoneNo: (user.phone || "").trim(),
      address: user.affiliation,
      description: "MERCon 2026 Registration",
    });

    if (!ipgResult.success) {
      throw new Error("Payment Gateway initialization failed: " + ipgResult.error);
    }

    await db.update(registrations).set({
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
      orderId: customOrderId,
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
