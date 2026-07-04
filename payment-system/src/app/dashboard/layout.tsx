"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "My Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Register", href: "/dashboard/register", icon: "📝" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#040d09] text-white">
      {/* User Dashboard Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 px-6 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-500/50 flex items-center justify-center text-primary-400 font-bold text-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              🎓
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wider block leading-none">MERCon 2026</span>
              <span className="text-xs text-primary-400 uppercase tracking-widest font-semibold">Payment & Registration</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {navItems.map((item) => {
              const active = item.href === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname.startsWith(item.href);

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

      {/* Page Content */}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>

      {/* User Dashboard Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-8 px-6 mt-12 print:hidden text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>
            <span className="font-bold text-white block">MERCon 2026</span>
            <span className="text-xs text-gray-500">12th International Multidisciplinary Engineering Research Conference</span>
          </div>
          <div className="text-center sm:text-right">
            <p>For assistance, contact the organizing committee at <a href="mailto:mercon@uom.lk" className="text-primary-400 hover:underline">mercon@uom.lk</a></p>
            <p className="text-xs text-gray-500 mt-1">© 2026 MERCon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
