"use client";

import React, { useEffect, useState } from "react";
import { getAdminUsers, enrollAdmin, exportRegistrationsCsv, ExportFilters } from "@/actions/admin";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import Badge from "@/components/admin/Badge";
import Link from "next/link";
import { COUNTRIES } from "@/constants/countries";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Export states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [exportFilters, setExportFilters] = useState<ExportFilters>({
    paymentStatus: "all",
    category: "all",
    authorType: "all",
    country: "",
    countries: [],
    sortBy: "default",
    sortOrder: "asc",
    includeNoRegistrations: false,
  });
  const [exportLoading, setExportLoading] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Enrollment states
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollEmail, setEnrollEmail] = useState("");
  const [enrollDetails, setEnrollDetails] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    phone: "",
    affiliation: "",
    country: "",
  });
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState<string | null>(null);

  const handleExportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setExportLoading(true);
    setExportError(null);
    const res = await exportRegistrationsCsv(exportFilters);
    if (res.success && res.csv) {
      const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `registrations_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setShowExportModal(false);
    } else {
      setExportError(res.error || "Export failed.");
    }
    setExportLoading(false);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollLoading(true);
    setEnrollMessage(null);
    const res = await enrollAdmin(enrollEmail, enrollDetails);
    if (res.success) {
      setEnrollMessage(res.message || "Admin enrolled successfully!");
      setEnrollEmail("");
      setEnrollDetails({
        title: "Mr.",
        firstName: "",
        lastName: "",
        phone: "",
        affiliation: "",
        country: "",
      });
      // Reload users list
      getAdminUsers().then((resUsers) => {
        if (resUsers.success && resUsers.users) {
          setUsers(resUsers.users);
        }
      });
    } else {
      setEnrollMessage("Error: " + res.error);
    }
    setEnrollLoading(false);
  };

  useEffect(() => {
    getAdminUsers().then((res) => {
      if (res.success && res.users) {
        setUsers(res.users);
      } else {
        setError(res.error || "Failed to load users.");
      }
      setLoading(false);
    });
  }, []);

  const columns: Column<any>[] = [
    {
      key: "id",
      header: "ID",
      render: (row) => <span className="font-mono text-gray-400">#{row.id}</span>,
    },
    {
      key: "name",
      header: "User / Admin",
      render: (row) => (
        <div>
          <div className="font-bold text-white">
            {row.title} {row.firstName} {row.lastName}
          </div>
          <div className="text-xs text-gray-400">{row.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => <Badge status={row.role} type="role" />,
    },
    {
      key: "affiliation",
      header: "Affiliation & Country",
      render: (row) => (
        <div>
          <div className="text-gray-200">{row.affiliation || "N/A"}</div>
          <div className="text-xs text-gray-400">{row.country}</div>
        </div>
      ),
    },

    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <Link
          href={`/admin/users/${row.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-600/20 hover:bg-primary-600 text-primary-300 hover:text-white border border-primary-500/30 transition text-xs font-semibold shadow-[0_0_10px_rgba(34,197,94,0.15)]"
        >
          <span>More Info</span>
          <span>→</span>
        </Link>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/50 text-red-200 rounded-2xl">
        Error: {error}
      </div>
    );
  }

  const tableFilters = [
    {
      key: "role",
      label: "All Roles",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users & Registrations</h1>
          <p className="text-sm text-gray-400">Manage conference attendees, authors, and administrators.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowExportModal(true);
              setExportError(null);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5 text-sm cursor-pointer flex items-center gap-1.5"
          >
            <span>📥 Export CSV</span>
          </button>
          <button
            onClick={() => {
              setShowEnrollModal(true);
              setEnrollMessage(null);
            }}
            className="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:-translate-y-0.5 text-sm cursor-pointer"
          >
            🛡️ Enroll Admin
          </button>
        </div>
      </div>

      <AdminTable
        data={users}
        columns={columns}
        searchPlaceholder="Search by name, email, country, ID..."
        searchKeys={["firstName", "lastName", "email", "country", "affiliation"]}
        filters={tableFilters}
      />

      {/* Export CSV Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📥 Export Registrations (CSV)</span>
              </h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Filter and download registration and attendee details as a structured CSV file. Each registration will be exported as a distinct row containing personal details, payment records, paper info, and verified documents.
            </p>

            {exportError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-xs font-semibold">
                Error: {exportError}
              </div>
            )}

            <form onSubmit={handleExportSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Payment Status</label>
                <select
                  value={exportFilters.paymentStatus || "all"}
                  onChange={(e) => setExportFilters({ ...exportFilters, paymentStatus: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-blue-500 transition"
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Category</label>
                  <select
                    value={exportFilters.category || "all"}
                    onChange={(e) => setExportFilters({ ...exportFilters, category: e.target.value, authorType: "all" })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-blue-500 transition"
                  >
                    <option value="all">All Categories</option>
                    <option value="FULL">Full Registration</option>
                    <option value="LIMITED">Limited Registration</option>
                    <option value="PARTICIPANT">Participant Registration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Author Type</label>
                  <select
                    value={exportFilters.authorType || "all"}
                    disabled={exportFilters.category === "all" || exportFilters.category === "PARTICIPANT"}
                    onChange={(e) => setExportFilters({ ...exportFilters, authorType: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-blue-500 disabled:opacity-40 transition"
                  >
                    {exportFilters.category === "all" ? (
                      <option value="all">Disabled when Category is All</option>
                    ) : exportFilters.category === "PARTICIPANT" ? (
                      <option value="all">N/A for Participant</option>
                    ) : exportFilters.category === "FULL" ? (
                      <>
                        <option value="all">All Author Types</option>
                        <option value="IEEE">IEEE Member</option>
                        <option value="NON_IEEE">Non-IEEE Member</option>
                      </>
                    ) : (
                      <>
                        <option value="all">All Author Types</option>
                        <option value="IEEE">IEEE Member</option>
                        <option value="NON_IEEE">Non-IEEE Member</option>
                        <option value="STUDENT_IEEE">Student (IEEE Member)</option>
                        <option value="STUDENT_NON_IEEE">Student (Non-IEEE)</option>
                        <option value="NON_PRESENTING">Non-Presenting Author</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Country Filter (Select zero or more)</label>
                <div className="relative">
                  <div
                    onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white cursor-pointer flex items-center justify-between transition hover:border-white/40 min-h-[46px]"
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {!exportFilters.countries || exportFilters.countries.length === 0 ? (
                        <span className="text-gray-400">All Countries (No filter applied)</span>
                      ) : (
                        <>
                          {exportFilters.countries.slice(0, 3).map((c) => (
                            <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs">
                              {c}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExportFilters({
                                    ...exportFilters,
                                    countries: exportFilters.countries?.filter((x) => x !== c),
                                  });
                                }}
                                className="hover:text-white"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                          {exportFilters.countries.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/10 text-gray-300 text-xs">
                              +{exportFilters.countries.length - 3} more
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {exportFilters.countries && exportFilters.countries.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExportFilters({ ...exportFilters, countries: [] });
                          }}
                          className="text-xs text-red-400 hover:text-red-300 px-1"
                        >
                          Clear
                        </button>
                      )}
                      <span className="text-gray-400 text-xs">{showCountriesDropdown ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {showCountriesDropdown && (
                    <div className="absolute z-30 left-0 right-0 mt-1.5 bg-gray-900 border border-white/20 rounded-xl shadow-2xl p-3 space-y-2.5 max-h-60 overflow-hidden flex flex-col">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full p-2 bg-black/60 border border-white/15 rounded-lg text-white text-xs outline-none focus:border-blue-500"
                      />
                      <div className="overflow-y-auto space-y-1 pr-1 max-h-44 text-xs">
                        {COUNTRIES.filter((c) => c.toLowerCase().includes(countrySearch.toLowerCase())).map((c) => {
                          const isSelected = exportFilters.countries?.includes(c);
                          return (
                            <label
                              key={c}
                              className="flex items-center gap-2 p-1.5 rounded hover:bg-white/10 cursor-pointer text-gray-200 transition select-none"
                            >
                              <input
                                type="checkbox"
                                checked={!!isSelected}
                                onChange={() => {
                                  const current = exportFilters.countries || [];
                                  const next = isSelected
                                    ? current.filter((x) => x !== c)
                                    : [...current, c];
                                  setExportFilters({ ...exportFilters, countries: next });
                                }}
                                className="rounded bg-black border-white/30 text-blue-500 focus:ring-0 w-3.5 h-3.5"
                              />
                              <span className="truncate">{c}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Sort By</label>
                  <select
                    value={exportFilters.sortBy || "default"}
                    onChange={(e) => setExportFilters({ ...exportFilters, sortBy: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-blue-500 transition"
                  >
                    <option value="default">Default (Created At)</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="country">Country</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Sort Order</label>
                  <select
                    value={exportFilters.sortOrder || "asc"}
                    onChange={(e) => setExportFilters({ ...exportFilters, sortOrder: e.target.value })}
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-xl text-white outline-none focus:border-blue-500 transition"
                  >
                    <option value="asc">Ascending (A-Z)</option>
                    <option value="desc">Descending (Z-A)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="includeNoRegs"
                  checked={!!exportFilters.includeNoRegistrations}
                  onChange={(e) => setExportFilters({ ...exportFilters, includeNoRegistrations: e.target.checked })}
                  className="rounded bg-black/50 border-white/20 text-blue-500 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="includeNoRegs" className="text-xs text-gray-300 cursor-pointer">
                  Include users who haven&apos;t initiated any registrations
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={exportLoading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition shadow-[0_0_15px_rgba(59,130,246,0.3)] text-xs flex items-center gap-2 cursor-pointer"
                >
                  {exportLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating CSV...
                    </>
                  ) : (
                    <>
                      <span>Download CSV</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enroll Admin Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🛡️ Enroll Administrator</span>
              </h2>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>

            {enrollMessage && (
              <div className={`p-4 rounded-xl border text-xs font-semibold ${
                enrollMessage.startsWith("Error")
                  ? "bg-red-500/20 border-red-500/50 text-red-200"
                  : "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
              }`}>
                {enrollMessage}
              </div>
            )}

            <form onSubmit={handleEnrollSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin.name@uom.lk"
                  value={enrollEmail}
                  onChange={(e) => setEnrollEmail(e.target.value)}
                  className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  We will search for this email. If they have a user account, they will be promoted. Otherwise, a new account will be created with the details below, and an invitation to set a password will be sent automatically.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Title</label>
                  <select
                    value={enrollDetails.title}
                    onChange={(e) => setEnrollDetails({ ...enrollDetails, title: e.target.value })}
                    className="w-full p-2.5 bg-black/80 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={enrollDetails.firstName}
                    onChange={(e) => setEnrollDetails({ ...enrollDetails, firstName: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={enrollDetails.lastName}
                    onChange={(e) => setEnrollDetails({ ...enrollDetails, lastName: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+94 77 123 4567"
                    value={enrollDetails.phone}
                    onChange={(e) => setEnrollDetails({ ...enrollDetails, phone: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="Sri Lanka"
                    value={enrollDetails.country}
                    onChange={(e) => setEnrollDetails({ ...enrollDetails, country: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Affiliation / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="University of Moratuwa"
                  value={enrollDetails.affiliation}
                  onChange={(e) => setEnrollDetails({ ...enrollDetails, affiliation: e.target.value })}
                  className="w-full p-2.5 bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={enrollLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {enrollLoading ? "Processing..." : "Enroll Administrator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
