import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowLeft, ExternalLink, Calendar, Clock, Users, Layers, Video } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const WorkshopLidar360DetailsPage: React.FC = () => {
  const registerLink = "/workshops/LiDAR360/register";

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
            <SectionHeader headerText="LiDAR360 Fast Track Workshop" textClass="text-white" />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Calendar className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">31st July 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">9:00 AM – 1:00 PM</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Video className="w-5 h-5 text-primary-400" />
                <span className="text-gray-200 para font-semibold">Via Zoom</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/30 border border-primary-500/20 rounded-full px-6 py-3">
                <Layers className="w-5 h-5 text-primary-400" />
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
                  Take your first step into the world of LiDAR and geospatial analysis with the LiDAR360 Fast Track
                  Workshop at MERCon 2026.
                </p>
                <p className="text-gray-300 para leading-relaxed text-sm md:text-base">
                  Learn industry-standard workflows with practical demonstrations, real datasets, and interactive
                  sessions led by field experts. Start your LiDAR journey with practical learning covering point cloud
                  visualization, classification, terrain models, feature extraction, forestry analysis, and data export.
                </p>
              </div>

              {/* Register CTA */}
              <div className="bg-primary-500/20 border-2 border-primary-500 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-primary-500/20">
                <h3 className="text-primary-300 font-bold text-2xl para mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                  Register Now
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-200">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <p className="para font-semibold text-white">31st July 2026</p>
                  </div>
                  <p className="para text-sm text-gray-300">9:00 AM – 1:00 PM · Via Zoom</p>
                  <a
                    href={registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-500/50"
                  >
                    <span className="para">Register Now</span>
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Speakers */}
              <div className="bg-gray-800/30 border border-primary-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-primary-400 font-bold text-2xl para mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Speakers
                </h3>
                <ul className="space-y-5">
                  <li className="text-gray-200 para text-sm md:text-base">
                    <p className="font-semibold text-white">Thilosha Nipunajith</p>
                    <p className="text-primary-400 text-sm mt-1">Manager – Spatial Data Systems</p>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      Geospatial professional with expertise in remote sensing, GIS, and geospatial solution
                      development. BSc. (Hons) in Surveying Sciences in GIS, Sabaragamuwa University of Sri Lanka.
                    </p>
                  </li>
                  <li className="text-gray-200 para text-sm md:text-base">
                    <p className="font-semibold text-white">Shalitha Eranga</p>
                    <p className="text-primary-400 text-sm mt-1">Assistant Manager – Surveying & GIS</p>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      Geospatial professional with expertise in point cloud classification, terrain and 3D model
                      generation, feature extraction, and geospatial data optimization. BSc. (Hons) in Surveying
                      Sciences in GIS, Sabaragamuwa University of Sri Lanka.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Workshop Image */}
            <div className="w-full lg:w-3/5">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-2xl">
                  <StaticImage
                    src="../images/workshop2.png"
                    alt="LiDAR360 Fast Track Workshop Details"
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
                  title: "Point Cloud Visualization",
                  points: ["Explore and visualize LiDAR point cloud data", "Industry-standard viewing workflows"],
                },
                {
                  title: "Classification",
                  points: ["Classify point cloud data effectively", "Practical demonstration with real datasets"],
                },
                {
                  title: "Terrain Models",
                  points: ["Generate terrain and 3D models", "Apply workflows used in industry practice"],
                },
                {
                  title: "Feature Extraction",
                  points: ["Extract meaningful geospatial features", "Optimize geospatial data for analysis"],
                },
                {
                  title: "Forestry Analysis",
                  points: ["Apply LiDAR workflows to forestry applications", "Interactive hands-on session"],
                },
                {
                  title: "Data Export",
                  points: ["Export processed LiDAR and geospatial outputs", "Prepare data for downstream use"],
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

export default WorkshopLidar360DetailsPage;

export const Head = createPageHead({
  title: "LiDAR360 Fast Track Workshop - MERCon 2026",
  description:
    "LiDAR360 Fast Track Workshop at MERCon 2026 — practical LiDAR and geospatial analysis with industry workflows, real datasets, and interactive sessions on 31st July 2026.",
});
