"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { requestPasswordReset, verifyPasswordResetCode, resetPassword } from "@/actions/auth";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const recaptchaRef1 = useRef<ReCAPTCHA>(null);
  const recaptchaRef2 = useRef<ReCAPTCHA>(null);
  const recaptchaRef3 = useRef<ReCAPTCHA>(null);

  // Step 1: Request OTP code
  const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    const inputEmail = formData.get("email") as string;
    setEmail(inputEmail);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    if (siteKey && !isBypassed) {
      const token = recaptchaRef1.current?.getValue();
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
      formData.append("recaptchaToken", token);
    }

    const result = await requestPasswordReset(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to send reset code.");
      if (siteKey && !isBypassed) recaptchaRef1.current?.reset();
    } else {
      setSuccessMsg("If an account exists with this email, a 6-digit verification code has been sent.");
      setStep(2);
    }
  };

  // Step 2: Validate OTP code ONLY before allowing password entry
  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    const inputCode = formData.get("code") as string;

    if (!inputCode || inputCode.trim().length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      setLoading(false);
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    let token = "";
    if (siteKey && !isBypassed) {
      token = recaptchaRef2.current?.getValue() || "";
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
    }

    const result = await verifyPasswordResetCode(email, inputCode.trim(), token);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Invalid verification code.");
      if (siteKey && !isBypassed) recaptchaRef2.current?.reset();
    } else {
      setCode(inputCode.trim());
      setSuccessMsg("Code verified! You may now set your new password.");
      setStep(3);
    }
  };

  // Step 3: Reset Password after OTP is validated
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      setLoading(false);
      return;
    }

    formData.append("email", email);
    formData.append("code", code);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const isBypassed = process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA === "true";
    if (siteKey && !isBypassed) {
      const token = recaptchaRef3.current?.getValue();
      if (!token) {
        setError("Please verify that you are not a robot.");
        setLoading(false);
        return;
      }
      formData.append("recaptchaToken", token);
    }

    const result = await resetPassword(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Failed to reset password.");
      if (siteKey && !isBypassed) recaptchaRef3.current?.reset();
    } else {
      setSuccessMsg("Password reset successfully! You can now log in with your new password.");
    }
  };

  // Resend code handler
  const handleResend = async () => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("email", email);
    await requestPasswordReset(formData);
    setLoading(false);
    setSuccessMsg("A new verification code has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#081a12]">
      {/* Background Gradient */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 30%, #103826 0%, #081a12 60%, #030806 100%)"
        }}
      />

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8 my-8 relative z-10">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <Image src="/logo2026.png" width={160} height={160} alt="MERCon 2026 Logo" className="mx-auto h-16 w-auto" />
          </Link>
          <h1 className="text-2xl topic text-white">Password Reset</h1>
          <p className="text-gray-400 para text-sm mt-1">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the 6-digit verification code sent to your email"}
            {step === 3 && "Create and confirm your new secure password"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}

        {/* Step 1: Request Code Form */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Registered Email</label>
              <input
                type="email"
                name="email"
                defaultValue={email}
                required
                placeholder="you@example.com"
                className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>

            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef1}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-4 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
            >
              {loading ? "Sending Code..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* Step 2: Verify Code Form */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="text-center mb-2">
              <p className="text-xs text-gray-300">Code sent to: <span className="font-semibold text-white">{email}</span></p>
              <button
                type="button"
                onClick={() => { setStep(1); setError(null); setSuccessMsg(null); }}
                className="text-xs text-primary-400 hover:underline mt-1 inline-block cursor-pointer"
              >
                Change email address
              </button>
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-center">6-Digit Verification Code</label>
              <input
                type="text"
                name="code"
                required
                maxLength={6}
                pattern="[0-9]*"
                placeholder="123456"
                className="w-56 text-center text-3xl tracking-[0.5em] font-mono p-3 border border-white/20 rounded-xl bg-white/10 text-primary-400 focus:ring-2 focus:ring-primary-500 outline-none transition shadow-inner font-bold"
              />
            </div>

            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef2}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-4 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify Code →"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="text-xs text-gray-400 hover:text-white transition cursor-pointer"
              >
                Didn't receive code? <span className="text-primary-400 hover:underline">Resend code</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Set New Password Form */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-4">
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                ✓ Email Validated: {email}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  placeholder="Confirm new password"
                  className="w-full p-3 border border-white/20 rounded-xl bg-white/5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
                />
              </div>
            </div>

            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_BYPASS_RECAPTCHA !== "true" && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef3}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all mt-4 border border-primary-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] cursor-pointer"
            >
              {loading ? "Resetting Password..." : "Set New Password"}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
