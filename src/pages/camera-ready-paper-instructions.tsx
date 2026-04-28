import React, { useState } from "react";
import {
  ExternalLink,
  FileCheck2,
  FileText,
  TriangleAlert,
  LifeBuoy,
  ShieldCheck,
  BadgeCheck,
  Copy,
  Check,
} from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const ieeeTemplatesUrl = "https://www.ieee.org/conferences/publishing/templates";
const ieeeSupportCenterUrl = "https://supportcenter.ieee.org/";
const ieeePdfExpressUrl = "https://ieee-pdf-express.org/";

const preparationSteps = [
  {
    title: "Use the IEEE conference template",
    description: "Prepare the final manuscript using the official IEEE conference formatting templates.",
  },
  {
    title: "Proofread the source document thoroughly",
    description:
      "Authors must thoroughly proofread their source document before creating the final PDF to ensure that no further revisions are required. ",
  },
  {
    title: "Keep the paper within 6 pages",
    description: "The final camera-ready PDF must be 6 pages or fewer, including references.",
  },
  {
    title: "Validate the PDF through IEEE PDF eXpress",
    description: "Use IEEE PDF eXpress to confirm that the final PDF is compliant before upload.",
  },
];

const pdfExpressSteps = [
  'Log in to IEEE PDF eXpress as a first-time user and select "New Users - Click Here".',
  "Enter the Conference ID 71835X, your email address, and a password.",
  "Follow the prompts until confirmation appears online and an email verification will be sent.",
  "If you have used IEEE PDF eXpress before, sign in with the same password used in prior conferences.",
  "Confirm all contact details are current and valid before you finalize the submission.",
];

const supportPoints = [
  "Use the Find Answers tab for common issues and Ask a Question when you need direct assistance.",
  "IEEE support responses are typically provided within 3 business days.",
];

export default function CameraReadyPaperInstructionsPage() {
  const [conferenceIdCopied, setConferenceIdCopied] = useState(false);

  const handleCopyConferenceId = async () => {
    try {
      await navigator.clipboard.writeText("71835X");
      setConferenceIdCopied(true);
      window.setTimeout(() => setConferenceIdCopied(false), 2000);
    } catch {
      setConferenceIdCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgb(14, 46, 32) 0%,
              rgb(8, 26, 18) 45%,
              rgb(2, 6, 4) 80%
            )
          `,
        }}
      />

      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-green-500/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl pt-20">
        <SectionHeader headerText="Camera-Ready Paper Submission" />

        <div className="mx-auto max-w-4xl text-center">
          <p className="para text-lg leading-relaxed text-gray-200 sm:text-xl">
            Prepare the final camera-ready paper using the official IEEE template, keep it within the page limit, and
            validate the PDF through IEEE PDF eXpress before submission.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={ieeeTemplatesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-primary-500/30 bg-primary-500/10 px-6 py-3 text-sm font-semibold text-primary-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-500/20 hover:text-white"
            >
              <FileText className="h-4 w-4" />
              IEEE Templates
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={ieeeSupportCenterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/30 hover:bg-white/10 hover:text-white"
            >
              <LifeBuoy className="h-4 w-4 text-primary-400" />
              IEEE Support Center
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={ieeePdfExpressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/30 hover:bg-white/10 hover:text-white"
            >
              <FileText className="h-4 w-4" />
              IEEE PDF eXpress
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-green-500/20 bg-linear-to-br from-green-600/10 to-emerald-600/5 p-8 shadow-2xl shadow-green-500/10 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-green-300">
                <TriangleAlert className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Submission requirements</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  The final camera-ready version should be publication-ready and pass IEEE PDF eXpress validation.
                </p>
              </div>
            </div>

            <div className="mt-8 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3 text-green-300">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-semibold">Page limit</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Maximum page limit is 6 pages, including references.
                </p>
                <p className="text-red-400 text-sm">Exceeding this limit will result in desk rejection.</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {preparationSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm font-bold text-primary-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-primary-300">
                <FileCheck2 className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-white">IEEE PDF eXpress</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                All authors must use IEEE PDF eXpress to validate the final camera-ready paper before submission.
              </p>

              <div className="mt-6 rounded-2xl border border-primary-500/20 bg-primary-500/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Conference ID</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <p className="text-3xl font-bold text-white">71835X</p>
                  <button
                    type="button"
                    onClick={handleCopyConferenceId}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/30 hover:bg-white/10 hover:text-white"
                    aria-label="Copy Conference ID"
                  >
                    {conferenceIdCopied ? <Check className="h-4 w-4 text-green-300" /> : <Copy className="h-4 w-4" />}
                    {conferenceIdCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {pdfExpressSteps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-500/30 bg-primary-500/10 text-sm font-semibold text-primary-300">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-primary-300">
                <LifeBuoy className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-white">Support and escalation</h2>
              </div>
              <div className="mt-5 space-y-3">
                {supportPoints.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                    <p className="text-sm leading-relaxed text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 text-amber-300">
              <TriangleAlert className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Important note</h2>
              <p className="max-w-4xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Authors should ensure that all contact details are current before the camera-ready submission is
                uploaded.
              </p>
              <p className="max-w-4xl text-sm leading-relaxed text-gray-300 sm:text-base">
                For any technical issues, use the IEEE Publications Support Center and the Find Answers or Ask a
                Question tabs. Responses are typically provided within 3 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Head = createPageHead({
  title: "Camera-Ready Paper Instructions - MERCon 2026",
  description:
    "Camera-ready paper submission instructions for MERCon 2026, including IEEE PDF eXpress validation and page limit requirements.",
});
