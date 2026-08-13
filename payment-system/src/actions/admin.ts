"use server";

import { db } from "@/db";
import { users, registrations, paymentAttempts, adminLogs, settings, passwordResets } from "@/db/schema";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/email";
import { eq, desc, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { formatLocalTime } from "@/lib/formatDate";

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

    const result = allUsers.map((u) => ({
      id: u.id,
      email: u.email,
      title: u.title,
      firstName: u.firstName,
      lastName: u.lastName,
      affiliation: u.affiliation,
      country: u.country,
      role: u.role || "user",
      createdAt: u.createdAt,
    }));

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

    const userRegistrations = await db.select().from(registrations).where(eq(registrations.userId, userId));
    
    const attempts = await db.select().from(paymentAttempts);
    
    // Attach attempts to their respective registrations
    const registrationsWithAttempts = userRegistrations.map((reg) => {
      const regAttempts = attempts
        .filter((a) => a.registrationId === reg.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return { ...reg, attempts: regAttempts };
    });

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
        registrations: registrationsWithAttempts,
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

export async function toggleDocumentReviewed(regId: number, targetUserId: number, docType: "ieee" | "student", reviewed: boolean) {
  const session = await verifyAdminSession();

  try {
    const updateData = docType === "ieee" 
      ? { ieeeProofReviewed: reviewed } 
      : { studentProofReviewed: reviewed };

    await db.update(registrations).set(updateData).where(eq(registrations.id, regId));

    await db.insert(adminLogs).values({
      adminId: Number(session.userId),
      adminEmail: String(session.email),
      action: "REVIEW_DOCUMENT",
      targetId: String(targetUserId),
      details: JSON.stringify({
        regId,
        docType,
        reviewed,
      }),
    });

    revalidatePath(`/admin/users/${targetUserId}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error("toggleDocumentReviewed error:", error);
    return { success: false, error: error.message || "Failed to update document review status." };
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

export type ExportFilters = {
  paymentStatus?: string;
  category?: string;
  authorType?: string;
  country?: string;
  countries?: string[];
  sortBy?: string;
  sortOrder?: string;
  includeNoRegistrations?: boolean;
};

function escapeCsvField(field: any): string {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  return `"${str.replace(/"/g, '""')}"`;
}

export async function exportRegistrationsCsv(filters: ExportFilters = {}) {
  await verifyAdminSession();

  try {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    const allRegs = await db.select().from(registrations).orderBy(desc(registrations.createdAt));

    const headers = [
      "User ID",
      "Title",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Affiliation",
      "Country",
      "Registration ID",
      "Registration Category",
      "Author Type",
      "Paper IDs",
      "Extra Banquet Tickets",
      "Amount",
      "Currency",
      "Payment Status",
      "Invoice ID",
      "IEEE Proof Document Name",
      "IEEE Proof Reviewed Status",
      "Student Proof Document Name",
      "Student Proof Reviewed Status",
      "Paid At",
      "Registration Created At"
    ];

    type RawRow = {
      firstName: string;
      lastName: string;
      email: string;
      country: string;
      category: string;
      cells: string[];
    };

    const rawRows: RawRow[] = [];

    for (const u of allUsers) {
      const userRegs = allRegs.filter((r) => r.userId === u.id);

      const matchesCountriesArray = !filters.countries || !Array.isArray(filters.countries) || filters.countries.length === 0 || filters.countries.some(c => u.country.toLowerCase().trim() === c.toLowerCase().trim());
      const matchesCountryText = !filters.country || filters.country.trim() === "" || u.country.toLowerCase().includes(filters.country.toLowerCase().trim());
      if (!matchesCountriesArray || !matchesCountryText) continue;

      if (userRegs.length === 0) {
        if (filters.includeNoRegistrations) {
          const noStatusFilter = !filters.paymentStatus || filters.paymentStatus === "all";
          const noCatFilter = !filters.category || filters.category === "all";
          const noAuthorFilter = !filters.authorType || filters.authorType === "all";

          if (noStatusFilter && noCatFilter && noAuthorFilter) {
            rawRows.push({
              firstName: u.firstName || "",
              lastName: u.lastName || "",
              email: u.email || "",
              country: u.country || "",
              category: "-",
              cells: [
                String(u.id),
                u.title || "",
                u.firstName || "",
                u.lastName || "",
                u.email || "",
                u.phone || "",
                u.affiliation || "",
                u.country || "",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "No Registration Initiated",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                formatLocalTime(u.createdAt)
              ]
            });
          }
        }
      } else {
        for (const reg of userRegs) {
          const effectiveStatus = reg.refundStatus === "refunded" ? "refunded" : reg.paymentStatus;
          if (filters.paymentStatus && filters.paymentStatus !== "all" && effectiveStatus !== filters.paymentStatus) {
            continue;
          }
          if (filters.category && filters.category !== "all" && reg.registrationCategory !== filters.category) {
            continue;
          }
          if (filters.authorType && filters.authorType !== "all" && reg.authorType !== filters.authorType) {
            continue;
          }

          const ieeeDocName = reg.ieeeProofPath ? reg.ieeeProofPath.split("/").pop() || reg.ieeeProofPath : "";
          const ieeeReviewed = reg.ieeeProofPath ? (reg.ieeeProofReviewed ? "Reviewed" : "Pending Review") : "N/A";

          const studentDocName = reg.studentProofPath ? reg.studentProofPath.split("/").pop() || reg.studentProofPath : "";
          const studentReviewed = reg.studentProofPath ? (reg.studentProofReviewed ? "Reviewed" : "Pending Review") : "N/A";

          rawRows.push({
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            email: u.email || "",
            country: u.country || "",
            category: reg.registrationCategory || "",
            cells: [
              String(u.id),
              u.title || "",
              u.firstName || "",
              u.lastName || "",
              u.email || "",
              u.phone || "",
              u.affiliation || "",
              u.country || "",
              String(reg.id),
              reg.registrationCategory || "",
              reg.authorType || "",
              reg.paperIds || "",
              String(reg.extraBanquetTickets || 0),
              String(reg.amount || 0),
              reg.currency || "",
              effectiveStatus || "",
              reg.invoiceId || "",
              ieeeDocName,
              ieeeReviewed,
              studentDocName,
              studentReviewed,
              reg.paidAt ? formatLocalTime(reg.paidAt) : "",
              reg.createdAt ? formatLocalTime(reg.createdAt) : ""
            ]
          });
        }
      }
    }

    if (filters.sortBy && filters.sortBy !== "default") {
      rawRows.sort((a, b) => {
        let valA = "";
        let valB = "";
        if (filters.sortBy === "firstName") {
          valA = a.firstName.toLowerCase();
          valB = b.firstName.toLowerCase();
        } else if (filters.sortBy === "lastName") {
          valA = a.lastName.toLowerCase();
          valB = b.lastName.toLowerCase();
        } else if (filters.sortBy === "email") {
          valA = a.email.toLowerCase();
          valB = b.email.toLowerCase();
        } else if (filters.sortBy === "country") {
          valA = a.country.toLowerCase();
          valB = b.country.toLowerCase();
        } else if (filters.sortBy === "category") {
          valA = a.category.toLowerCase();
          valB = b.category.toLowerCase();
        }
        if (valA < valB) return filters.sortOrder === "desc" ? 1 : -1;
        if (valA > valB) return filters.sortOrder === "desc" ? -1 : 1;
        return 0;
      });
    }

    const csvContent = [
      headers.map(escapeCsvField).join(","),
      ...rawRows.map((item) => item.cells.map(escapeCsvField).join(","))
    ].join("\r\n");

    return { success: true, csv: csvContent };
  } catch (error: any) {
    console.error("exportRegistrationsCsv error:", error);
    return { success: false, error: error.message || "Failed to generate CSV export." };
  }
}
