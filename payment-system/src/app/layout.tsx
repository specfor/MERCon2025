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
  return (
    <html lang="en" className="h-full antialiased bg-secondary-50">
      <body className="min-h-full flex flex-col para text-dark-800">
        <Script 
          src="https://bankofceylon.gateway.mastercard.com/static/checkout/checkout.min.js"
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
