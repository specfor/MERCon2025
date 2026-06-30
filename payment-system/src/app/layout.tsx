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
      <body className="min-h-full flex flex-col para" style={{
        background: `radial-gradient(circle at center, rgb(14, 46, 32) 0%, rgb(8, 26, 18) 45%, rgb(2, 6, 4) 80%)`
      }}>
        {children}
      </body>
    </html>
  );
}
