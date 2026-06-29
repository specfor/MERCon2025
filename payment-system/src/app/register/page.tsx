"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <main className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8">
          <h1 className="text-3xl topic text-white mb-2 text-center">Create Account</h1>
          <p className="text-gray-400 para mb-8 text-center">Join MERCon 2026</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" name="email" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input type="password" name="password" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" minLength={6} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <select name="title" className="w-full p-2 border border-white/20 rounded-lg bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <input type="text" name="firstName" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                <input type="text" name="lastName" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <input type="text" name="phone" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Affiliation / Organization</label>
                <input type="text" name="affiliation" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                <select name="country" defaultValue="Sri Lanka" className="w-full p-2 border border-white/20 rounded-lg bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
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
              className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-6 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account? <Link href="/" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">Login here</Link>
          </div>
        </main>
      </div>
      
      {/* Right Column - Logo & Details */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 border-l border-white/10 bg-black/20">
         <Image src="/logo2026.png" width={400} height={400} alt="MERCon 2026 Logo" className="mb-8 w-64 h-auto" />
         <div className="text-center max-w-md">
           <h2 className="text-2xl font-bold text-white mb-4">MERCon 2026 Payment Portal</h2>
           <p className="text-gray-300 leading-relaxed">
             Welcome to the official payment portal for the 12th International Multidisciplinary Engineering Research Conference. Please login or register to complete your conference registration and payment securely.
           </p>
         </div>
      </div>
    </div>
  );
}
