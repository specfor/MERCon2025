"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPaymentResult } from "@/actions/payment";

export default function ReturnPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Verifying payment...");

  useEffect(() => {
    const verify = async () => {
      const resultIndicator = searchParams.get("resultIndicator");
      
      const storedSuccessIndicator = localStorage.getItem("ipg_success_indicator");
      const storedInvoiceId = localStorage.getItem("ipg_invoice_id");
      const storedSessionId = localStorage.getItem("ipg_session_id");

      if (!resultIndicator) {
        setStatus("error");
        setMessage("Payment cancelled or no result indicator found.");
        return;
      }

      if (resultIndicator !== storedSuccessIndicator) {
        setStatus("error");
        setMessage("Payment failed or was cancelled by user.");
        return;
      }

      if (!storedSessionId || !storedInvoiceId) {
        setStatus("error");
        setMessage("Session data missing. Please contact support.");
        return;
      }

      try {
        const res = await verifyPaymentResult(storedSessionId, storedInvoiceId);
        
        if (res.success) {
          setStatus("success");
          setMessage("Payment was successful! Your invoice has been paid.");
          // Clear storage on success
          localStorage.removeItem("ipg_success_indicator");
          localStorage.removeItem("ipg_invoice_id");
          localStorage.removeItem("ipg_session_id");
        } else {
          setStatus("error");
          setMessage(`Payment verification failed: ${res.error}`);
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "An error occurred during verification.");
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-secondary-50 p-4">
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-12 w-12 text-primary-600 border-4 border-t-transparent rounded-full mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 topic">Processing...</h2>
            <p className="text-gray-500 mt-2 para">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 topic">Payment Successful</h2>
            <p className="text-gray-600 mt-2 para">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              Return to Home
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 topic">Payment Failed</h2>
            <p className="text-red-600 mt-2 para">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
