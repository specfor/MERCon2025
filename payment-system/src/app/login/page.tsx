"use client";

import { useState } from "react";
import { loginUser } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);
    
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-secondary-50 p-4">
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
        <h1 className="text-3xl topic text-primary-600 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 para mb-8 text-center">Login to manage your MERCon 2026 Registration</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <Link href="/register" className="text-primary-600 font-bold hover:underline">Register here</Link>
        </div>
      </main>
    </div>
  );
}
