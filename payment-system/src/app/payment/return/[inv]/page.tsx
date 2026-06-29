import { redirect } from "next/navigation";
import { verifyPaymentResult } from "@/actions/payment";

type Params = Promise<{ inv: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ReturnPage(props: { params: Params, searchParams: SearchParams }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const inv = params.inv;
  const resultIndicator = searchParams.resultIndicator as string | undefined;

  // The invoice id is passed via path parameter
  if (!inv) {
    redirect("/dashboard?error=Missing+invoice+ID");
  }

  if (!resultIndicator) {
    redirect("/dashboard?error=Payment+cancelled+or+no+result+indicator");
  }

  const res = await verifyPaymentResult(inv, resultIndicator);

  if (res.success) {
    redirect("/dashboard?success=true");
  } else {
    redirect(`/dashboard?error=${encodeURIComponent(res.error || "Payment verification failed")}`);
  }
}
