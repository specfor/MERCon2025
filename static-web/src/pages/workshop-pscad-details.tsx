import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Users, Book } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopPscadDetailsPage: React.FC = () => {
  const registrationLink = "https://docs.google.com/forms/d/e/1FAIpQLSca_zAEpdMVA-z-n7KN1zzWblMB3Mj5XwvEGYfwweaU_5d1Rg/viewform?usp=dialog";

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
              headerText="Power System Fault Analysis Using PSCAD"
              textClass="text-white"
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">06th August 2026</span>
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
                  The increasing complexity of modern power systems, driven by renewable energy integration, power electronic converters, and advanced protection technologies, has created a growing need for detailed transient analysis techniques.
                </p>
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base mb-6">
                  PSCAD/EMTDC is one of the most widely adopted EMT simulation tools used by utilities, consultants, equipment manufacturers, and researchers worldwide for analyzing power system transients, protection performance, switching events, and fault conditions. This workshop will introduce participants to the fundamentals of electromagnetic transient simulations and demonstrate the practical application of PSCAD for detailed power system fault analysis.
                </p>
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base">
                  Through live demonstrations, attendees will observe the development of PSCAD models, implementation of different fault scenarios, and interpretation of simulation results. The workshop aims to bridge the gap between theoretical concepts in power system analysis and practical engineering applications, enabling participants to better understand fault behavior and transient phenomena in modern power networks.
                </p>
              </div>

              {/* Registration Link - Highlighted */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Register Now
                </h3>
                <div className="flex flex-col gap-4 text-gray-200">
                  <p className="para text-sm text-gray-300">Time: 6.00 p.m – 9.00 p.m</p>
                  <p className="para text-sm text-gray-300">Mode: via Zoom (Link will be shared later for the registered participants)</p>
                  <p className="para text-sm text-gray-300">Organized by: PES Chapter / PES SBC of UoM</p>
                  <a
                    href={registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-max inline-flex items-center gap-3 px-6 py-3 mt-4 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                  >
                    <span className="para">Register Here</span>
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Resource Person */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Resource Person
                </h3>
                <div className="flex flex-col gap-4">
                  <StaticImage
                    src="../images/committee/Prof.Lidula.N.Widanagama.Arachchige.png"
                    alt="Prof. Lidula N. Widanagama Arachchige"
                    className="w-32 h-32 rounded-full border-4 border-primary-500/50 object-cover shadow-lg mx-auto"
                  />
                  <h4 className="text-white font-semibold text-xl text-center">Prof. Lidula N. Widanagama Arachchige</h4>
                  <p className="text-primary-400 text-center text-sm font-semibold">Professor, Department of Electrical Engineering, University of Moratuwa</p>
                  <p className="text-gray-300 para text-sm text-justify">
                    Prof. Lidula N. Widanagama Arachchige is a distinguished academic and researcher with extensive expertise in power systems, renewable energy integration, power electronics, microgrids, and advanced simulation techniques. Her research contributions span power system dynamics, control, protection, and energy management.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Workshop Image */}
            <div className="w-full lg:w-3/5">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl">
                  {/* Placeholder image for now */}
                  <StaticImage
                    src="../images/workshop3.jpeg"
                    alt="PSCAD Workshop Details"
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
            <h3 className="text-primary-400 font-bold text-3xl para mb-8 text-center">Objectives & Expected Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-primary-500 font-semibold text-xl para flex items-start gap-2 mb-4">
                  <span className="text-primary-400 mt-1">→</span>
                  Objectives
                </h4>
                <ul className="space-y-3 pl-6">
                  {[
                    "Introduce the fundamentals of electromagnetic transient simulations and their importance in modern power system studies.",
                    "Familiarize participants with the PSCAD/EMTDC simulation environment and modeling workflow.",
                    "Demonstrate the modeling of common power system components including transmission lines, transformers, sources, and loads.",
                    "Analyze different types of power system faults using PSCAD.",
                    "Illustrate the impact of faults on system voltages, currents, and network performance.",
                    "Demonstrate the interpretation of transient simulation results for engineering decision-making.",
                    "Provide participants with practical exposure to industry-relevant simulation methodologies."
                  ].map((point, j) => (
                    <li
                      key={j}
                      className="text-gray-300 para text-sm md:text-base relative before:content-['•'] before:absolute before:-left-4 before:text-primary-500 before:font-bold"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-primary-500 font-semibold text-xl para flex items-start gap-2 mb-4">
                  <span className="text-primary-400 mt-1">→</span>
                  Expected Outcomes
                </h4>
                <ul className="space-y-3 pl-6">
                  {[
                    "A fundamental understanding of electromagnetic transient simulation principles.",
                    "Familiarity with PSCAD/EMTDC and its modeling environment.",
                    "Knowledge of modeling techniques for basic power system components.",
                    "Understanding of various power system fault scenarios and their impacts.",
                    "Ability to interpret transient voltage and current waveforms generated during simulations.",
                    "Awareness of industry and research applications of EMT simulation tools.",
                    "Exposure to advanced analytical techniques used in modern power system studies."
                  ].map((point, j) => (
                    <li
                      key={j}
                      className="text-gray-300 para text-sm md:text-base relative before:content-['•'] before:absolute before:-left-4 before:text-primary-500 before:font-bold"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
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

export default WorkshopPscadDetailsPage;

export const Head = createPageHead({
  title: "Workshop Details - MERCon 2026",
  description:
    "Power System Fault Analysis Using PSCAD workshop details for MERCon 2026.",
});
