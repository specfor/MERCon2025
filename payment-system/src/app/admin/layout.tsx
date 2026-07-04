"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Users & Registrations", href: "/admin/users", icon: "👥" },
    { label: "Payments Ledger", href: "/admin/payments", icon: "💳" },
    { label: "Settings & Rates", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-[#081a12] to-black text-white flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-500/50 flex items-center justify-center text-primary-400 font-bold text-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              🛡️
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wider block leading-none">MERCon 2026</span>
              <span className="text-xs text-primary-400 uppercase tracking-widest font-semibold">Admin Security Portal</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-primary-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] border border-primary-500/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => logoutUser()}
            className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-sm font-semibold transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
