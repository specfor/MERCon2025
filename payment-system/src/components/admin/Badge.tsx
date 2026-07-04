"use client";

import React from "react";

interface BadgeProps {
  status: string;
  type?: "payment" | "role" | "category" | "default";
}

export default function Badge({ status, type = "default" }: BadgeProps) {
  const lower = status ? status.toLowerCase() : "unknown";

  let styles = "bg-gray-500/20 text-gray-300 border-gray-500/30";

  if (type === "payment" || ["completed", "success", "paid"].includes(lower)) {
    if (["completed", "success", "paid"].includes(lower)) {
      styles = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
    } else if (["pending", "processing"].includes(lower)) {
      styles = "bg-amber-500/20 text-amber-300 border-amber-500/40";
    } else if (["failed", "cancelled", "error"].includes(lower)) {
      styles = "bg-red-500/20 text-red-300 border-red-500/40";
    } else if (["refunded"].includes(lower)) {
      styles = "bg-purple-500/20 text-purple-300 border-purple-500/40";
    }
  } else if (type === "role" || ["admin", "user"].includes(lower)) {
    if (lower === "admin") {
      styles = "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold uppercase tracking-wider";
    } else {
      styles = "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  } else if (type === "category") {
    styles = "bg-teal-500/20 text-teal-300 border-teal-500/30 font-semibold";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
}
