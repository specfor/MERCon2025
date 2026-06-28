import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invoice Payment | UoM",
  description: "Payment Gateway Integration",
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
    <html lang="en" className="h-full antialiased bg-secondary-50">
      <body className="min-h-full flex flex-col para text-dark-800">
        <Script
          src={checkoutScript}
          strategy="beforeInteractive"
          data-error="errorCallback"
          data-cancel="cancelCallback"
        />
        <Script id="ipg-callbacks" strategy="beforeInteractive">
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
        {children}
      </body>
    </html>
  );
}
