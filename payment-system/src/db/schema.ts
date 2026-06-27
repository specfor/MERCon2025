import { mysqlTable, serial, varchar, boolean, decimal, timestamp, int } from "drizzle-orm/mysql-core";

export const registrations = mysqlTable("registrations", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  affiliation: varchar("affiliation", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  
  isLocal: boolean("is_local").notNull().default(false),
  registrationCategory: varchar("registration_category", { length: 50 }).notNull(), // FULL, LIMITED, PARTICIPANT
  authorType: varchar("author_type", { length: 50 }).notNull(), // IEEE, NON_IEEE, STUDENT_IEEE, STUDENT_NON_IEEE, NON_PRESENTING, N/A
  
  isIeeeMember: boolean("is_ieee_member").notNull().default(false),
  isStudent: boolean("is_student").notNull().default(false),
  
  ieeeMemberNumber: varchar("ieee_member_number", { length: 100 }),
  paperIds: varchar("paper_ids", { length: 255 }),
  
  extraBanquetTickets: int("extra_banquet_tickets").notNull().default(0),
  
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull(), // LKR, USD
  
  ieeeProofPath: varchar("ieee_proof_path", { length: 500 }),
  studentProofPath: varchar("student_proof_path", { length: 500 }),
  
  paymentStatus: varchar("payment_status", { length: 50 }).notNull().default("pending"), // pending, completed, failed
  sessionId: varchar("session_id", { length: 255 }), // IPG Session ID
  invoiceId: varchar("invoice_id", { length: 255 }), // Unique Invoice ID sent to IPG
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
