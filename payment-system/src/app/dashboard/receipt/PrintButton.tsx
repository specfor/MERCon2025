"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
    >
      Download / Print Receipt
    </button>
  );
}
