import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Conference Payment System | Mercon",
  description: "Mercon Payment System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Production BoC gateway by default; set UOM_IPG_CHECKOUT_SCRIPT to the MTF test
  // gateway script (https://test-bankofceylon.mtf.gateway.mastercard.com/static/checkout/checkout.min.js)
  // when using the CITeS test environment.
  const checkoutScript =
    process.env.UOM_IPG_CHECKOUT_SCRIPT ||
    "https://bankofceylon.gateway.mastercard.com/static/checkout/checkout.min.js";

  return (
    <html lang="en" className="h-full antialiased text-gray-200">
      <head>
        <Script
          src={checkoutScript}
          strategy="afterInteractive"
          data-error="errorCallback"
          data-cancel="cancelCallback"
        />
        <Script id="ipg-callbacks" strategy="afterInteractive">
          {`
            function errorCallback(error) {
              console.error("Mastercard Checkout Error:", error);
              // Optionally dispatch a custom event
              window.dispatchEvent(new CustomEvent('ipgError', { detail: error }));
            }
          
            function cancelCallback() {
              console.log("Payment Cancelled by User");
              window.dispatchEvent(new Event('ipgCancel'));
            }
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} font-sans antialiased text-white bg-[#040d09] selection:bg-primary-500/30 selection:text-primary-100`}>
        <div className="fixed inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(34,197,94,0.15), rgba(8,26,18,1) 60%)',
          zIndex: -1
        }} />
        {children}
      </body>
    </html>
  );
}
