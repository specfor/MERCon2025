import React from "react";
import ComingSoon from "../components/comingSoon";
import { createPageHead } from "../components/pageHead";

export default function ConferenceSchedulePage() {
  return <ComingSoon />;
}

export const Head = createPageHead({
  title: "Conference Schedule - MERCon 2026",
  description: "MERCon 2026 conference schedule and program details.",
});
