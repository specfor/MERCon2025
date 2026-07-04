"use client";

import React, { useEffect, useState } from "react";
import { getAdminUsers } from "@/actions/admin";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import Badge from "@/components/admin/Badge";
import Link from "next/link";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users & Registrations</h1>
          <p className="text-sm text-gray-400">Manage conference attendees, authors, and administrators.</p>
        </div>
      </div>

      <AdminTable
        data={users}
        columns={columns}
        searchPlaceholder="Search by name, email, country, ID..."
        searchKeys={["firstName", "lastName", "email", "country", "affiliation", "registrationCategory"]}
      />
    </div>
  );
}
