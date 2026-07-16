"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserDetails, updateUserInfo, updateRegistrationInfo, refundPayment, toggleDocumentReviewed } from "@/actions/admin";
import Badge from "@/components/admin/Badge";
import Link from "next/link";
import { formatLocalTime } from "@/lib/formatDate";

const renderLogDetails = (detailsStr: string) => {
  try {
    const parsed = JSON.parse(detailsStr);
    if (parsed && typeof parsed === "object") {
      const { changes, message } = parsed;
      if (changes && typeof changes === "object") {
        const changeEntries = Object.entries(changes);
        if (changeEntries.length === 0) {
          return <div className="text-gray-400 italic text-[11px]">No values were modified.</div>;
        }
        return (
          <div className="space-y-1.5 mt-1 text-gray-300">
            {changeEntries.map(([field, diff]: [string, any]) => (
              <div key={field} className="flex flex-wrap gap-x-2 items-center text-[11px] leading-tight">
                <span className="font-semibold text-gray-300 uppercase tracking-wider text-[10px]">{field}:</span>
                <span className="line-through text-red-400 bg-red-950/30 px-1 py-0.5 rounded font-mono">{String(diff.from)}</span>
                <span className="text-gray-500">→</span>
                <span className="text-emerald-400 bg-emerald-950/30 px-1 py-0.5 rounded font-mono">{String(diff.to)}</span>
              </div>
            ))}
            {message && <div className="text-gray-400 italic text-[11px] mt-1.5 border-t border-white/5 pt-1">{message}</div>}
          </div>
        );
      }
    }
    return <pre className="text-gray-400 font-mono text-[11px] break-all whitespace-pre-wrap m-0 p-0 bg-transparent border-0">{JSON.stringify(parsed, null, 2)}</pre>;
  } catch (e) {
    return <span className="text-gray-400 font-mono text-[11px] break-all whitespace-pre-wrap">{detailsStr}</span>;
  }
};

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = Number(params.id);
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Collapsible accordion state for registration cards
  const [openRegs, setOpenRegs] = useState<Record<number, boolean>>({});

  // Form states
  const [userForm, setUserForm] = useState<any>({});
  const [regForm, setRegForm] = useState<any>({});
  const [savingUser, setSavingUser] = useState(false);
  const [savingReg, setSavingReg] = useState(false);
  const [refunding, setRefunding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const toggleReg = (regId: number) => {
    setOpenRegs((prev) => ({
      ...prev,
      [regId]: !prev[regId],
    }));
  };

  const loadData = () => {
    setLoading(true);
    getUserDetails(userId).then((res) => {
      if (res.success && res.data) {
        setData(res.data);
        setUserForm({
          title: res.data.user.title || "",
          firstName: res.data.user.firstName || "",
          lastName: res.data.user.lastName || "",
          phone: res.data.user.phone || "",
          affiliation: res.data.user.affiliation || "",
          country: res.data.user.country || "",
          role: res.data.user.role || "user",
        });
        if (res.data.registrations && res.data.registrations.length > 0) {
          const forms: Record<number, any> = {};
          res.data.registrations.forEach((reg: any) => {
            forms[reg.id] = {
              registrationCategory: reg.registrationCategory || "FULL",
              authorType: reg.authorType || "IEEE",
              paperIds: reg.paperIds || "",
              extraBanquetTickets: reg.extraBanquetTickets || 0,
              amount: reg.amount || 0,
              currency: reg.currency || "USD",
            };
          });
          setRegForm(forms);
        }
      } else {
        setError(res.error || "Failed to load user details.");
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userId) loadData();
  }, [userId]);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingUser(true);
    setMessage(null);
    const res = await updateUserInfo(userId, userForm);
    if (res.success) {
      setMessage("User information updated successfully!");
      loadData();
    } else {
      setMessage("Error: " + res.error);
    }
    setSavingUser(false);
  };

  const handleSaveReg = async (regId: number, e: React.FormEvent) => {
    e.preventDefault();
    setSavingReg(true);
    setMessage(null);
    const res = await updateRegistrationInfo(regId, userId, regForm[regId]);
    if (res.success) {
      setMessage("Registration details updated successfully!");
      loadData();
    } else {
      setMessage("Error: " + res.error);
    }
    setSavingReg(false);
  };

  const handleRefund = async (regId: number) => {
    if (!confirm("Are you sure you want to mark this payment as refunded? This action will be logged.")) return;
    setRefunding(true);
    setMessage(null);
    const res = await refundPayment(regId, userId);
    if (res.success) {
      setMessage("Payment successfully refunded!");
      loadData();
    } else {
      setMessage("Error: " + res.error);
    }
    setRefunding(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
        Loading details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/50 text-red-200 rounded-2xl">
        Error: {error || "User not found"}
      </div>
    );
  }

  const { user, registrations, adminPerformedLogs, targetLogs } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin/users" className="text-sm text-primary-400 hover:text-primary-300 transition block mb-2">
            ← Back to Users List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">
              {user.title} {user.firstName} {user.lastName}
            </h1>
            <Badge status={user.role} type="role" />
          </div>
          <p className="text-sm text-gray-400">User ID: #{user.id} | Email: {user.email}</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border text-sm font-medium ${
          message.startsWith("Error")
            ? "bg-red-500/20 border-red-500/50 text-red-200"
            : "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Profile Form Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center justify-between">
            <span>👤 User Profile & Role</span>
            <span className="text-xs text-gray-400">Editable</span>
          </h2>
          <form onSubmit={handleSaveUser} className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={userForm.title || ""}
                  onChange={(e) => setUserForm({ ...userForm, title: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">First Name</label>
                <input
                  type="text"
                  value={userForm.firstName || ""}
                  onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Last Name</label>
                <input
                  type="text"
                  value={userForm.lastName || ""}
                  onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={userForm.phone || ""}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Role</label>
                <select
                  value={userForm.role || "user"}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full p-2.5 bg-black/80 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Affiliation</label>
                <input
                  type="text"
                  value={userForm.affiliation || ""}
                  onChange={(e) => setUserForm({ ...userForm, affiliation: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Country</label>
                <input
                  type="text"
                  value={userForm.country || ""}
                  onChange={(e) => setUserForm({ ...userForm, country: e.target.value })}
                  className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingUser}
              className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {savingUser ? "Saving User..." : "Save User Changes"}
            </button>
          </form>
        </div>

        {/* Registrations List */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl space-y-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
            📝 Registrations & Payment Attempts
          </h2>
          
          {registrations && registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((registration: any) => {
                const isOpen = !!openRegs[registration.id];
                return (
                  <div key={registration.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-200 hover:border-white/20">
                    
                    {/* Collapsible Header Accordion Bar */}
                    <button
                      type="button"
                      onClick={() => toggleReg(registration.id)}
                      className={`w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 text-left focus:outline-none transition-all ${
                        isOpen ? "bg-white/5 border-b border-white/10" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 text-lg">
                          📝
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">Registration #{registration.id}</span>
                            <span className="text-xs text-gray-400 font-mono">({registration.registrationCategory})</span>
                          </div>
                          <span className="text-xs text-gray-400 block mt-0.5">
                            Author: {registration.authorType.replace(/_/g, ' ')} {registration.paperIds ? `• Papers: ${registration.paperIds}` : ""}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
                        <div className="text-right hidden sm:block">
                          <span className="text-xs text-gray-400 block">Total Billed</span>
                          <span className="text-sm font-bold text-emerald-400">{registration.currency} {Number(registration.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <Badge status={registration.paymentStatus} type="payment" />
                        <span className="text-gray-400 font-bold text-lg select-none px-2 transition-transform duration-200">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </div>
                    </button>

                    {/* Expandable Accordion Body */}
                    {isOpen && (
                      <div className="p-5 space-y-6 bg-black/20">
                        <form onSubmit={(e) => handleSaveReg(registration.id, e)} className="space-y-4 text-sm">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Left Column: Form Settings */}
                            <div className="lg:col-span-2 space-y-4">
                              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-white/5 pb-2">Registration Settings</h4>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-400 mb-1">Category</label>
                                  <select
                                    value={regForm[registration.id]?.registrationCategory || "FULL"}
                                    onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], registrationCategory: e.target.value } })}
                                    className="w-full p-2.5 bg-black/80 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 transition"
                                  >
                                    <option value="FULL">FULL</option>
                                    <option value="LIMITED">LIMITED</option>
                                    <option value="WORKSHOP">WORKSHOP</option>
                                    <option value="ATTENDEE">ATTENDEE</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-gray-400 mb-1">Author Type</label>
                                  <select
                                    value={regForm[registration.id]?.authorType || "IEEE"}
                                    onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], authorType: e.target.value } })}
                                    className="w-full p-2.5 bg-black/80 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 transition"
                                  >
                                    <option value="IEEE">IEEE Member</option>
                                    <option value="NON_IEEE">Non-IEEE Member</option>
                                    <option value="STUDENT_IEEE">Student IEEE</option>
                                    <option value="STUDENT_NON_IEEE">Student Non-IEEE</option>
                                    <option value="NON_PRESENTING">Non-Presenting</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                  <label className="block text-gray-400 mb-1">Paper IDs (comma separated)</label>
                                  <input
                                    type="text"
                                    value={regForm[registration.id]?.paperIds || ""}
                                    onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], paperIds: e.target.value } })}
                                    placeholder="e.g. 101, 102"
                                    className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 font-mono transition"
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-400 mb-1">Extra Banquet</label>
                                  <input
                                    type="number"
                                    min={0}
                                    value={regForm[registration.id]?.extraBanquetTickets || 0}
                                    onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], extraBanquetTickets: Number(e.target.value) } })}
                                    className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 transition"
                                  />
                                </div>
                              </div>

                              <div className="p-3 bg-black/30 rounded-xl border border-white/10 space-y-2.5">
                                <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Uploaded Documents & Review Status</div>
                                <div className="flex flex-col gap-2">
                                  {registration.ieeeProofPath ? (
                                    <div className="flex items-center justify-between gap-3 bg-white/5 p-2 rounded-lg border border-white/10 text-xs">
                                      <a href={`/api/uploads?path=${encodeURIComponent(registration.ieeeProofPath)}`} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline flex items-center gap-1.5 font-medium truncate max-w-[200px]">
                                        📄 IEEE Proof
                                      </a>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          const res = await toggleDocumentReviewed(registration.id, Number(userId), "ieee", !registration.ieeeProofReviewed);
                                          if (res.success) {
                                            loadData();
                                          } else {
                                            setMessage(`Error: ${res.error}`);
                                          }
                                        }}
                                        className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition shrink-0 ${
                                          registration.ieeeProofReviewed
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                        }`}
                                      >
                                        {registration.ieeeProofReviewed ? "✓ Reviewed" : "Mark as Reviewed"}
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 text-xs px-2 py-1">No IEEE Proof</div>
                                  )}
                                  {registration.studentProofPath ? (
                                    <div className="flex items-center justify-between gap-3 bg-white/5 p-2 rounded-lg border border-white/10 text-xs">
                                      <a href={`/api/uploads?path=${encodeURIComponent(registration.studentProofPath)}`} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline flex items-center gap-1.5 font-medium truncate max-w-[200px]">
                                        📄 Student Proof
                                      </a>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          const res = await toggleDocumentReviewed(registration.id, Number(userId), "student", !registration.studentProofReviewed);
                                          if (res.success) {
                                            loadData();
                                          } else {
                                            setMessage(`Error: ${res.error}`);
                                          }
                                        }}
                                        className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition shrink-0 ${
                                          registration.studentProofReviewed
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                        }`}
                                      >
                                        {registration.studentProofReviewed ? "✓ Reviewed" : "Mark as Reviewed"}
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 text-xs px-2 py-1">No Student Proof</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Pricing details & Actions */}
                            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider border-b border-white/5 pb-2 mb-3">Pricing details</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-gray-400 mb-1">Amount</label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={regForm[registration.id]?.amount || 0}
                                      onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], amount: Number(e.target.value) } })}
                                      className="w-full p-2.5 bg-black/30 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 font-mono transition"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-gray-400 mb-1">Currency</label>
                                    <select
                                      value={regForm[registration.id]?.currency || "USD"}
                                      onChange={(e) => setRegForm({ ...regForm, [registration.id]: { ...regForm[registration.id], currency: e.target.value } })}
                                      className="w-full p-2.5 bg-black/85 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500 transition"
                                    >
                                      <option value="USD">USD</option>
                                      <option value="LKR">LKR</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-400 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Base LKR Billed:</span>
                                    <span className="font-mono text-gray-200">LKR {Number(registration.lkrAmount || 0).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Exchange Rate:</span>
                                    <span className="font-mono text-gray-200">1 USD = {registration.exchangeRate || 300} LKR</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                                <button
                                  type="submit"
                                  disabled={savingReg}
                                  className="w-full py-2 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold transition shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-50 cursor-pointer"
                                >
                                  {savingReg ? "Saving..." : "Save Details"}
                                </button>
                                
                                {registration.paymentStatus === "completed" && registration.refundStatus !== "refunded" && (
                                  <button
                                    type="button"
                                    onClick={() => handleRefund(registration.id)}
                                    disabled={refunding}
                                    className="w-full py-2 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 font-semibold transition disabled:opacity-50 cursor-pointer animate-pulse"
                                  >
                                    {refunding ? "Refunding..." : "Refund Payment"}
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        </form>
                        
                        {/* Nested Payment Attempts Table */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            💳 Payment Attempts ({registration.attempts?.length || 0})
                          </h4>
                          {registration.attempts && registration.attempts.length > 0 ? (
                            <div className="overflow-x-auto rounded-xl border border-white/5">
                              <table className="w-full text-left text-sm border-collapse bg-black/40">
                                <thead>
                                  <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase font-semibold bg-white/5">
                                    <th className="py-2 px-3">Invoice ID</th>
                                    <th className="py-2 px-3">Order ID</th>
                                    <th className="py-2 px-3">Session ID</th>
                                    <th className="py-2 px-3">Status</th>
                                    <th className="py-2 px-3 text-right">Date</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-200 text-xs">
                                  {registration.attempts.map((att: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-white/[0.02]">
                                      <td className="py-2 px-3 font-mono">{att.invoiceId || "—"}</td>
                                      <td className="py-2 px-3 font-mono">{att.orderId || "—"}</td>
                                      <td className="py-2 px-3 font-mono text-[10px] text-gray-400 max-w-xs truncate">{att.sessionId || "—"}</td>
                                      <td className="py-2 px-3"><Badge status={att.status} type="payment" /></td>
                                      <td className="py-2 px-3 text-right text-gray-400 font-mono">{formatLocalTime(att.createdAt)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-gray-400 text-xs italic bg-white/5 p-3 rounded-xl border border-white/5 text-center">No payment attempts recorded for this registration.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              This user has not initiated any registrations yet.
            </div>
          )}
        </div>
      </div>

      {/* Audit Logs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* If User is Admin - Actions Performed */}
        {user.role === "admin" && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-amber-300 border-b border-white/10 pb-3 flex items-center gap-2">
              <span>🛡️ Admin Actions Performed ({adminPerformedLogs.length})</span>
            </h2>
            {adminPerformedLogs.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {adminPerformedLogs.map((log: any, idx: number) => (
                  <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs space-y-1">
                    <div className="flex justify-between items-center text-amber-400 font-semibold">
                      <span>[{log.action}]</span>
                      <span className="text-gray-400 font-normal">{formatLocalTime(log.createdAt)}</span>
                    </div>
                    <div className="text-gray-300">Target User: <Link href={`/admin/users/${log.targetId}`} className="text-primary-400 hover:underline font-semibold font-mono">#{log.targetId}</Link></div>
                    <div className="text-gray-400 bg-black/60 p-3 rounded-xl border border-white/5 overflow-x-auto">
                      {renderLogDetails(log.details)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">This admin has not performed any logged actions yet.</p>
            )}
          </div>
        )}

        {/* Actions Performed ON This User */}
        <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl space-y-4 ${user.role !== "admin" ? "lg:col-span-2" : ""}`}>
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
            📋 Audit Log: Actions on User ({targetLogs.length})
          </h2>
          {targetLogs.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {targetLogs.map((log: any, idx: number) => (
                <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between items-center text-primary-300 font-semibold">
                    <span>[{log.action}] by {log.adminEmail}</span>
                    <span className="text-gray-400 font-normal">{formatLocalTime(log.createdAt)}</span>
                  </div>
                  <div className="text-gray-400 bg-black/60 p-3 rounded-xl border border-white/5 overflow-x-auto">
                    {renderLogDetails(log.details)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No administrative changes recorded for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}
