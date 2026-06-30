// Minimal typing for the Mastercard hosted checkout script loaded globally in
// src/app/layout.tsx.
export type CheckoutApi = {
  configure: (options: { session: { id: string } }) => void;
  showPaymentPage: () => void;
};

export function getCheckout(): CheckoutApi | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Checkout?: CheckoutApi }).Checkout;
}
