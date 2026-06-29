import ReturnPageClient from "./client";
import { Suspense } from "react";

type Params = Promise<{ inv: string }>

export default async function ReturnPage(props: { params: Params }) {
  const params = await props.params;
  const inv = params.inv;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="animate-spin h-8 w-8 text-primary-600 border-4 border-t-transparent rounded-full"></div>
      </div>
    }>
      <ReturnPageClient inv={inv} />
    </Suspense>
  );
}
