import React from "react";
import { createPageHead } from "../components/pageHead";
import SectionHeader from "../components/sectionHeader";
import { Download } from "lucide-react";
// Import the PDF file to get its public URL
import schedulePdf from "../images/MERCon 2026 Schedule-V3.pdf";

export default function ConferenceSchedulePage() {
  return (
    <div className="relative min-h-screen py-16 px-4 pt-32">
      {/* Background styling consistent with other pages */}
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
      
      <div className="max-w-6xl mx-auto">
        <SectionHeader headerText="Conference Schedule" textClass="text-white" />
        
        {/* Download Button Section */}
        <div className="mt-8 mb-12 flex justify-center">
          <a
            href={schedulePdf}
            download="MERCon_2026_Schedule.pdf"
            className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 transition-all text-white font-semibold rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:scale-105"
          >
            <Download size={20} />
            Download Schedule PDF
          </a>
        </div>

        {/* PDF Viewer Section (Desktop Only) */}
        <div className="w-full hidden md:block bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl" style={{ height: "80vh", minHeight: "600px" }}>
          <iframe
            src={schedulePdf}
            className="w-full h-full border-none"
            title="MERCon 2026 Schedule"
          />
        </div>
        
        {/* Mobile Fallback Message */}
        <div className="md:hidden text-center text-gray-400 mt-6 px-4">
          <p>PDF preview is typically not supported on mobile browsers.</p>
          <p>Please use the download button above to view the schedule.</p>
        </div>

        {/* Note to Authors */}
        <div className="mt-12 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-primary-500/30 text-center">
          <p className="para text-gray-200 text-lg">
            <strong className="text-primary-400">Note to Authors:</strong> All accepted papers scheduled for oral or poster presentation must be presented during the conference. Only presented papers will be included in the conference proceedings and submitted to the IEEE Xplore Digital Library, subject to IEEE publication requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

export const Head = createPageHead({
  title: "Conference Schedule - MERCon 2026",
  description: "MERCon 2026 conference schedule and program details.",
});
