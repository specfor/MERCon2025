"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const country = formData.get("country") as string;
    const isLocal = country.toLowerCase() === "sri lanka";
    formData.append("isLocal", isLocal.toString());

    const result = await registerUser(formData);
    
    if (!result.success) {
      setError(result.error || "Registration failed");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-secondary-50 p-4">
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
        <h1 className="text-3xl topic text-primary-600 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 para mb-8 text-center">Join MERCon 2026</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" required className="w-full p-2 border rounded-lg" minLength={6} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <select name="title" className="w-full p-2 border rounded-lg">
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" name="firstName" required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" name="lastName" required className="w-full p-2 border rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" name="phone" required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation / Organization</label>
              <input type="text" name="affiliation" required className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select name="country" defaultValue="Sri Lanka" className="w-full p-2 border rounded-lg">
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all mt-6"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-primary-600 font-bold hover:underline">Login here</Link>
        </div>
      </main>
    </div>
  );
}
