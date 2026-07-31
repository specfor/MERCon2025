"use server";

import { db } from "@/db";
import { registrations, users, paymentAttempts, settings } from "@/db/schema";
import fs from "fs/promises";
import path from "path";
import { eq, and } from "drizzle-orm";
import { createPaymentSession, generateInvoiceIdExternal } from "./payment";
import { calculateAmount, SYSTEM_CLOSING_DATE } from "@/lib/pricing";
import { getSession } from "@/lib/auth";

export async function getUsdToLkrRate() {
  try {
    const [setting] = await db.select().from(settings).where(eq(settings.key, "usd_to_lkr_rate")).limit(1);
    const rate = setting ? Number(setting.value) : 300;
    return { success: true, rate };
  } catch {
    return { success: true, rate: 300 };
  }
}

export async function submitRegistration(formData: FormData) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      throw new Error("Unauthorized");
    }

    if (new Date() > SYSTEM_CLOSING_DATE) {
      throw new Error("Registration is closed. The system closing date has passed.");
    }

    const userId = session.userId;
    
    // Find an existing pending registration to update, otherwise a new one will be created
    const [existingRegistration] = await db.select().from(registrations)
      .where(and(eq(registrations.userId, userId), eq(registrations.paymentStatus, "pending")))
      .limit(1);
    
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

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    if (ieeeProofFile && ieeeProofFile.size > 0) {
      if (ieeeProofFile.size > MAX_FILE_SIZE) {
        throw new Error("IEEE membership proof document exceeds the maximum limit of 5MB.");
      }
      const arrayBuffer = await ieeeProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(ieeeProofFile.name);
      const filename = `${user.email.replace(/[^a-zA-Z0-9]/g, "_")}_ieee_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      ieeeProofPath = `uploads/proofs/${filename}`;
    }

    if (studentProofFile && studentProofFile.size > 0) {
      if (studentProofFile.size > MAX_FILE_SIZE) {
        throw new Error("Student ID proof document exceeds the maximum limit of 5MB.");
      }
      const arrayBuffer = await studentProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = path.extname(studentProofFile.name);
      const filename = `${user.email.replace(/[^a-zA-Z0-9]/g, "_")}_student_${Date.now()}${ext}`;
      const filepath = path.join(uploadsDir, filename);
      await fs.writeFile(filepath, buffer);
      studentProofPath = `uploads/proofs/${filename}`;
    }

    if (isIeeeMember && !ieeeProofPath) {
      throw new Error("IEEE Member proof document is required.");
    }
    if (isStudent && !studentProofPath) {
      throw new Error("Student ID proof document is required.");
    }

    if (isStudent) {
      const paperList = (paperIds || "").split(/[\s,]+/).filter((id: string) => id.trim() !== "");
      if (paperList.length > 1) {
        throw new Error("A maximum of 1 paper is allowed for student registrations.");
      }
    }

    if (["FULL", "LIMITED"].includes(registrationCategory) && authorType !== "NON_PRESENTING") {
      if (!paperIds || paperIds.trim() === "") {
        throw new Error("At least one Paper ID is required.");
      }
      const paperList = paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== "");
      if (paperList.length > 2) {
        throw new Error("A maximum of 2 papers is allowed per registration.");
      }
    }

    // Pricing Calculation
    const amount = calculateAmount(registrationCategory, authorType, user.isLocal, extraBanquetTickets);
    const currency = user.isLocal ? "LKR" : "USD";

    if (amount <= 0) {
      throw new Error("Calculated amount is invalid.");
    }

    // Currency conversion for USD payments to LKR
    const [rateSetting] = await db.select().from(settings).where(eq(settings.key, "usd_to_lkr_rate")).limit(1);
    const exchangeRateVal = rateSetting ? Number(rateSetting.value) : 300;

    let lkrAmountVal = amount;
    let rateVal = 1;
    if (currency === "USD") {
      rateVal = exchangeRateVal;
      lkrAmountVal = Math.round(amount * rateVal * 100) / 100;
    }

    const invoiceReq = await generateInvoiceIdExternal({
      studentName: `${user.firstName} ${user.lastName}`.trim(),
      amount: lkrAmountVal,
      description: "MERCon 2026 Registration",
    });

    if (!invoiceReq.success || !invoiceReq.invoice_id) {
      throw new Error("Failed to generate invoice ID: " + invoiceReq.error);
    }

    const invoiceId = invoiceReq.invoice_id;
    const customOrderId = invoiceId;

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
        lkrAmount: lkrAmountVal.toString(),
        exchangeRate: rateVal.toString(),
        ieeeProofPath,
        studentProofPath,
        invoiceId,
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
        lkrAmount: lkrAmountVal.toString(),
        exchangeRate: rateVal.toString(),
        ieeeProofPath,
        studentProofPath,
        invoiceId,
      });
      registrationId = Number(result.insertId);
    }

    if (process.env.NODE_ENV === "development") {
      console.log("==== Payment Session Payload ====")
      console.log({
        originalAmount: amount,
        originalCurrency: currency,
        billedAmount: lkrAmountVal,
        billedCurrency: "LKR",
        exchangeRate: rateVal,
        invoiceId,
        orderId: customOrderId,
        studentName: `${user.firstName} ${user.lastName}`.trim(),
        phoneNo: (user.phone || "").trim(),
        address: user.affiliation,
        description: "MERCon 2026 Registration",
      })
    }

    const ipgResult = await createPaymentSession({
      amount: lkrAmountVal,
      currency: "LKR",
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

    // Insert into payment_attempts instead of overwriting registration fields
    await db.insert(paymentAttempts).values({
      registrationId,
      sessionId: ipgResult.sessionId,
      invoiceId: ipgResult.invoice_id,
      orderId: customOrderId,
      successIndicator: ipgResult.success_indicator,
      status: "pending",
    });

    await db.update(registrations).set({
      paymentStatus: "pending",
    }).where(eq(registrations.id, registrationId));

    return {
      success: true,
      registrationId,
      invoiceId,
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
