"use client";

import { useState } from "react";
import { loginUser } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
      formData.append("recaptchaToken", token);
    }

    const result = await loginUser(formData);
    
    if (!result.success) {
      setError(result.error || "Login failed");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative">
      <nav className="absolute top-0 w-full p-6 z-50 flex justify-center pointer-events-none">
         <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg pointer-events-auto">
            <span className="text-white font-bold tracking-widest text-sm uppercase">Secure Payment Portal</span>
         </div>
      </nav>

      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 pt-24">
        <main className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8">
          <h1 className="text-3xl topic text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-gray-400 para mb-8 text-center">Login to manage your MERCon 2026 Registration</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" name="email" required className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input type="password" name="password" required className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" />
            </div>
            
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-4 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account? <Link href="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">Register here</Link>
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
