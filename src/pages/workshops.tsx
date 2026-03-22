import React from "react";
import { ArrowRight, Book, Code, Cpu, Database, Map, Zap } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import WorkshopCard from "../components/workshopCard";
import type { Workshop } from "../components/workshopCard";

interface WorkshopDetails extends Workshop {
  paragraphs?: string[];
  targetAudience?: string[];
  subtopics?: {
    title: string;
    points: string[];
  }[];
}

const workshopsData: WorkshopDetails[] = [
  {
    topic: "Hands-On WebGIS - Create Your Own Interactive Maps!",
    date: "TBA",
    icon: <Map size={120} className="text-primary-500" />,
    color: "bg-blue-500/20",
    paragraphs: [
      "In this hands-on workshop, participants will learn how to create interactive, web-based maps using powerful tools like Leaflet and OpenLayers. Whether participants are new to GIS or looking to enhance their skills, this workshop will guide them through the essentials of integrating spatial data, adding interactive features, and deploying their own web map online.",
      "By the end, participants will have a functional, dynamic map to showcase their skills, plus the knowledge to build their own projects in the future.",
    ],
  },
  {
    topic: "Modern Research Paper Writing for Engineering and Computing Researchers",
    targetAudience: [
      "Undergraduate and postgraduate students",
      "Early-career researchers, PhD candidates, academics, and industry researchers",
    ],
    date: "30th march 2026",
    icon: <Book size={120} className="text-primary-500" />,
    color: "bg-green-500/20",
    detailsLink: "/workshop-paper-writing-details",
    paragraphs: [
      "This workshop is designed to equip researchers with practical, up-to-date skills for writing high-quality research papers aligned with international conference and journal standards. With increasing expectations on clarity, reproducibility, visual quality, and ethical use of AI tools, effective research communication has become as critical as technical novelty. Aligned with the requirements of major engineering and computing conferences, the workshop provides a hands-on, end-to-end guide to research paper preparation from structuring ideas to producing camera-ready manuscripts using professional tools.",
    ],
    subtopics: [
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
        points: ["AI-assisted writing and limitations", "Conference/journal AI policies and ethical boundaries"],
      },
      {
        title: "From Draft to Submission",
        points: ["Submission checklists", "Responding to reviewers"],
      },
    ],
  },
];

const WorkshopsPage = () => {
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
          {/* Section Header */}
          <div className="text-center my-16">
            <SectionHeader headerText="Workshops" textClass="text-white" />
            <p className="text-gray-400 text-lg max-w-4xl para mx-auto mt-4">
              Join our hands-on workshops led by industry experts. Enhance your skills through practical learning
              experiences and interactive sessions.
            </p>
          </div>

          {/* Workshops */}
          <div className="flex flex-col gap-24">
            {workshopsData.map((workshop, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={workshop.topic}
                  className={`flex flex-col md:flex-row gap-12 items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Workshop Card */}
                  <WorkshopCard workshop={workshop} />

                  {/* Description */}
                  <div className="w-full para md:w-1/2">
                    {/* Paragraphs */}
                    {workshop.paragraphs && workshop.paragraphs.length > 0 && (
                      <div className="space-y-5 mb-6">
                        {workshop.paragraphs.map((para, i) => (
                          <p key={i} className="text-gray-300 para leading-relaxed text-sm md:text-base text-justify">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Target Audience */}
                    {workshop.targetAudience && workshop.targetAudience.length > 0 && (
                      <div className="mb-6 bg-gray-800/30 border border-primary-500/20 rounded-lg p-5 backdrop-blur-sm">
                        <h4 className="text-primary-400 font-semibold text-lg para mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                          Target Audience
                        </h4>
                        <ul className="space-y-3 pl-1">
                          {workshop.targetAudience.map((audience, i) => (
                            <li key={i} className="text-gray-200 para text-sm md:text-base flex items-start gap-3">
                              <span className="text-primary-400 mt-1.5 text-lg">
                                <ArrowRight className="w-4 h-4" />
                              </span>
                              <span>{audience}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Subtopics with Points */}
                    {workshop.subtopics && workshop.subtopics.length > 0 && (
                      <div className="space-y-6">
                        {workshop.subtopics.map((subtopic, i) => (
                          <div key={i} className="space-y-3">
                            <h4 className="text-primary-500 font-semibold text-lg para">{subtopic.title}</h4>
                            <ul className="space-y-2 pl-5">
                              {subtopic.points.map((point, j) => (
                                <li
                                  key={j}
                                  className="text-gray-300 para text-sm md:text-base relative before:content-['•'] before:absolute before:-left-5 before:text-primary-500 before:font-bold"
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopsPage;
