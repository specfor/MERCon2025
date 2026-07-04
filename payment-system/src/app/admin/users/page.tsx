"use client";

import React, { useEffect, useState } from "react";
import { getAdminUsers, enrollAdmin } from "@/actions/admin";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import Badge from "@/components/admin/Badge";
import Link from "next/link";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      key: "category",
      header: "Registration",
      render: (row) => (
        <div>
          <Badge status={row.registrationCategory} type="category" />
          <div className="text-xs text-gray-400 mt-1">{row.authorType}</div>
        </div>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (row) => (
        <div className="space-y-1">
          <Badge status={row.paymentStatus} type="payment" />
          {row.refundStatus === "refunded" && (
            <div className="text-[10px] text-purple-400 font-semibold uppercase">Refunded</div>
          )}
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
    {
      key: "paymentStatus",
      label: "All Payment Statuses",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    {
      key: "registrationCategory",
      label: "All Categories",
      options: [
        { label: "FULL", value: "FULL" },
        { label: "LIMITED", value: "LIMITED" },
        { label: "WORKSHOP", value: "WORKSHOP" },
        { label: "ATTENDEE", value: "ATTENDEE" },
        { label: "Unregistered", value: "Unregistered" },
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

      <AdminTable
        data={users}
        columns={columns}
        searchPlaceholder="Search by name, email, country, ID..."
        searchKeys={["firstName", "lastName", "email", "country", "affiliation", "registrationCategory"]}
        filters={tableFilters}
      />

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
