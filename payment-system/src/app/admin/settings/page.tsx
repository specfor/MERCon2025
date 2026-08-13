"use client";

import React, { useEffect, useState } from "react";
import { getSettings, updateSetting } from "@/actions/admin";

export default function AdminSettingsPage() {
  const [rate, setRate] = useState("300");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Calculator state
  const [calcUsd, setCalcUsd] = useState("350");

  useEffect(() => {
    getSettings().then((res) => {
      if (res.success && res.settings) {
        if (res.settings["usd_to_lkr_rate"]) {
          setRate(res.settings["usd_to_lkr_rate"]);
        }
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await updateSetting("usd_to_lkr_rate", rate);
    if (res.success) {
      setMessage("Exchange rate setting updated and audited successfully!");
    } else {
      setMessage("Error: " + res.error);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-3"></div>
        Loading configuration...
      </div>
    );
  }

  const numRate = parseFloat(rate) || 0;
  const numUsd = parseFloat(calcUsd) || 0;
  const calculatedLkr = numUsd * numRate;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings & Currency Configuration</h1>
        <p className="text-sm text-gray-400">Manage real-time conversion rates applied at the checkout perimeter.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Exchange Rate Config Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center justify-between">
            <span>💱 USD to LKR Exchange Rate</span>
            <span className="text-xs text-primary-400 font-mono">Active</span>
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                1 USD = ? LKR (Sri Lankan Rupees)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400 font-bold">LKR</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white text-lg font-bold outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                All foreign conference registrations priced in USD will be multiplied by this rate before initiating the payment gateway session.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer mt-4"
            >
              {saving ? "Saving & Auditing..." : "Update Exchange Rate"}
            </button>
          </form>
        </div>

        {/* Live Conversion Preview Calculator */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-black/40 to-black/60 backdrop-blur-md rounded-2xl border border-emerald-500/30 p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-emerald-300 border-b border-emerald-500/20 pb-3 flex items-center justify-between">
              <span>🧮 Live Perimeter Calculator</span>
              <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Preview</span>
            </h2>
            <p className="text-xs text-gray-300 mt-3">
              Test how much an international registrant will be charged in LKR at checkout based on the configured rate above.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Test USD Registration Amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    step="1"
                    value={calcUsd}
                    onChange={(e) => setCalcUsd(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-black/60 border border-white/10 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-black/60 rounded-xl border border-emerald-500/40 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Conversion Formula</span>
                  <span className="font-mono">{numUsd} USD × {numRate} LKR</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Billed to Card:</span>
                  <span className="text-emerald-400 font-mono">LKR {calculatedLkr.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 text-center border-t border-white/5 pt-3">
            Changes to settings are logged to the audit trail with admin timestamp and email.
          </div>
        </div>
      </div>
    </div>
  );
}
