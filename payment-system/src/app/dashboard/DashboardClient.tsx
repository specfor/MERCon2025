"use client";

import { useState, useMemo } from "react";
import { submitRegistration } from "@/actions/registration";
import { calculateAmount } from "@/lib/pricing";
import { logoutUser } from "@/actions/auth";

export default function DashboardClient({ user, initialRegistration }: { user: any, initialRegistration: any }) {
  const isCompleted = initialRegistration?.paymentStatus === "completed";
  const [isEditing, setIsEditing] = useState(!initialRegistration || !isCompleted);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState(initialRegistration?.registrationCategory || "FULL");
  const [authorType, setAuthorType] = useState(initialRegistration?.authorType || "IEEE");
  const [paperIds, setPaperIds] = useState(initialRegistration?.paperIds || "");
  const [ieeeMemberNumber, setIeeeMemberNumber] = useState(initialRegistration?.ieeeMemberNumber || "");
  const [extraBanquet, setExtraBanquet] = useState(initialRegistration?.extraBanquetTickets || 0);

  const isIeeeMember = ["IEEE", "STUDENT_IEEE"].includes(authorType) || (category === "FULL" && authorType === "IEEE");
  const isStudent = ["STUDENT_IEEE", "STUDENT_NON_IEEE"].includes(authorType);
  const isLocal = user.isLocal;

  const calculatedAmount = useMemo(() => {
    return calculateAmount(category, authorType, isLocal, extraBanquet);
  }, [category, authorType, isLocal, extraBanquet]);
  const currency = isLocal ? "LKR" : "USD";

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleSaveAndPay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      // Append manually managed state
      formData.append("registrationCategory", category);
      formData.append("authorType", authorType);
      formData.append("isIeeeMember", isIeeeMember.toString());
      formData.append("isStudent", isStudent.toString());
      formData.append("ieeeMemberNumber", ieeeMemberNumber);
      formData.append("paperIds", paperIds);
      formData.append("extraBanquetTickets", extraBanquet.toString());

      const res = await submitRegistration(formData);

      if (!res.success) {
        throw new Error(res.error || "Failed to initiate payment session");
      }

      // Start Mastercard Checkout
      const checkout = (window as any).Checkout;
      if (!checkout) throw new Error("Checkout script not loaded");

      checkout.configure({ session: { id: res.sessionId } });
      checkout.showPaymentPage();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during submission.");
      setLoading(false);
    }
  };

  if (isCompleted && !isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl topic text-primary-600">Dashboard</h1>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">Logout</button>
        </div>
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">Registration Complete!</h2>
          <p>Your payment has been successfully processed.</p>
          <p className="mt-2 font-mono text-sm">Reference Tag: {initialRegistration.referenceTag}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl topic text-primary-600">Conference Registration</h1>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">Logout</button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSaveAndPay} className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Select Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-2 border rounded-lg">
                <option value="FULL">Full Registration</option>
                <option value="LIMITED">Limited Registration</option>
                <option value="PARTICIPANT">Participant Registration</option>
              </select>
            </div>
            {category !== "PARTICIPANT" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Type</label>
                <select value={authorType} onChange={e=>setAuthorType(e.target.value)} className="w-full p-2 border rounded-lg">
                  <option value="IEEE">IEEE Member</option>
                  <option value="NON_IEEE">Non-IEEE Member</option>
                  {category === "LIMITED" && (
                    <>
                      <option value="STUDENT_IEEE">Student (IEEE Member)</option>
                      <option value="STUDENT_NON_IEEE">Student (Non-IEEE)</option>
                      <option value="NON_PRESENTING">Non-Presenting Author</option>
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Required Details</h2>
          <div className="space-y-4">
            {["FULL", "LIMITED"].includes(category) && authorType !== "NON_PRESENTING" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper ID(s)</label>
                <input type="text" value={paperIds} onChange={e=>setPaperIds(e.target.value)} placeholder="e.g. 1570123456" className="w-full p-2 border rounded-lg" required />
              </div>
            )}
            
            {isIeeeMember && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IEEE Member Number</label>
                  <input type="text" value={ieeeMemberNumber} onChange={e=>setIeeeMemberNumber(e.target.value)} className="w-full p-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload IEEE Proof (PDF/Image)</label>
                  <input type="file" name="ieeeProof" accept=".pdf,image/*" className="w-full p-2 border rounded-lg" required={!initialRegistration?.ieeeProofPath} />
                </div>
              </div>
            )}

            {isStudent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Student ID Proof (PDF/Image)</label>
                <input type="file" name="studentProof" accept=".pdf,image/*" className="w-full p-2 border rounded-lg" required={!initialRegistration?.studentProofPath} />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Extra Banquet Tickets</label>
              <select value={extraBanquet} onChange={e=>setExtraBanquet(parseInt(e.target.value))} className="w-full p-2 border rounded-lg">
                {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </section>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center text-xl font-bold text-gray-800">
            <span>Total Payable Amount</span>
            <span className="text-primary-600">{currency} {calculatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <button
            type="submit"
            disabled={loading || calculatedAmount <= 0}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all mt-6 shadow-md
              ${(loading || calculatedAmount <= 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5'}
            `}
          >
            {loading ? "Processing..." : "Save & Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
