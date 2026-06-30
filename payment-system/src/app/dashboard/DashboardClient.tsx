"use client";

import { useState, useMemo } from "react";
import { submitRegistration } from "@/actions/registration";
import { calculateAmount } from "@/lib/pricing";
import { logoutUser } from "@/actions/auth";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function DashboardClient({ user, initialRegistration }: { user: any, initialRegistration: any }) {
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success");
  const errorParam = searchParams.get("error");

  const isCompleted = initialRegistration?.paymentStatus === "completed";
  const [isEditing, setIsEditing] = useState(!initialRegistration || !isCompleted);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(errorParam);

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
      let checkout = (window as any).Checkout;
      if (!checkout) {
        console.warn("Checkout script not loaded statically, attempting to load dynamically...");
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = process.env.NEXT_PUBLIC_UOM_IPG_CHECKOUT_SCRIPT || "https://bankofceylon.gateway.mastercard.com/static/checkout/checkout.min.js";
          script.setAttribute("data-error", "errorCallback");
          script.setAttribute("data-cancel", "cancelCallback");
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        checkout = (window as any).Checkout;
      }
      
      if (!checkout) throw new Error("Checkout script failed to load. Please disable adblockers or refresh the page.");

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
      <div className="flex min-h-screen p-8 items-start lg:items-center justify-center">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h1 className="text-2xl topic text-white">Dashboard</h1>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 font-medium transition">Logout</button>
          </div>
          
          {successParam && (
             <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-xl mb-6 flex flex-col sm:flex-row items-center justify-between shadow-inner">
               <div className="flex items-center">
                 <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 <span className="font-semibold">Payment was successful! Your registration is confirmed.</span>
               </div>
               {initialRegistration?.invoiceId && (
                 <div className="mt-2 sm:mt-0 text-sm font-mono bg-green-900/40 px-3 py-1 rounded border border-green-500/30">
                   Invoice ID: {initialRegistration.invoiceId}
                 </div>
               )}
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">Registration Details</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-400 block mb-1">Registration Category</span>
                  <span className="text-white font-medium px-3 py-1 bg-white/5 rounded-lg border border-white/5">{initialRegistration.registrationCategory.replace('_', ' ')}</span>
                </div>
                
                {initialRegistration.registrationCategory !== "PARTICIPANT" && (
                  <div>
                    <span className="text-gray-400 block mb-1">Author Type</span>
                    <span className="text-white font-medium px-3 py-1 bg-white/5 rounded-lg border border-white/5">{initialRegistration.authorType.replace(/_/g, ' ')}</span>
                  </div>
                )}
                
                {initialRegistration.paperIds && (
                  <div>
                    <span className="text-gray-400 block mb-1">Paper ID(s)</span>
                    <div className="flex flex-wrap gap-2">
                      {initialRegistration.paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '').map((id: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {initialRegistration.ieeeMemberNumber && (
                  <div>
                    <span className="text-gray-400 block mb-1">IEEE Member Number</span>
                    <span className="text-white font-medium font-mono">{initialRegistration.ieeeMemberNumber}</span>
                  </div>
                )}

                <div>
                  <span className="text-gray-400 block mb-1">Extra Banquet Tickets</span>
                  <span className="text-white font-medium">{initialRegistration.extraBanquetTickets}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">Payment Summary</h2>
              
              <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="text-2xl font-bold text-primary-400">{initialRegistration.currency} {Number(initialRegistration.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-4">
                  <span className="text-gray-400">Invoice ID</span>
                  <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{initialRegistration.invoiceId}</span>
                </div>
                
                {initialRegistration.paidAt && (
                  <div className="flex justify-between items-center text-sm mt-3">
                    <span className="text-gray-400">Date Paid</span>
                    <span className="text-white">{new Date(initialRegistration.paidAt).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="mt-6 border-t border-white/10 pt-4">
                  <Link href="/dashboard/receipt" target="_blank" className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-primary-600/20 text-primary-300 font-semibold hover:bg-primary-600/40 border border-primary-500/30 transition shadow-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Download Receipt
                  </Link>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary-900/20 border border-primary-500/30 rounded-xl">
                 <p className="text-primary-200 text-sm">
                   Your registration is confirmed. If you need to make changes, please contact the MERCon organizing committee.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Column - Form */}
      <div className="w-full lg:w-3/5 flex flex-col p-6 lg:p-12 overflow-y-auto max-h-screen custom-scrollbar">
        <div className="max-w-3xl w-full mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h1 className="text-3xl topic text-white">Conference Registration</h1>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 font-medium transition">Logout</button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form id="reg-form" onSubmit={handleSaveAndPay} className="space-y-8 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-200">1. Select Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Registration Category</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border border-white/20 rounded-xl bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
                    <option value="FULL">Full Registration</option>
                    <option value="LIMITED">Limited Registration</option>
                    <option value="PARTICIPANT">Participant Registration</option>
                  </select>
                </div>
                {category !== "PARTICIPANT" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Author Type</label>
                    <select value={authorType} onChange={e=>setAuthorType(e.target.value)} className="w-full p-3 border border-white/20 rounded-xl bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
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
              <h2 className="text-xl font-semibold mb-4 text-gray-200">2. Required Details</h2>
              <div className="space-y-6">
                {["FULL", "LIMITED"].includes(category) && authorType !== "NON_PRESENTING" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Paper ID(s)</label>
                    <input type="text" value={paperIds} onChange={e=>setPaperIds(e.target.value)} placeholder="e.g. 1570123456, 1570123457" className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" required />
                    
                    {paperIds.trim().length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '').map((id: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30 shadow-sm">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            {id}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {isIeeeMember && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">IEEE Member Number</label>
                      <input type="text" pattern="[0-9]+" title="Only numbers are allowed" value={ieeeMemberNumber} onChange={e=>setIeeeMemberNumber(e.target.value)} className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Upload IEEE Proof (PDF/Image)</label>
                      <input type="file" name="ieeeProof" accept=".pdf,image/*" className="w-full p-2 border border-white/20 rounded-xl bg-white/5 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer" required={!initialRegistration?.ieeeProofPath} />
                    </div>
                  </div>
                )}

                {isStudent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Student ID Proof (PDF/Image)</label>
                    <input type="file" name="studentProof" accept=".pdf,image/*" className="w-full p-2 border border-white/20 rounded-xl bg-white/5 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer" required={!initialRegistration?.studentProofPath} />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Extra Banquet Tickets</label>
                  <select value={extraBanquet} onChange={e=>setExtraBanquet(parseInt(e.target.value))} className="w-full p-3 border border-white/20 rounded-xl bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
                    {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>

      {/* Right Column - Price Breakdown */}
      <div className="w-full lg:w-2/5 border-l border-white/10 p-8 lg:p-12 overflow-y-auto max-h-screen flex flex-col custom-scrollbar bg-black/20">
        <h2 className="text-2xl font-bold text-white mb-8">Order Summary</h2>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-6 mb-8 flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Price Breakdown</h3>
          <ul className="space-y-4 mb-6 text-gray-300">
             <li className="flex justify-between items-center">
               <span>Registration Fee ({category.replace('_', ' ')})</span>
               <span className="font-medium text-white">{currency} {calculatedAmount.toLocaleString()}</span>
             </li>
             {extraBanquet > 0 && (
               <li className="flex justify-between items-center text-sm">
                 <span className="text-gray-400">Extra Banquet Tickets (x{extraBanquet})</span>
                 <span className="text-gray-400">Included in total</span>
               </li>
             )}
          </ul>
          
          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex justify-between items-center text-2xl font-bold text-white mb-2">
              <span>Total Payable</span>
              <span className="text-primary-400">{currency} {calculatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <p className="text-sm text-gray-400 text-right">Taxes and gateway fees included</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-semibold mb-3 text-primary-400">What's Included</h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            {category === "FULL" && (
              <>
                <li>Presentation of up to two (2) papers</li>
                <li>Access to all conference sessions</li>
                <li>Conference pack</li>
                <li>Morning and afternoon coffee breaks</li>
                <li>Conference Lunch</li>
                <li>Conference banquet</li>
              </>
            )}
            {category === "LIMITED" && authorType.startsWith("STUDENT") && (
              <>
                <li>Presentation of one (1) paper</li>
                <li>Access to all conference sessions</li>
                <li>Conference pack</li>
                <li>Morning and afternoon coffee breaks</li>
                <li>Conference Lunch</li>
              </>
            )}
            {category === "LIMITED" && !authorType.startsWith("STUDENT") && authorType !== "NON_PRESENTING" && (
              <>
                <li>Presentation of up to two (2) papers</li>
                <li>Access to all conference sessions</li>
                <li>Conference pack</li>
                <li>Morning and afternoon coffee breaks</li>
                <li>Conference Lunch</li>
              </>
            )}
            {(category === "PARTICIPANT" || authorType === "NON_PRESENTING") && (
              <>
                <li>Access to all conference sessions</li>
                <li>Conference pack</li>
                <li>Morning and afternoon coffee breaks</li>
                <li>Conference Lunch</li>
              </>
            )}
            {extraBanquet > 0 && (
              <li>Additional Banquet Tickets ({extraBanquet})</li>
            )}
          </ul>
        </div>

        <button
          form="reg-form"
          type="submit"
          disabled={loading || calculatedAmount <= 0}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-md mt-auto border
            ${(loading || calculatedAmount <= 0) ? 'bg-white/10 border-white/10 text-gray-500 cursor-not-allowed' : 'bg-primary-600 border-primary-500/50 hover:bg-primary-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:-translate-y-0.5'}
          `}
        >
          {loading ? "Processing..." : "Save & Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
