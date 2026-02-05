import React from "react";
import { HeadFC } from "gatsby";
import SectionHeader from "../components/sectionHeader";

const CallForPapersPage: React.FC = () => {
  return (
    <div className="relative min-h-screen py-16 px-4">
      {/* Fixed Green Background */}
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
      <div className="max-w-4xl mx-auto pt-20">
        {/* Header */}
        <SectionHeader headerText="Author Instructions" />

        {/* Paper Submissions Section */}
        <div className="mt-12 bg-gradient-to-br from-green-600/10 to-emerald-600/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            MERCon Paper Submissions
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>All papers should be written in English.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>
                Maximum length of a paper is limited to 6 printed A4 pages in given format.{" "}
                <a
                  href="https://www.ieee.org/conferences/publishing/templates.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                >
                  IEEE Template →
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>Review process is Double-blind. Follow the following instructions in your first submission.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>Do NOT include any authors' information such as name, affiliations, e-mail, etc. in the initial manuscript.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>Do NOT include any grant information or personal acknowledgements in the initial manuscript.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span>All references including authors' previous work should be referred as 3rd-persons' works.</span>
            </li>
          </ul>
        </div>

        {/* Submission Guidelines Section */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Guidelines for Submitting Full Papers
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>
                All paper submissions are through{" "}
                <a
                  href="https://edas.info/N33802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-semibold"
                >
                  EDAS
                </a>
                . Please note that 1st time users need to create a new EDAS account. Please use your institutional e-mail address while registering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>While submitting a paper, select the most appropriate Track for your paper.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>Manuscript submission should be in Adobe Portable Document Format (PDF) only. Once accepted, all Camera Ready papers should be in IEEE compliant format.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>Manuscripts that do not conform to the above formatting guidelines will not be considered. If you experience any font embedding issues while uploading the paper to EDAS, please follow IEEE instructions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>We request all authors to carefully revise the manuscript for language and formatting.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>All submitted manuscripts will undergo a plagiarism check using a suitable tool.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
              <span>Please contact us if you have any questions regarding your submission or experience any issues while submitting your manuscript.</span>
            </li>
          </ul>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-gray-300 space-y-3">
              <p>
                MERCon strongly discourages changes and, in particular, withdrawals of papers once submitted and included in the program. To avoid the likelihood of this, authors are strongly encouraged to get all necessary company and/or government approvals prior to submitting the paper to the conference.
              </p>
              <p>
                If under any circumstances it becomes necessary for the author(s) to withdraw or change a paper, MERCon policy dictates that proper procedures must be followed.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://edas.info/N33802"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Submit Your Paper
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallForPapersPage;

export const Head: HeadFC = () => <title>Call for Papers - MERCon 2026</title>;
