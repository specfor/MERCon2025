"use client";

import { useState, useMemo, useEffect } from "react";
import { submitRegistration, getUsdToLkrRate } from "@/actions/registration";
import { calculateAmount } from "@/lib/pricing";
import { logoutUser } from "@/actions/auth";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function DashboardClient({ user, registrations = [], mode = "dashboard" }: { user: any, registrations: any[], mode?: "dashboard" | "register" }) {
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success");
  const errorParam = searchParams.get("error");

  const pendingRegistration = registrations.find(r => r.paymentStatus === "pending");
  const completedRegistrations = registrations.filter(r => r.paymentStatus === "completed" || r.paymentStatus === "refunded");
  const initialRegistration = pendingRegistration;
  const [isEditing, setIsEditing] = useState(mode === "register");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(errorParam);

  const [category, setCategory] = useState(pendingRegistration?.registrationCategory || "FULL");
  const [authorType, setAuthorType] = useState(pendingRegistration?.authorType || "IEEE");
  const [paperIds, setPaperIds] = useState(pendingRegistration?.paperIds || "");
  const [ieeeMemberNumber, setIeeeMemberNumber] = useState(pendingRegistration?.ieeeMemberNumber || "");
  const [extraBanquet, setExtraBanquet] = useState(pendingRegistration?.extraBanquetTickets || 0);

  const isIeeeMember = ["IEEE", "STUDENT_IEEE"].includes(authorType) || (category === "FULL" && authorType === "IEEE");
  const isStudent = ["STUDENT_IEEE", "STUDENT_NON_IEEE"].includes(authorType);
  const isLocal = user.isLocal;
  const maxPapers = isStudent ? 1 : 2;

  const calculatedAmount = useMemo(() => {
    return calculateAmount(category, authorType, isLocal, extraBanquet);
  }, [category, authorType, isLocal, extraBanquet]);
  const currency = isLocal ? "LKR" : "USD";

  const [exchangeRate, setExchangeRate] = useState<number>(300);
  useEffect(() => {
    if (!isLocal) {
      getUsdToLkrRate().then((res) => {
        if (res && res.rate) setExchangeRate(res.rate);
      });
    }
  }, [isLocal]);

  const convertedLkrAmount = useMemo(() => {
    if (currency === "USD") {
      return Math.round(calculatedAmount * exchangeRate * 100) / 100;
    }
    return calculatedAmount;
  }, [calculatedAmount, exchangeRate, currency]);

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError(`Selected file "${file.name}" exceeds the 5MB maximum limit. Please choose a file under 5MB.`);
      e.target.value = "";
    } else {
      setError(null);
    }
  };

  const handleSaveAndPay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const parsedPapers = paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '');
      if (isStudent && parsedPapers.length > 1) {
        throw new Error("A maximum of 1 paper is allowed for student registrations.");
      }
      if (["FULL", "LIMITED"].includes(category) && authorType !== "NON_PRESENTING" && parsedPapers.length > 2) {
        throw new Error("A maximum of 2 papers is allowed per reg istration.");
      }

      const formData = new FormData(e.currentTarget);
      const ieeeProofFile = formData.get("ieeeProof") as File | null;
      const studentProofFile = formData.get("studentProof") as File | null;
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (ieeeProofFile && ieeeProofFile.size > MAX_FILE_SIZE) {
        throw new Error("IEEE proof document exceeds the maximum allowed size of 5MB.");
      }
      if (studentProofFile && studentProofFile.size > MAX_FILE_SIZE) {
        throw new Error("Student ID proof document exceeds the maximum allowed size of 5MB.");
      }

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

  if (mode === "dashboard") {
    return (
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
          </div>
          
          {successParam && (
             <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between shadow-inner">
               <div className="flex items-center">
                 <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 <span className="font-semibold">Payment was successful! Your registration is confirmed.</span>
               </div>
             </div>
          )}

          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-xl font-bold text-white">Past Registrations</h2>
            {completedRegistrations.length > 0 && (
              <Link 
                href="/dashboard/register"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg shadow font-medium transition"
              >
                + Start New Registration
              </Link>
            )}
          </div>

          {completedRegistrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedRegistrations.map((reg, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                    <h3 className="font-bold text-lg text-white">{reg.registrationCategory.replace('_', ' ')}</h3>
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${reg.refundStatus === "refunded" ? "bg-purple-900/50 text-purple-300" : "bg-emerald-900/50 text-emerald-300"}`}>
                      {reg.refundStatus === "refunded" ? "REFUNDED" : "COMPLETED"}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {reg.registrationCategory !== "PARTICIPANT" && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Author Type</span>
                        <span className="text-white font-medium">{reg.authorType.replace(/_/g, ' ')}</span>
                      </div>
                    )}
                    {reg.paperIds && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Paper ID(s)</span>
                        <span className="text-white font-medium break-words text-right max-w-[60%]">{reg.paperIds}</span>
                      </div>
                    )}
                    {reg.extraBanquetTickets > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Extra Banquet Tickets</span>
                        <span className="text-white font-medium">{reg.extraBanquetTickets}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-white/10 pt-3 mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400">Total Paid</span>
                        <span className="text-lg font-bold text-primary-400">{reg.currency} {Number(reg.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                      {reg.invoiceId && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-400 text-xs">Invoice ID</span>
                          <span className="text-white font-mono text-xs bg-black/30 px-2 py-0.5 rounded">{reg.invoiceId}</span>
                        </div>
                      )}
                      {reg.paymentStatus === "completed" && (
                        <div className="mt-4 flex justify-end">
                          <Link href={`/dashboard/receipt?id=${reg.id}`} className="text-sm text-primary-400 hover:text-primary-300 font-medium transition flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Download Receipt
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-white/10 text-center space-y-6 max-w-2xl mx-auto mt-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mx-auto">
                📭
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">No Completed Registrations</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  You have not completed any conference registrations yet. Click below to start the registration and payment flow.
                </p>
              </div>
              <Link
                href="/dashboard/register"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl shadow-lg font-semibold transition"
              >
                Start New Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full py-8 gap-8 px-6">
      {/* Left Column - Form */}
      <div className="w-full lg:w-3/5 flex flex-col space-y-6">
        <div className="max-w-3xl w-full mx-auto">
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
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">Paper ID(s) <span className="text-gray-400 font-normal">(Max {maxPapers} paper{maxPapers > 1 ? "s" : ""})</span></label>
                      {paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '').length > maxPapers && (
                        <span className="text-xs font-semibold text-red-400">× Maximum {maxPapers} paper{maxPapers > 1 ? "s" : ""} allowed</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={paperIds}
                      onChange={e=>setPaperIds(e.target.value)}
                      placeholder={isStudent ? "e.g. 1570123456" : "e.g. 1570123456, 1570123457"}
                      className={`w-full p-3 border rounded-xl bg-white/5 text-white focus:ring-2 outline-none transition ${
                        paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '').length > maxPapers
                          ? 'border-red-500/50 focus:ring-red-500'
                          : 'border-white/20 focus:ring-primary-500 focus:border-transparent'
                      }`}
                      required
                    />
                    
                    {paperIds.trim().length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {paperIds.split(/[\s,]+/).filter((id: string) => id.trim() !== '').map((id: string, index: number) => (
                          <span key={index} className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border shadow-sm ${
                            paperIds.split(/[\s,]+/).filter((x: string) => x.trim() !== '').length > maxPapers
                              ? 'bg-red-500/20 text-red-300 border-red-500/30'
                              : 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                          }`}>
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">Upload IEEE Proof (PDF/Image, Max 5MB)</label>
                      <input type="file" name="ieeeProof" accept=".pdf,image/*" onChange={handleFileChange} className="w-full p-2 border border-white/20 rounded-xl bg-white/5 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer" required={!initialRegistration?.ieeeProofPath} />
                    </div>
                  </div>
                )}

                {isStudent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Student ID Proof (PDF/Image, Max 5MB)</label>
                    <input type="file" name="studentProof" accept=".pdf,image/*" onChange={handleFileChange} className="w-full p-2 border border-white/20 rounded-xl bg-white/5 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-600 cursor-pointer" required={!initialRegistration?.studentProofPath} />
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
      <div className="w-full lg:w-2/5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 flex flex-col justify-between h-fit">
        <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
        
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
            {currency === "USD" && (
              <div className="text-right text-xs font-medium text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 rounded-lg p-3 mb-2 shadow-inner space-y-1">
                <div>
                  <span className="text-gray-300">Billed LKR Amount: </span>
                  <span className="font-bold text-sm text-emerald-400">LKR {convertedLkrAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <span className="block text-[11px] text-gray-400">(@ Official Exchange Rate: 1 USD = {exchangeRate} LKR)</span>
                <span className="block text-[10px] text-amber-300/80 italic font-normal mt-0.5">Currency exchange fee charged by banks may apply.</span>
              </div>
            )}
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
