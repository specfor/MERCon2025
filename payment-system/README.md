MERCon 2026 registration + payment system. Built on [Next.js](https://nextjs.org)
with Drizzle ORM (MySQL) and the University of Moratuwa IPG (BoC / Mastercard hosted
checkout).

## Getting Started

1. Install dependencies and configure the environment:

```bash
npm install
cp .env.example .env.local   # then fill in DB + IPG values
```

2. Run the development server (migrations run automatically):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Payment flow

1. **Register** (`/registration`) — multi-step form. On submit, the registration is
   saved with an unguessable 128-bit reference tag (`MERC-…`), pricing is computed
   from `src/lib/pricing.ts`, and an IPG session is created with the registrant's real
   details. The reference tag is shown before redirecting to payment.
2. **Pay** — the global Mastercard checkout script (`src/app/layout.tsx`) renders the
   hosted payment page.
3. **Return** (`/payment/return?inv=…`) — the invoice id is read from the URL and
   verified **server-side** (`verifyPaymentResult`): the `resultIndicator` is compared
   to the stored `success_indicator` in constant time, the IPG verify endpoint is
   called, and the row is marked `completed` with `paid_at`.
4. **Lookup portal** (`/payment/status`) — enter the reference tag **and** the
   registered email to view payment details, or resume an unpaid payment (a fresh IPG
   session is created since sessions expire).

## Environment variables

See `.env.example`. Notable IPG settings:

- `UOM_IPG_TOKEN` / `UOM_IPG_DIVISION` — pre-shared token and division from CITeS.
- `UOM_IPG_AUTH_SCHEME` — Authorization header scheme (`Bearer` by default; `none` for
  a raw token).
- `UOM_IPG_INVOICE_FLAG` — whether a supplied `invoice_id` must already exist in the
  IPG database.

### Confirm with CITeS before go-live

The developer guide leaves a few behaviours under-specified. The defaults below are
best guesses — confirm them for the live division:

- **order_id ↔ invoice_id matching.** We send `order_id = <registration id>` and
  `invoice_id = MERCon2026_<registration id>` so they share the numeric key (the verify
  step errors on "Order ID does not match invoice ID").
- **invoiceFlag / invoice pre-registration.** A supplied `invoice_id` that is not already
  in the IPG database can return 404; confirm whether invoices must be pre-created and set
  `UOM_IPG_INVOICE_FLAG` accordingly.
- **Auth header scheme.** Confirm `Bearer` vs raw token (`UOM_IPG_AUTH_SCHEME`).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
