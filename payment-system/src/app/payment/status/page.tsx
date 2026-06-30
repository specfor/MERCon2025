"use client";

import { useState } from "react";
import { getPaymentByReference, resumePayment } from "@/actions/lookup";
import { getCheckout } from "@/lib/checkout";

type LookupResult = Awaited<ReturnType<typeof getPaymentByReference>>;
type Payment = Extract<LookupResult, { success: true }>["payment"];

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-600 border-red-200",
};

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(value as string);
  return isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

export default function StatusPortalPage() {
  const [tag, setTag] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPayment(null);
    try {
      const res = await getPaymentByReference(tag, email);
      if (!res.success) throw new Error(res.error);
      setPayment(res.payment!);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResume = async () => {
    setResuming(true);
    setError(null);
    try {
      const res = await resumePayment(tag, email);
      if (!res.success) throw new Error(res.error);

      // Fallback storage for the return page.
      localStorage.setItem("ipg_invoice_id", res.invoiceId!);
      localStorage.setItem("ipg_reference_tag", res.referenceTag!);

      const checkout = getCheckout();
      if (!checkout) throw new Error("Payment Gateway script not loaded. Please refresh and try again.");
      checkout.configure({ session: { id: res.sessionId! } });
      checkout.showPaymentPage();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setResuming(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-primary-600 p-6 text-white text-center">
          <h1 className="text-2xl topic">Payment Lookup</h1>
          <p className="text-primary-100 mt-2 text-sm para">
            Enter your payment reference and the email you registered with.
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={lookup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Reference</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="MERC-XXXXX-XXXXX-XXXXX-XXXXX"
                className="w-full p-2 border rounded-lg"
                style={{ fontFamily: "Roboto Mono, monospace" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl disabled:opacity-50"
            >
              {loading ? "Looking up..." : "Look Up Payment"}
            </button>
          </form>

          {payment && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold topic">Payment Details</h2>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border capitalize ${
                    STATUS_STYLES[payment.paymentStatus] || "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {payment.paymentStatus}
                </span>
              </div>

              <dl className="space-y-2 text-sm">
                <Row label="Reference" value={payment.referenceTag} mono />
                <Row label="Name" value={payment.name} />
                <Row label="Category" value={payment.registrationCategory} />
                <Row label="Author Type" value={payment.authorType} />
                {payment.paperIds && <Row label="Paper IDs" value={payment.paperIds} />}
                {payment.extraBanquetTickets > 0 && (
                  <Row label="Extra Banquet Tickets" value={String(payment.extraBanquetTickets)} />
                )}
                <Row label="Amount" value={`${payment.currency} ${Number(payment.amount).toLocaleString()}`} />
                <Row label="Invoice" value={payment.invoiceId || "—"} />
                <Row label="Registered" value={formatDate(payment.createdAt)} />
                <Row label="Paid" value={formatDate(payment.paidAt)} />
              </dl>

              {payment.paymentStatus !== "completed" && (
                <button
                  onClick={handleResume}
                  disabled={resuming}
                  className="mt-6 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl disabled:opacity-50"
                >
                  {resuming ? "Starting payment..." : "Complete Payment"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd
        className="text-gray-800 font-medium text-right break-all"
        style={mono ? { fontFamily: "Roboto Mono, monospace" } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
