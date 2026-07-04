import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { registrations, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import PrintButton from "./PrintButton";
import Link from "next/link";

export default async function ReceiptPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const regId = searchParams.id as string | undefined;

  const session = await getSession();
  if (!session || !session.userId) {
    redirect("/");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  const query = regId
    ? and(eq(registrations.userId, session.userId), eq(registrations.id, Number(regId)))
    : eq(registrations.userId, session.userId);

  const [registration] = await db
    .select()
    .from(registrations)
    .where(query)
    .orderBy(registrations.createdAt) // Get the first one if id not provided
    .limit(1);

  if (!user || !registration || registration.paymentStatus !== "completed") {
    redirect("/dashboard");
  }

  const invoiceId = registration.invoiceId || "N/A";
  const paidAt = registration.paidAt ? new Date(registration.paidAt).toLocaleDateString() : "N/A";

  return (
    <div className="min-h-screen py-10 print:py-0 text-gray-800 font-sans flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-3xl mb-6 print:hidden">
        <Link href="/dashboard" className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition bg-black/20 px-4 py-2 rounded-lg border border-white/10 hover:border-primary-500/50">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Dashboard
        </Link>
      </div>

      <div id="receipt-container" className="w-full max-w-3xl bg-white rounded-xl shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start bg-[#081a12] p-8 border-b-4 border-primary-500 gap-6 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img src="/logo2026.png" alt="MERCon Logo" className="w-20 h-auto shrink-0" />
            <div>
              <h1 className="text-3xl font-bold text-white">MERCon 2026</h1>
              <p className="text-sm text-primary-200 mt-1 max-w-sm">12th International Multidisciplinary Engineering Research Conference</p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <h2 className="text-4xl font-bold text-primary-500 mb-2">RECEIPT</h2>
            <p className="text-sm text-gray-300">Date: {paidAt}</p>
            <p className="text-sm text-gray-300 font-mono mt-1">Invoice: {invoiceId}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-10">
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
        </div>
      </div>

      {/* Print Button (Outside receipt container to avoid white space in captured image) */}
      <div id="download-btn-wrapper" className="mt-8 text-center print:hidden w-full max-w-3xl">
        <PrintButton />
        <p className="text-xs text-gray-400 mt-3">Click to securely download your payment receipt as an image.</p>
      </div>
    </div>
  );
}
