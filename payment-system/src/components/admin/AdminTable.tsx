"use client";

import React, { useState, useMemo } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
}

export default function AdminTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search...",
  searchKeys = [],
}: AdminTableProps<T>) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredData = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) => {
      if (searchKeys.length > 0) {
        return searchKeys.some((k) => String(row[k] || "").toLowerCase().includes(q));
      }
      return Object.values(row).some((val) => String(val || "").toLowerCase().includes(q));
    });
  }, [data, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition"
          />
          <span className="absolute left-3.5 top-2.5 text-gray-400">🔍</span>
        </div>
        <div className="text-sm text-gray-400">
          Showing <span className="font-bold text-white">{filteredData.length}</span> records
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-black/40 text-gray-300 text-xs font-semibold uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className="p-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-white/[0.03] transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="p-4 whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md text-sm">
          <span className="text-gray-400">
            Page <span className="font-bold text-white">{currentPage}</span> of <span className="font-bold text-white">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
