import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Users, Book, Clock, Mail, MapPin } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopVisualizeScienceDetailsPage: React.FC = () => {
  const registrationLink = "https://forms.gle/9wqc7pn9DQpt6f9HA";

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
              headerText="Visualize Your Science"
              textClass="text-white"
            />
            <p className="text-gray-300 text-xl max-w-4xl mx-auto mt-4 font-medium">
              Turning Research into Impactful Visual Narratives through Concepts, Literature, and Methodology
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">14th August 2026</span>
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
                  Develop skills to visualize research concepts, literature, and methodologies. This workshop will guide participants in turning abstract ideas into meaningful research visuals, mapping knowledge networks, and communicating research approaches clearly. Participants will learn how to apply practical visualization tools and adopt visual thinking approaches to solve complex engineering research problems.
                </p>
              </div>

              {/* Registration and Mode Links - Highlighted */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Event Details & Registration
                </h3>
                <div className="flex flex-col gap-4 text-gray-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Time: 9.00am – 10.30am</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Mode: Hybrid (Physical Location: Learning Studio at Department of TMLE)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Organized by: Department of Transport Management & Logistics Engineering</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <a
                      href={registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 inline-flex justify-center items-center gap-3 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                    >
                      <span className="para text-sm">Register Here</span>
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Resource Persons */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Resource Persons
                </h3>
                
                <div className="space-y-10">
                  {/* Invited Speaker */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-semibold text-xl text-center">Mr. Buddhi Weerasinghe</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Invited Speaker</p>
                    <p className="text-gray-300 para text-sm text-center">
                      PhD researcher, Erasmus School of Social and Behavioural Sciences, Erasmus University Rotterdam, The Netherlands
                    </p>
                  </div>
                  
                  <div className="w-full h-px bg-gray-700/50"></div>

                  {/* Other Speaker 1 */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-semibold text-xl text-center">Dr. W. Madushan Fernando</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Senior Lecturer (Grade II- On Contract)</p>
                    <p className="text-gray-300 para text-sm text-center">
                      Department of Transport Management & Logistics Engineering, Faculty of Engineering, University of Moratuwa, Sri Lanka
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-2">
                      <a href="mailto:madushanf@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> madushanf@uom.lk</a>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-700/50"></div>

                  {/* Other Speaker 2 */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-semibold text-xl text-center">Dr. Madhava Jayalath</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Senior Lecturer (Grade II- On Contract)</p>
                    <p className="text-gray-300 para text-sm text-center">
                      Department of Transport Management & Logistics Engineering, Faculty of Engineering, University of Moratuwa, Sri Lanka
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-2">
                      <a href="mailto:madhavaj@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> madhavaj@uom.lk</a>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-700/50"></div>

                  {/* Other Speaker 3 */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-semibold text-xl text-center">Dr. Kasuni Weerasinghe</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Lecturer (On Contract)</p>
                    <p className="text-gray-300 para text-sm text-center">
                      Department of Transport Management & Logistics Engineering, Faculty of Engineering, University of Moratuwa, Sri Lanka
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-400 mt-2">
                      <a href="mailto:kasuniw@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> kasuniw@uom.lk</a>
                      <span className="text-xs text-primary-500/70">(Primary Contact Person)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Workshop Content & Schedule */}
            <div className="w-full lg:w-3/5 space-y-8">
              {/* Workshop Image (Placeholder) */}
              <div className="rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl min-h-[250px] flex items-center justify-center">
                <StaticImage
                  src="../images/workshops/workshop6.jpeg"
                  alt="Visualize Your Science"
                  className="w-full h-auto"
                  placeholder="blurred"
                  objectFit="cover"
                />
              </div>

              {/* Highlights Section */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6">Workshop Highlights</h3>
                <ul className="space-y-4">
                  {[
                    "Concept visualization: Turning ideas into meaningful research visuals",
                    "Literature visualization: Mapping trends, themes, and knowledge networks",
                    "Method visualization: Communicating research approaches clearly",
                    "Interactive hands-on activities & feedback"
                  ].map((point, j) => (
                    <li
                      key={j}
                      className="text-gray-300 para text-base relative before:content-['•'] before:absolute before:-left-5 before:text-primary-500 before:font-bold before:text-xl pl-5"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Objectives Section */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6">Workshop Objectives</h3>
                <ul className="space-y-4">
                  {[
                    "Develop skills to visualize research concepts, literature, and methodologies",
                    "Apply practical visualization tools and techniques to enhance research communication",
                    "Adopt visual thinking approaches to engineering research and problem solving"
                  ].map((point, j) => (
                    <li
                      key={j}
                      className="text-gray-300 para text-base relative before:content-['•'] before:absolute before:-left-5 before:text-primary-500 before:font-bold before:text-xl pl-5"
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

export default WorkshopVisualizeScienceDetailsPage;

export const Head = createPageHead({
  title: "Visualize Your Science - MERCon 2026",
  description: "Turning Research into Impactful Visual Narratives through Concepts, Literature, and Methodology workshop details for MERCon 2026.",
});
