import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Users, Book } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopPaperWritingDetailsPage: React.FC = () => {
  const zoomLink = "https://learn.zoom.us/j/98271028175?pwd=7jgq90FIGYy8kIwwdRMXTpDzJW0KXI.1";

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* ===== FIXED GREEN BACKGROUND ===== */}
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

      {/* ===== CONTENT ===== */}
      <section className="relative w-full py-24 px-6 overflow-hidden z-40">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/workshops"
            className="group inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="para font-semibold">Back to Workshops</span>
          </Link>

          {/* Section Header */}
          <div className="text-center my-16">
            <SectionHeader
              headerText="Modern Research Paper Writing for Engineering and Computing Researchers"
              textClass="text-white"
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">30th March 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Book className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">Workshop</span>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            {/* Left Column - Details */}
            <div className="w-full lg:w-2/5 space-y-8">
              {/* Workshop Overview */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  Workshop Overview
                </h3>
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base mb-6">
                  This workshop is designed to equip researchers with practical, up-to-date skills for writing
                  high-quality research papers aligned with international conference and journal standards.
                </p>
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base">
                  With increasing expectations on clarity, reproducibility, visual quality, and ethical use of AI tools,
                  effective research communication has become as critical as technical novelty. Aligned with the
                  requirements of major engineering and computing conferences, the workshop provides a hands-on,
                  end-to-end guide to research paper preparation from structuring ideas to producing camera-ready
                  manuscripts using professional tools.
                </p>
              </div>

              {/* Zoom Link - Highlighted */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Join Online
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-200">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <p className="para font-semibold text-white">30th March 2026</p>
                  </div>
                  <p className="para text-sm text-gray-300">Time: 6.00 p.m</p>
                  <a
                    href={zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                  >
                    <span className="para">Join Now</span>
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Target Audience */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Target Audience
                </h3>
                <ul className="space-y-3">
                  <li className="text-gray-200 para text-sm md:text-base flex items-start gap-3">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>Undergraduate and postgraduate students</span>
                  </li>
                  <li className="text-gray-200 para text-sm md:text-base flex items-start gap-3">
                    <span className="text-primary-400 mt-1">•</span>
                    <span>Early-career researchers, PhD candidates, academics, and industry researchers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Workshop Image */}
            <div className="w-full lg:w-3/5">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl">
                  <StaticImage
                    src="../images/workshop1.jpeg"
                    alt="Modern Research Paper Writing Workshop Details"
                    className="w-full h-auto"
                    placeholder="blurred"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Workshop Topics Section */}
          <div className="mt-16 bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-primary-400 font-bold text-3xl para mb-8 text-center">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Modern Research Paper Writing Techniques",
                  points: [
                    "Paper structure, problem formulation, contributions",
                    "Common reviewer expectations and rejection reasons",
                  ],
                },
                {
                  title: "Conference Template Usage",
                  points: ["IEEE/ACM/Springer templates", "Page limits and camera-ready compliance"],
                },
                {
                  title: "LaTeX for Research Writing",
                  points: ["Equations, references, BibTeX", "Overleaf and local workflows"],
                },
                {
                  title: "Figure and Table Generation",
                  points: ["MATLAB, Python, TikZ, vector graphics", "Reproducibility and formatting standards"],
                },
                {
                  title: "Online Research Tools",
                  points: ["Reference managers, collaboration tools", "Plagiarism checking and version control"],
                },
                {
                  title: "Responsible Use of AI",
                  points: [
                    "AI-assisted writing and limitations",
                    "Conference/journal AI policies and ethical boundaries",
                  ],
                },
                {
                  title: "From Draft to Submission",
                  points: ["Submission checklists", "Responding to reviewers"],
                },
              ].map((topic, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-primary-500 font-semibold text-lg para flex items-start gap-2">
                    <span className="text-primary-400 mt-1">→</span>
                    {topic.title}
                  </h4>
                  <ul className="space-y-2 pl-6">
                    {topic.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-gray-300 para text-sm md:text-base relative before:content-['•'] before:absolute before:-left-4 before:text-primary-500 before:font-bold"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link
              to="/workshops"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="para">Back to All Workshops</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopPaperWritingDetailsPage;

export const Head = createPageHead({
  title: "Workshop Details - MERCon 2026",
  description:
    "Modern research paper writing workshop details for MERCon 2026, including online session information and topics covered.",
});
