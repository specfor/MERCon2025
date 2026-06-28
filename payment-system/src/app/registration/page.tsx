"use client";

import { useState, useMemo } from "react";
import { submitRegistration } from "@/actions/registration";
import { calculateAmount } from "@/lib/pricing";

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("Mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [isLocal, setIsLocal] = useState(true);

  const [category, setCategory] = useState("FULL");
  const [authorType, setAuthorType] = useState("IEEE");
  const [paperIds, setPaperIds] = useState("");
  const [ieeeMemberNumber, setIeeeMemberNumber] = useState("");
  
  const [ieeeProof, setIeeeProof] = useState<File | null>(null);
  const [studentProof, setStudentProof] = useState<File | null>(null);
  
  const [extraBanquet, setExtraBanquet] = useState(0);

  const isIeeeMember = ["IEEE", "STUDENT_IEEE"].includes(authorType) || category === "FULL" && authorType === "IEEE";
  const isStudent = ["STUDENT_IEEE", "STUDENT_NON_IEEE"].includes(authorType);

  const calculatedAmount = useMemo(() => {
    return calculateAmount(category, authorType, isLocal, extraBanquet);
  }, [category, authorType, isLocal, extraBanquet]);

  const currency = isLocal ? "LKR" : "USD";

  const nextStep = () => {
    setError(null);
    if (step === 1) {
      if (!firstName || !lastName || !email || !affiliation || !country) {
        setError("Please fill all required fields.");
        return;
      }
    }
    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("affiliation", affiliation);
      formData.append("country", country);
      formData.append("isLocal", isLocal.toString());
      formData.append("registrationCategory", category);
      formData.append("authorType", authorType);
      formData.append("isIeeeMember", isIeeeMember.toString());
      formData.append("isStudent", isStudent.toString());
      formData.append("ieeeMemberNumber", ieeeMemberNumber);
      formData.append("paperIds", paperIds);
      formData.append("extraBanquetTickets", extraBanquet.toString());
      
      if (isIeeeMember && !ieeeProof) throw new Error("IEEE Proof is required.");
      if (isIeeeMember && ieeeProof) formData.append("ieeeProof", ieeeProof);
      
      if (isStudent && !studentProof) throw new Error("Student Proof is required.");
      if (isStudent && studentProof) formData.append("studentProof", studentProof);

      const res = await submitRegistration(formData);

      if (!res.success) {
        throw new Error(res.error);
      }

      // Store success_indicator and invoice_id to verify upon return
      localStorage.setItem("ipg_success_indicator", res.success_indicator!);
      localStorage.setItem("ipg_invoice_id", res.invoice_id!);
      localStorage.setItem("ipg_session_id", res.sessionId!);

      const checkout = (window as any).Checkout;
      if (!checkout) throw new Error("Payment Gateway script not loaded.");

      checkout.configure({ session: { id: res.sessionId } });
      checkout.showPaymentPage();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-primary-600 p-6 text-white text-center">
          <h1 className="text-2xl topic">MERCon 2026 Registration</h1>
          <p className="text-primary-100 mt-2 text-sm para">Step {step} of 3</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold topic mb-4 border-b pb-2">Personal Information</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <select value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded-lg">
                    <option>Mr</option><option>Ms</option><option>Dr</option><option>Prof</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation / University</label>
                <input type="text" value={affiliation} onChange={e=>setAffiliation(e.target.value)} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select value={country} onChange={e=>{
                    setCountry(e.target.value);
                    setIsLocal(e.target.value === "Sri Lanka");
                  }} className="w-full p-2 border rounded-lg">
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residency</label>
                  <select value={isLocal?"true":"false"} onChange={e=>setIsLocal(e.target.value==="true")} className="w-full p-2 border rounded-lg">
                    <option value="true">Local (Sri Lankan)</option>
                    <option value="false">International</option>
                  </select>
                </div>
              </div>

              <button onClick={nextStep} className="w-full mt-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl">Next Step</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold topic mb-4 border-b pb-2">Registration Details</h2>
              
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
                    {category === "FULL" && (
                      <>
                        <option value="IEEE">IEEE Member</option>
                        <option value="NON_IEEE">Non-IEEE Member</option>
                      </>
                    )}
                    {category === "LIMITED" && (
                      <>
                        <option value="IEEE">IEEE Member</option>
                        <option value="NON_IEEE">Non-IEEE Member</option>
                        <option value="STUDENT_IEEE">Student IEEE Member</option>
                        <option value="STUDENT_NON_IEEE">Student Non-IEEE Member</option>
                        <option value="NON_PRESENTING">Non-Presenting Author</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {category !== "PARTICIPANT" && authorType !== "NON_PRESENTING" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paper IDs (Comma separated)</label>
                  <input type="text" value={paperIds} onChange={e=>setPaperIds(e.target.value)} placeholder="e.g. 15, 42" className="w-full p-2 border rounded-lg" />
                  <p className="text-xs text-gray-500 mt-1">Full/Limited authors can present up to 2 papers. Students up to 1 paper.</p>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button onClick={prevStep} className="w-1/3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl">Back</button>
                <button onClick={nextStep} className="w-2/3 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold topic mb-4 border-b pb-2">Proofs & Add-ons</h2>
              
              {isIeeeMember && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">IEEE Membership Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IEEE Member Number</label>
                      <input type="text" value={ieeeMemberNumber} onChange={e=>setIeeeMemberNumber(e.target.value)} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload IEEE Proof (PDF/Image)</label>
                      <input type="file" onChange={e=>setIeeeProof(e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg bg-white" />
                    </div>
                  </div>
                </div>
              )}

              {isStudent && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Student Verification</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Student ID (PDF/Image)</label>
                    <input type="file" onChange={e=>setStudentProof(e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extra Banquet Tickets</label>
                <select value={extraBanquet} onChange={e=>setExtraBanquet(Number(e.target.value))} className="w-full p-2 border rounded-lg">
                  <option value={0}>0 Tickets</option>
                  <option value={1}>1 Ticket (+{isLocal?"10000 LKR":"50 USD"})</option>
                  <option value={2}>2 Tickets (+{isLocal?"20000 LKR":"100 USD"})</option>
                </select>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-800 font-semibold topic">Total Amount</span>
                  <span className="text-2xl font-bold text-primary-600">{currency} {calculatedAmount.toLocaleString(undefined, {minimumFractionDigits:2})}</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={prevStep} disabled={loading} className="w-1/3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl disabled:opacity-50">Back</button>
                  <button onClick={handleSubmit} disabled={loading} className="w-2/3 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl flex justify-center items-center gap-2 disabled:opacity-50">
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
