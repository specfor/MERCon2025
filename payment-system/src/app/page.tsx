"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-secondary-50 p-4">
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-center p-8">
        <h1 className="text-3xl topic text-primary-600 mb-2">MERCon 2026</h1>
        <p className="text-gray-600 para mb-8">12th International Multidisciplinary Engineering Research Conference</p>
        
        <Link 
          href="/registration" 
          className="block w-full py-4 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Register Now
        </Link>
      </main>
    </div>
  );
}
