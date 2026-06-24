import React from "react";
import ComingSoon from "../components/comingSoon";
import { createPageHead } from "../components/pageHead";

export default function SpecialSessionsPage() {
  return <ComingSoon />;
}

export const Head = createPageHead({
  title: "Special Sessions - MERCon 2026",
  description: "MERCon 2026 special sessions and themed research tracks.",
});
