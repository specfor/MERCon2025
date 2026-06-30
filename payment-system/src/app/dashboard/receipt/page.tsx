import { redirect } from "next/navigation";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { registrations, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import PrintButton from "./PrintButton";

export default async function ReceiptPage() {
  const session = await getSession();
  if (!session || !session.userId) {
    redirect("/");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const [registration] = await db
    .select()
    .from(registrations)
    .where(eq(registrations.userId, session.userId))
    .limit(1);

  if (!user || !registration || registration.paymentStatus !== "completed") {
    redirect("/dashboard");
  }

  const invoiceId = registration.invoiceId || "N/A";
  const paidAt = registration.paidAt ? new Date(registration.paidAt).toLocaleDateString() : "N/A";

  return (
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md print:shadow-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div className="flex items-center gap-4">
            <Image src="/logo2026.png" width={100} height={100} alt="MERCon Logo" className="w-20 h-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MERCon 2026</h1>
              <p className="text-sm text-gray-500">12th International Multidisciplinary Engineering Research Conference</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-200 print:text-gray-400">RECEIPT</h2>
            <p className="text-sm text-gray-500 mt-2">Date: {paidAt}</p>
            <p className="text-sm text-gray-500 font-mono">Invoice ID: {invoiceId}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Billed To</h3>
          <p className="font-bold text-gray-800 text-lg">{user.title} {user.firstName} {user.lastName}</p>
          <p className="text-gray-600">{user.affiliation}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">{user.country}</p>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 px-2 font-semibold text-gray-600">Description</th>
                <th className="py-3 px-2 font-semibold text-gray-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-2">
                  <p className="font-semibold text-gray-800">Conference Registration</p>
                  <p className="text-sm text-gray-500 mt-1">Category: {registration.registrationCategory.replace('_', ' ')}</p>
                  {registration.registrationCategory !== "PARTICIPANT" && (
                    <p className="text-sm text-gray-500">Author Type: {registration.authorType.replace(/_/g, ' ')}</p>
                  )}
                  {registration.paperIds && (
                    <p className="text-sm text-gray-500">Paper ID(s): {registration.paperIds}</p>
                  )}
                </td>
                <td className="py-4 px-2 text-right font-medium align-top">
                  {registration.currency} {Number(registration.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
              </tr>
              
              {registration.extraBanquetTickets > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-2">
                    <p className="font-semibold text-gray-800">Extra Banquet Tickets (x{registration.extraBanquetTickets})</p>
                    <p className="text-sm text-gray-500 mt-1">Included in total</p>
                  </td>
                  <td className="py-4 px-2 text-right font-medium align-top">-</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-4 px-2 text-right font-bold text-gray-800 text-lg">Total Paid</td>
                <td className="py-4 px-2 text-right font-bold text-green-600 text-xl">
                  {registration.currency} {Number(registration.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 text-center text-gray-500 text-sm">
          <p>Thank you for registering for MERCon 2026.</p>
          <p>This is a computer-generated receipt and requires no physical signature.</p>
        </div>

        {/* Print Button (Hidden when printing) */}
        <div className="mt-10 text-center print:hidden">
          <PrintButton />
          <p className="text-xs text-gray-400 mt-3">Clicking download will open the print dialog. Select "Save as PDF" as the destination.</p>
        </div>
      </div>
    </div>
  );
}
