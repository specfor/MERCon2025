"use client";

import React, { useEffect, useState } from "react";
import { getAllPayments } from "@/actions/admin";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import Badge from "@/components/admin/Badge";
import Link from "next/link";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPayments().then((res) => {
      if (res.success && res.payments) {
        setPayments(res.payments);
      } else {
        setError(res.error || "Failed to load payments.");
      }
      setLoading(false);
    });
  }, []);

  const columns: Column<any>[] = [
    {
      key: "id",
      header: "Attempt #",
      render: (row) => <span className="font-mono text-gray-400">#{row.id}</span>,
    },
    {
      key: "user",
      header: "User Details",
      render: (row) => (
        <div>
          <div className="font-bold text-white">{row.userName}</div>
          <div className="text-xs text-gray-400">{row.userEmail}</div>
        </div>
      ),
    },
    {
      key: "invoiceId",
      header: "Invoice / Order ID",
      render: (row) => (
        <div className="font-mono text-xs space-y-0.5">
          <div className="text-primary-300 font-bold">INV: {row.invoiceId}</div>
          <div className="text-gray-400">ORD: {row.orderId}</div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount Billed",
      render: (row) => (
        <div>
          <div className="font-bold text-white">
            {row.currency} {Number(row.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          {row.currency === "USD" && row.lkrAmount && (
            <div className="text-xs text-emerald-400 font-medium">
              ≈ LKR {Number(row.lkrAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="text-[10px] text-gray-400 block">(@ {row.exchangeRate} LKR/USD)</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Payment Status",
      render: (row) => (
        <div className="flex flex-col gap-1 items-start">
          <Badge status={row.status} type="payment" />
          {row.refundStatus === "refunded" && (
            <span className="inline-block px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">
              REFUNDED
            </span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (row) => <span className="text-xs text-gray-400">{new Date(row.createdAt).toLocaleString()}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) =>
        row.userId ? (
          <Link
            href={`/admin/users/${row.userId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-600/20 hover:bg-primary-600 text-primary-300 hover:text-white border border-primary-500/30 transition text-xs font-semibold shadow-[0_0_10px_rgba(34,197,94,0.15)]"
          >
            <span>More Info</span>
            <span>→</span>
          </Link>
        ) : (
          <span className="text-xs text-gray-500">No User</span>
        ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
        Loading payment ledger...
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
      key: "status",
      label: "All Statuses",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments Ledger</h1>
          <p className="text-sm text-gray-400">Comprehensive tabular ledger of all gateway transaction attempts and conversions.</p>
        </div>
      </div>

      <AdminTable
        data={payments}
        columns={columns}
        searchPlaceholder="Search invoice, order ID, user name, email..."
        searchKeys={["invoiceId", "orderId", "userName", "userEmail", "status", "paymentStatus"]}
        filters={tableFilters}
      />
    </div>
  );
}
