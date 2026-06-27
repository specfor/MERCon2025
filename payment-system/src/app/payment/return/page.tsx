import ReturnPageClient from "./client";
import { Suspense } from "react";

export default function ReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="animate-spin h-8 w-8 text-primary-600 border-4 border-t-transparent rounded-full"></div>
      </div>
    }>
      <ReturnPageClient />
    </Suspense>
  );
}
