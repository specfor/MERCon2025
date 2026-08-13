"use client";

import { useState, useRef } from "react";
import { initiateRegistration, verifyEmailCode, completeRegistration } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { COUNTRIES } from "@/constants/countries";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Stored state between steps
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Step 1: Submit Credentials & Send OTP
  const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const inputEmail = formData.get("email") as string;
    const inputPassword = formData.get("password") as string;
    const inputConfirmPassword = formData.get("confirmPassword") as string;

    if (inputPassword !== inputConfirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      setLoading(false);
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    if (siteKey && !isBypassed) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
      formData.append("recaptchaToken", token);
    }

    const result = await initiateRegistration(formData);

    if (!result.success) {
      setError(result.error || "Failed to initiate registration.");
      setLoading(false);
      recaptchaRef.current?.reset();
    } else {
      setEmail(inputEmail);
      setPassword(inputPassword);
      setStep(2);
      setLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP Code
  const handleStep2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!codeInput || codeInput.trim().length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      setLoading(false);
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    let token = "";
    if (siteKey && !isBypassed) {
      token = recaptchaRef.current?.getValue() || "";
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
    }

    const result = await verifyEmailCode(email, codeInput.trim(), token);

    if (!result.success) {
      setError(result.error || "Invalid verification code.");
      setLoading(false);
      if (siteKey && !isBypassed) recaptchaRef.current?.reset();
    } else {
      setVerificationCode(codeInput.trim());
      setStep(3);
      setLoading(false);
      setError(null);
    }
  };

  // Step 3: Complete Personal & Affiliation Details
  const handleStep3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const country = formData.get("country") as string;
    const isLocal = country.toLowerCase() === "sri lanka";
    formData.append("isLocal", isLocal.toString());
    formData.append("email", email);
    formData.append("verificationCode", verificationCode);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    if (siteKey && !isBypassed) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
      formData.append("recaptchaToken", token);
    }

    const result = await completeRegistration(formData);

    if (!result.success) {
      setError(result.error || "Failed to complete account registration.");
      setLoading(false);
      if (siteKey && !isBypassed) recaptchaRef.current?.reset();
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
        <main className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8">
          
          {/* Step Progress Bar */}
          <div className="flex justify-between items-center mb-8 px-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary-400 font-bold" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? "bg-primary-500 text-white" : "bg-white/10 text-gray-400"}`}>1</div>
              <span className="text-xs sm:text-sm">Account</span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? "bg-primary-500" : "bg-white/10"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary-400 font-bold" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? "bg-primary-500 text-white" : "bg-white/10 text-gray-400"}`}>2</div>
              <span className="text-xs sm:text-sm">Verify</span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? "bg-primary-500" : "bg-white/10"}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary-400 font-bold" : "text-gray-500"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? "bg-primary-500 text-white" : "bg-white/10 text-gray-400"}`}>3</div>
              <span className="text-xs sm:text-sm">Details</span>
            </div>
          </div>

          <h1 className="text-3xl topic text-white mb-2 text-center">
            {step === 1 && "Create Account"}
            {step === 2 && "Verify Email"}
            {step === 3 && "Personal Details"}
          </h1>
          <p className="text-gray-400 para mb-8 text-center">
            {step === 1 && "Join MERCon 2026"}
            {step === 2 && `Enter the 6-digit code sent to ${email}`}
            {step === 3 && "Complete your contact and organization profile"}
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Account Credentials */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" name="email" defaultValue={email} required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" placeholder="you@example.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input type="password" name="password" defaultValue={password} required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" minLength={6} placeholder="At least 6 characters" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input type="password" name="confirmPassword" defaultValue={password} required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" minLength={6} placeholder="Confirm your password" />
                </div>
              </div>
              
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
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
                className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-6 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
              >
                {loading ? "Sending verification code..." : "Continue to Verification →"}
              </button>
            </form>
          )}

          {/* Step 2: Verification Code Input */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-6">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-300 mb-3 text-center">6-Digit Verification Code</label>
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  maxLength={6}
                  pattern="[0-9]*"
                  required
                  placeholder="123456"
                  className="w-56 text-center text-3xl tracking-[0.5em] font-mono p-3 border border-white/20 rounded-xl bg-white/10 text-primary-400 focus:ring-2 focus:ring-primary-500 outline-none transition shadow-inner font-bold"
                />
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Please check your inbox (and spam folder) for the confirmation email.
                </p>
              </div>

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
                <div className="flex justify-center mt-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || codeInput.length !== 6}
                className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify & Continue →"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setError(null); setStep(1); }}
                  className="text-xs text-gray-400 hover:text-white underline transition"
                >
                  ← Change Email Address / Request New Code
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <form onSubmit={handleStep3} className="space-y-4">
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
                  <input type="text" name="phone" pattern="[0-9]+" title="Only numbers are allowed" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" placeholder="e.g. 94771234567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Affiliation / Organization</label>
                  <input type="text" name="affiliation" required className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition" placeholder="University of Moratuwa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                  <select name="country" defaultValue="Sri Lanka" className="w-full p-2 border border-white/20 rounded-lg bg-[#081a12] text-white focus:ring-2 focus:ring-primary-500 outline-none transition">
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
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
                className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-6 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
              >
                {loading ? "Completing registration..." : "Complete Registration"}
              </button>
            </form>
          )}

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
