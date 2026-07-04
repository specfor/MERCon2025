"use server";

import { db } from "@/db";
import { users, registrations, paymentAttempts, adminLogs, settings, passwordResets } from "@/db/schema";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/email";
import { eq, desc, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function verifyAdminSession() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized: Administrator privileges required.");
  }
  return session;
}

export async function getAdminUsers() {
  await verifyAdminSession();

  try {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    const allRegs = await db.select().from(registrations);

    const regMap = new Map();
    for (const r of allRegs) {
      regMap.set(r.userId, r);
    }

    const result = allUsers.map((u) => {
      const reg = regMap.get(u.id);
      return {
        id: u.id,
        email: u.email,
        title: u.title,
        firstName: u.firstName,
        lastName: u.lastName,
        affiliation: u.affiliation,
        country: u.country,
        role: u.role || "user",
        createdAt: u.createdAt,
        registrationCategory: reg?.registrationCategory || "Unregistered",
        authorType: reg?.authorType || "N/A",
        amount: reg?.amount || null,
        currency: reg?.currency || "USD",
        lkrAmount: reg?.lkrAmount || null,
        paymentStatus: reg?.paymentStatus || "pending",
        refundStatus: reg?.refundStatus || "none",
        registrationId: reg?.id || null,
      };
    });

    return { success: true, users: result };
  } catch (error: any) {
    console.error("getAdminUsers error:", error);
    return { success: false, error: error.message || "Failed to fetch users." };
  }
}

export async function getUserDetails(userId: number) {
  await verifyAdminSession();

  try {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      return { success: false, error: "User not found." };
    }

    const [registration] = await db.select().from(registrations).where(eq(registrations.userId, userId)).limit(1);
    
    let attempts: any[] = [];
    if (registration) {
      attempts = await db
        .select()
        .from(paymentAttempts)
        .where(eq(paymentAttempts.registrationId, registration.id))
        .orderBy(desc(paymentAttempts.createdAt));
    }

    // If user is an admin, fetch actions they have performed
    let adminPerformedLogs: any[] = [];
    if (user.role === "admin") {
      adminPerformedLogs = await db
        .select()
        .from(adminLogs)
        .where(eq(adminLogs.adminId, user.id))
        .orderBy(desc(adminLogs.createdAt));
    }

    // Fetch actions performed ON this user
    const targetLogs = await db
      .select()
      .from(adminLogs)
      .where(eq(adminLogs.targetId, String(user.id)))
      .orderBy(desc(adminLogs.createdAt));

    return {
      success: true,
      data: {
        user,
        registration: registration || null,
        paymentAttempts: attempts,
        adminPerformedLogs,
        targetLogs,
      },
    };
  } catch (error: any) {
    console.error("getUserDetails error:", error);
    return { success: false, error: error.message || "Failed to fetch user details." };
  }
}

export async function updateUserInfo(targetUserId: number, data: {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  affiliation: string;
  country: string;
  role: string;
}) {
  const session = await verifyAdminSession();

  try {
    const [existingUser] = await db.select().from(users).where(eq(users.id, targetUserId)).limit(1);
    if (!existingUser) {
      return { success: false, error: "User not found." };
    }

    const changes: Record<string, { from: any; to: any }> = {};
    const keys = ["title", "firstName", "lastName", "phone", "affiliation", "country", "role"] as const;
    for (const key of keys) {
      const oldVal = existingUser[key] ?? "";
      const newVal = data[key] ?? "";
      if (String(oldVal) !== String(newVal)) {
        changes[key] = { from: oldVal, to: newVal };
      }
    }

    await db
      .update(users)
      .set({
        title: data.title,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        affiliation: data.affiliation,
        country: data.country,
        role: data.role,
      })
      .where(eq(users.id, targetUserId));

    // Audit log
    await db.insert(adminLogs).values({
      adminId: Number(session.userId),
      adminEmail: String(session.email),
      action: "UPDATE_USER",
      targetId: String(targetUserId),
      details: JSON.stringify({
        changes,
        updatedFields: data,
      }),
    });

    revalidatePath(`/admin/users/${targetUserId}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("updateUserInfo error:", error);
    return { success: false, error: error.message || "Failed to update user." };
  }
}

export async function updateRegistrationInfo(regId: number, targetUserId: number, data: {
  registrationCategory: string;
  authorType: string;
  paperIds: string;
  extraBanquetTickets: number;
  amount: number;
  currency: string;
}) {
  const session = await verifyAdminSession();

  try {
    const [existingReg] = await db.select().from(registrations).where(eq(registrations.id, regId)).limit(1);
    if (!existingReg) {
      return { success: false, error: "Registration not found." };
    }

    const changes: Record<string, { from: any; to: any }> = {};
    const keys = [
      { key: "registrationCategory", value: data.registrationCategory },
      { key: "authorType", value: data.authorType },
      { key: "paperIds", value: data.paperIds },
      { key: "extraBanquetTickets", value: Number(data.extraBanquetTickets) },
      { key: "amount", value: String(data.amount) },
      { key: "currency", value: data.currency },
    ] as const;

    for (const item of keys) {
      const oldVal = existingReg[item.key as keyof typeof existingReg] ?? "";
      const newVal = item.value;
      if (String(oldVal) !== String(newVal)) {
        changes[item.key] = { from: oldVal, to: newVal };
      }
    }

    await db
      .update(registrations)
      .set({
        registrationCategory: data.registrationCategory,
        authorType: data.authorType,
        paperIds: data.paperIds,
        extraBanquetTickets: Number(data.extraBanquetTickets),
        amount: String(data.amount),
        currency: data.currency,
      })
      .where(eq(registrations.id, regId));

    // Audit log
    await db.insert(adminLogs).values({
      adminId: Number(session.userId),
      adminEmail: String(session.email),
      action: "UPDATE_REGISTRATION",
      targetId: String(targetUserId),
      details: JSON.stringify({
        regId,
        changes,
        updatedFields: data,
      }),
    });

    revalidatePath(`/admin/users/${targetUserId}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("updateRegistrationInfo error:", error);
    return { success: false, error: error.message || "Failed to update registration." };
  }
}

export async function refundPayment(regId: number, targetUserId: number) {
  const session = await verifyAdminSession();

  try {
    const [existingReg] = await db.select().from(registrations).where(eq(registrations.id, regId)).limit(1);
    const oldPaymentStatus = existingReg ? existingReg.paymentStatus : "unknown";
    const oldRefundStatus = existingReg ? existingReg.refundStatus : "none";

    await db
      .update(registrations)
      .set({
        paymentStatus: "refunded",
        refundStatus: "refunded",
      })
      .where(eq(registrations.id, regId));

    const changes = {
      paymentStatus: { from: oldPaymentStatus, to: "refunded" },
      refundStatus: { from: oldRefundStatus, to: "refunded" },
    };

    // Audit log
    await db.insert(adminLogs).values({
      adminId: Number(session.userId),
      adminEmail: String(session.email),
      action: "REFUND_PAYMENT",
      targetId: String(targetUserId),
      details: JSON.stringify({
        regId,
        changes,
        message: `Marked registration #${regId} payment as refunded.`,
      }),
    });

    revalidatePath(`/admin/users/${targetUserId}`);
    revalidatePath("/admin/users");
    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error: any) {
    console.error("refundPayment error:", error);
    return { success: false, error: error.message || "Failed to refund payment." };
  }
}

export async function getAllPayments() {
  await verifyAdminSession();

  try {
    const allAttempts = await db.select().from(paymentAttempts).orderBy(desc(paymentAttempts.createdAt));
    const allRegs = await db.select().from(registrations);
    const allUsers = await db.select().from(users);

    const regMap = new Map();
    for (const r of allRegs) {
      regMap.set(r.id, r);
    }
    const userMap = new Map();
    for (const u of allUsers) {
      userMap.set(u.id, u);
    }

    const result = allAttempts.map((att) => {
      const reg = regMap.get(att.registrationId);
      const user = reg ? userMap.get(reg.userId) : null;
      return {
        id: att.id,
        registrationId: att.registrationId,
        invoiceId: att.invoiceId || reg?.invoiceId || "N/A",
        orderId: att.orderId || "N/A",
        status: att.status,
        createdAt: att.createdAt,
        userId: user?.id || null,
        userName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        userEmail: user?.email || "Unknown",
        amount: reg?.amount || null,
        currency: reg?.currency || "USD",
        lkrAmount: reg?.lkrAmount || null,
        exchangeRate: reg?.exchangeRate || null,
        paymentStatus: reg?.paymentStatus || "pending",
        refundStatus: reg?.refundStatus || "none",
      };
    });

    return { success: true, payments: result };
  } catch (error: any) {
    console.error("getAllPayments error:", error);
    return { success: false, error: error.message || "Failed to fetch payments." };
  }
}

export async function getSettings() {
  await verifyAdminSession();

  try {
    const allSettings = await db.select().from(settings);
    const map: Record<string, string> = {};
    for (const s of allSettings) {
      map[s.key] = s.value;
    }
    return { success: true, settings: map };
  } catch (error: any) {
    console.error("getSettings error:", error);
    return { success: false, error: error.message || "Failed to fetch settings." };
  }
}

export async function updateSetting(key: string, value: string) {
  const session = await verifyAdminSession();

  try {
    const [existing] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    const oldValue = existing ? existing.value : "(not set)";

    if (existing) {
      await db.update(settings).set({ value }).where(eq(settings.key, key));
    } else {
      await db.insert(settings).values({ key, value });
    }

    const changes = {
      [key]: { from: oldValue, to: value },
    };

    // Audit log
    await db.insert(adminLogs).values({
      adminId: Number(session.userId),
      adminEmail: String(session.email),
      action: "UPDATE_SETTING",
      targetId: key,
      details: JSON.stringify({
        changes,
        message: `Changed setting "${key}" from "${oldValue}" to "${value}"`,
      }),
    });

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: any) {
    console.error("updateSetting error:", error);
    return { success: false, error: error.message || "Failed to update setting." };
  }
}

export async function enrollAdmin(email: string, details: {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  affiliation: string;
  country: string;
}) {
  const session = await verifyAdminSession();

  try {
    if (!email) {
      return { success: false, error: "Email is required." };
    }

    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser) {
      const oldRole = existingUser.role || "user";
      
      if (oldRole === "admin") {
        return { success: true, message: `User "${email}" is already an administrator.` };
      }

      await db.update(users).set({ role: "admin" }).where(eq(users.id, existingUser.id));

      const changes = {
        role: { from: oldRole, to: "admin" }
      };

      await db.insert(adminLogs).values({
        adminId: Number(session.userId),
        adminEmail: String(session.email),
        action: "ENROLL_ADMIN_EXISTING",
        targetId: String(existingUser.id),
        details: JSON.stringify({
          changes,
          message: `Promoted existing user "${email}" to admin.`,
        }),
      });

      revalidatePath("/admin/users");
      return { success: true, message: `Successfully promoted existing user "${email}" to administrator!` };
    } else {
      const tempPasswordHash = await bcrypt.hash(Math.random().toString(36) + Date.now().toString(), 10);
      const isLocalVal = details.country.toLowerCase().includes("sri lanka") || details.country.toLowerCase() === "lk";

      const [insertResult] = await db.insert(users).values({
        email,
        passwordHash: tempPasswordHash,
        title: details.title,
        firstName: details.firstName,
        lastName: details.lastName,
        phone: details.phone,
        affiliation: details.affiliation,
        country: details.country,
        isLocal: isLocalVal,
        role: "admin",
      });

      const newUserId = Number(insertResult.insertId);

      const token = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

      await db
        .insert(passwordResets)
        .values({
          email,
          token,
          expiresAt,
        })
        .onDuplicateKeyUpdate({
          set: {
            token,
            expiresAt,
          },
        });

      await sendPasswordResetEmail(email, token);

      await db.insert(adminLogs).values({
        adminId: Number(session.userId),
        adminEmail: String(session.email),
        action: "ENROLL_ADMIN_NEW",
        targetId: String(newUserId),
        details: JSON.stringify({
          message: `Created new admin user "${email}" and sent password reset invitation.`,
          details,
        }),
      });

      revalidatePath("/admin/users");
      return { success: true, message: `Successfully created new administrator "${email}" and sent password reset invitation.` };
    }
  } catch (error: any) {
    console.error("enrollAdmin error:", error);
    return { success: false, error: error.message || "Failed to enroll admin." };
  }
}
