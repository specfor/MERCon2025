import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Users, Book, User, Clock, Mail, Video } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopStemResearchDetailsPage: React.FC = () => {
  const registrationLink = "https://forms.gle/rUWwESnPJEQwe5Vf8";

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
              headerText="Communicating STEM Research Clearly"
              textClass="text-white"
            />
            <p className="text-gray-300 text-xl max-w-4xl mx-auto mt-4 font-medium">
              Academic Writing, Scientific Discourse and Presentation Skills
            </p>
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
                  This workshop is designed to help you write clearer STEM abstracts and research arguments using effective rhetorical organization. You will learn to use technical vocabulary and disciplinary language with greater clarity, precision, and readability. It also covers communicating research findings, limitations, and implications appropriately, presenting complex research ideas clearly to specialist and non-specialist audiences, and improving conference presentation and visual communication choices for STEM research.
                </p>
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-primary-500/10">
                  <p className="text-gray-300 para text-sm">
                    <strong className="text-primary-400">Target Audience:</strong> Designed for undergraduate and postgraduate STEM students, early-career academics, research assistants and professionals.
                  </p>
                </div>
              </div>

              {/* Registration and Zoom Links - Highlighted */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Event Details & Registration
                </h3>
                <div className="flex flex-col gap-4 text-gray-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Time: Two-hour session. 7.00 - 9.00 PM.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Mode: Online via Zoom (Link will be provided to registered participants).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <p className="para text-sm text-gray-300">Organized by: Department of Languages, Faculty of Engineering, University of Moratuwa.</p>
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
                  {/* Person 1 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-white font-semibold text-xl text-center">W.M.P.Y.B. (Prasanna) Rathnayake</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Senior Lecturer Grade I and Head, Department of Languages, Faculty of Engineering, University of Moratuwa</p>
                    
                    <p className="text-gray-300 para text-sm text-justify">
                      He holds a BA (Languages) (Special), MA in Linguistics, Master of TESL and MPhil in Linguistics, with an academic background in language, linguistics and English language teaching.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-400">
                      <a href="mailto:prasannar@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> prasannar@uom.lk</a>
                      <a href="mailto:head-lang@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> head-lang@uom.lk</a>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-gray-700/50"></div>

                  {/* Person 2 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-white font-semibold text-xl text-center">Ashmini Karunarathne</h4>
                    <p className="text-primary-400 text-center text-sm font-semibold px-4">Lecturer (Probationary), Department of Languages, Faculty of Engineering, University of Moratuwa</p>
                    
                    <p className="text-gray-300 para text-sm text-justify">
                      Coordinator of the ESP (Engineering) programmes for the Faculty of Engineering. She holds a BEd (Hons) with First Class, MA in Linguistics and Reading for MPhil, and holds a Graduate Diploma in IT (UK Level 7).
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <a href="mailto:ashminik@uom.lk" className="hover:text-primary-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> ashminik@uom.lk</a>
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
                  src="../images/workshops/workshop5.jpeg"
                  alt="STEM Research Communication Workshop"
                  className="w-full h-auto"
                  placeholder="blurred"
                  objectFit="cover"
                />
              </div>

              {/* Key Points Section */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6">Key Points to Include</h3>
                <ul className="space-y-4">
                  {[
                    "Write clearer STEM abstracts and research arguments using effective rhetorical organization.",
                    "Use technical vocabulary and disciplinary language with greater clarity, precision and readability.",
                    "Communicate research findings, limitations and implications appropriately.",
                    "Present complex research ideas clearly to both specialist and non-specialist audiences.",
                    "Improve conference presentation and visual communication choices for STEM research.",
                    "Take part in a guided abstract-revision activity, live presentation critique and Q&A."
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
              
              {/* Workshop Focus / Schedule */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Suggested 2-hour Workshop Focus
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-500/30 before:to-transparent">
                  {[
                    {
                      time: "0:00–0:35",
                      title: "Clear STEM research writing",
                      desc: "Abstracts, research arguments, rhetorical moves, clarity and disciplinary language."
                    },
                    {
                      time: "0:35–1:15",
                      title: "Communicating research to an audience",
                      desc: "Explaining technical concepts, presentation structure, readability and visual communication."
                    },
                    {
                      time: "1:15–2:00",
                      title: "Guided practice",
                      desc: "Live abstract revision, presentation critique, participant questions and practical takeaways."
                    }
                  ].map((session, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-800 text-primary-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-primary-500/20 bg-gray-800/50 shadow-sm transition-all duration-300 hover:shadow-primary-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-primary-300 para">{session.title}</h4>
                        </div>
                        <p className="text-sm font-semibold text-primary-500 mb-2">{session.time}</p>
                        <p className="text-sm text-gray-300 para">{session.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

export default WorkshopStemResearchDetailsPage;

export const Head = createPageHead({
  title: "Workshop Details - MERCon 2026",
  description:
    "Communicating STEM Research Clearly workshop details for MERCon 2026.",
});
