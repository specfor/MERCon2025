import { mysqlTable, serial, varchar, boolean, decimal, timestamp, int } from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm';

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  affiliation: varchar("affiliation", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  isLocal: boolean("is_local").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const registrations = mysqlTable("registrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  
  registrationCategory: varchar("registration_category", { length: 50 }).notNull(),
  authorType: varchar("author_type", { length: 50 }).notNull(),
  
  isIeeeMember: boolean("is_ieee_member").notNull().default(false),
  isStudent: boolean("is_student").notNull().default(false),
  
  ieeeMemberNumber: varchar("ieee_member_number", { length: 100 }),
  paperIds: varchar("paper_ids", { length: 255 }),
  
  extraBanquetTickets: int("extra_banquet_tickets").notNull().default(0),
  
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  
  ieeeProofPath: varchar("ieee_proof_path", { length: 500 }),
  studentProofPath: varchar("student_proof_path", { length: 500 }),
  
  paymentStatus: varchar("payment_status", { length: 50 }).notNull().default("pending"),
  invoiceId: varchar("invoice_id", { length: 255 }),
  
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const paymentAttempts = mysqlTable("payment_attempts", {
  id: int("id").autoincrement().primaryKey(),
  registrationId: int("registration_id").notNull(),
  sessionId: varchar("session_id", { length: 255 }),
  invoiceId: varchar("invoice_id", { length: 255 }),
  orderId: varchar("order_id", { length: 255 }),
  successIndicator: varchar("success_indicator", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  registration: one(registrations, {
    fields: [users.id],
    references: [registrations.userId],
  }),
}));

export const registrationsRelations = relations(registrations, ({ one, many }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
  paymentAttempts: many(paymentAttempts),
}));

export const paymentAttemptsRelations = relations(paymentAttempts, ({ one }) => ({
  registration: one(registrations, {
    fields: [paymentAttempts.registrationId],
    references: [registrations.id],
  }),
}));
