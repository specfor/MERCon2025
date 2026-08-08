import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Users, Book, User } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopOptimizationDetailsPage: React.FC = () => {
  const registrationLink = "https://forms.gle/cze7Qx9yZi59axoE9";

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
              headerText="Optimization for Complex Engineering Problems"
              textClass="text-white"
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">12th August 2026</span>
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
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base">
                  Optimization is a core aspect of modern engineering, enabling professionals to design efficient systems and make optimal decisions under constraints. This workshop focuses on the formulation of engineering optimization problems and introduces both classical optimization methods and advanced techniques such as genetic algorithms and biologically inspired methods. Participants will engage in guided problem-solving and demonstrations, gaining practical experience that bridges the gap between theoretical fundamentals and real-world engineering applications.
                </p>
              </div>

              {/* Registration Link - Highlighted */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Register Now
                </h3>
                <div className="flex flex-col gap-4 text-gray-200">
                  <p className="para text-sm text-gray-300">Time: 10.00 am – 1.00 pm</p>
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
                  {/* Placeholder for Photo */}
                  <div className="w-32 h-32 rounded-full bg-gray-700/50 border-4 border-primary-500/50 flex items-center justify-center mx-auto shadow-lg">
                     <StaticImage
                    src="../images/workshops/Prof.W.B.Daundasekera.png"
                    alt="Prof. W. B. Daundasekera"
                    className="w-32 h-32 rounded-full border-4 border-primary-500/50 object-cover shadow-lg mx-auto"
                  />
                  </div>
                  
                  <h4 className="text-white font-semibold text-xl text-center">Prof. W. B. Daundasekera</h4>
                  <p className="text-primary-400 text-center text-sm font-semibold">Department of Mathematics, University of Peradeniya, Sri Lanka</p>
                  
                  <div className="text-gray-300 para text-sm text-justify mt-2 space-y-3">
                    <div>
                      <strong className="text-primary-400">Area of Specialization:</strong> Optimization Theory
                    </div>
                    <div>
                      <strong className="text-primary-400">Qualifications:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>B.Sc. (Special) in Mathematics, University of Peradeniya</li>
                        <li>M.Sc. in Applied Mathematics, USA</li>
                        <li>Ph.D. in Applied Mathematics, USA</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-primary-400">Academic Experience:</strong>
                      <p className="mt-1">Over 40 years of university teaching experience, from 1986 to the present.</p>
                    </div>
                    <div>
                      <strong className="text-primary-400">Academic Contributions:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Founder of the Statistics and Operations Research Honours Degree Programme at the University of Peradeniya</li>
                        <li>Founder of the Industrial Mathematics Honours Degree Programme at Rajarata University of Sri Lanka</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Workshop Image */}
            <div className="w-full lg:w-3/5">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl bg-gray-900/50 min-h-[300px] flex items-center justify-center">
                  {/* Placeholder image for now */}
                  <StaticImage
                    src="../images/workshops/workshop4.jpeg"
                    alt="Optimization Workshop Details"
                    className="w-full h-auto opacity-70"
                    placeholder="blurred"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Workshop Topics Section */}
          <div className="mt-16 bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-primary-400 font-bold text-3xl para mb-8 text-center">Key Points</h3>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {[
                  "Fundamentals of optimization and operational research",
                  "Formulation of engineering optimization problems",
                  "Classical optimization methods",
                  "Genetic algorithms and biologically inspired methods",
                  "Practical applications in engineering design and decision-making",
                  "Guided problem-solving and demonstrations"
                ].map((point, j) => (
                  <li
                    key={j}
                    className="text-gray-300 para text-base md:text-lg relative before:content-['•'] before:absolute before:-left-5 before:text-primary-500 before:font-bold before:text-xl pl-5"
                  >
                    {point}
                  </li>
                ))}
              </ul>
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

export default WorkshopOptimizationDetailsPage;

export const Head = createPageHead({
  title: "Workshop Details - MERCon 2026",
  description:
    "Optimization for Complex Engineering Problems workshop details for MERCon 2026.",
});
