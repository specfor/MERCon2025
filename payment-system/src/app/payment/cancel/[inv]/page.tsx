import Link from "next/link";
import { cancelPaymentResult } from "@/actions/payment";

type Params = Promise<{ inv: string }>

export default async function CancelPage(props: { params: Params }) {
  const params = await props.params;
  const inv = params.inv;

  if (inv) {
    await cancelPaymentResult(inv);
  }

  return (
    <div className="flex min-h-screen p-8 items-center justify-center">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-center">
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-6 rounded-xl mb-6 shadow-inner">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-sm">You have cancelled the payment process. No charges have been made.</p>
        </div>
        
        <p className="text-gray-400 mb-8">
          You can return to your dashboard and retry the payment whenever you are ready.
        </p>

        <Link
          href="/dashboard"
          className="inline-block w-full py-4 px-6 bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg rounded-xl transition-all shadow-md border border-primary-500/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:-translate-y-0.5"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
