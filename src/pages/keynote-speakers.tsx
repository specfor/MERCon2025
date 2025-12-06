import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Linkedin, Globe, MapPin } from "lucide-react";
import SectionHeader from "../components/sectionHeader";

// --- Types ---
interface Speaker {
  id: number;
  name: string;
  university: string;
  topic: string;
  bio: string;
  image: React.ReactNode; // Using ReactNode to handle StaticImage
  links: {
    linkedin?: string;
    website?: string;
  };
}

// --- Data (Replace with real data) ---
const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Prof. John Doe",
    university: "Massachusetts Institute of Technology (MIT), USA",
    topic: "The Future of Generative AI in Healthcare",
    bio: "Prof. Doe is a pioneer in machine learning applications for medical diagnostics. He has published over 200 papers and holds 15 patents in AI-driven imaging technologies.",
    image: (
      <StaticImage
        src="../images/keynote-speakers/lingjia.png"
        alt="Prof. John Doe"
        className="w-full h-full object-cover"
        placeholder="blurred"
      />
    ),
    links: { linkedin: "#", website: "#" },
  },
  {
    id: 2,
    name: "Dr. Sarah Smith",
    university: "University of Cambridge, UK",
    topic: "Sustainable Energy Grids",
    bio: "Dr. Smith leads the Global Energy Initiative. Her work focuses on integrating renewable energy sources into legacy power grids using smart control systems.",
    image: (
      <StaticImage
        src="../images/keynote-speakers/lingjia.png"
        alt="Dr. Sarah Smith"
        className="w-full h-full object-cover"
        placeholder="blurred"
      />
    ),
    links: { linkedin: "#" },
  },
  {
    id: 3,
    name: "Prof. A. Kumar",
    university: "National University of Singapore (NUS)",
    topic: "Robotics in Hazardous Environments",
    bio: "An award-winning roboticist, Prof. Kumar designs autonomous systems for deep-sea exploration and disaster response scenarios.",
    image: (
      <StaticImage
        src="../images/keynote-speakers/lingjia.png"
        alt="Prof. A. Kumar"
        className="w-full h-full object-cover"
        placeholder="blurred"
      />
    ),
    links: { website: "#" },
  },
];

// --- Components ---

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="group relative flex flex-col items-center">
      {/* 1. Image Wrapper with "Curved Sector" Background */}
      <div className="relative w-64 h-64 mb-8">
        {/* The Decorative Curved Sector (Behind) */}
        {/* This creates the yellow organic shape offset behind the image */}
        <div className="absolute top-4 -right-4 w-full h-full bg-primary-500/20 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl transform rotate-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105 z-0" />

        {/* A second darker accent shape for depth */}
        <div className="absolute -bottom-2 -left-2 w-2/3 h-2/3 border-2 border-primary-500/30 rounded-full -z-10" />

        {/* The Actual Image Container */}
        <div className="relative w-full h-full overflow-hidden rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl shadow-xl z-10 bg-gray-200">
          {/* Image Hover Zoom Effect */}
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">{speaker.image}</div>

          {/* Overlay for social icons on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            {speaker.links.linkedin && (
              <a
                href={speaker.links.linkedin}
                className="p-2 bg-white rounded-full text-blue-700 hover:scale-110 transition-transform"
              >
                <Linkedin size={20} />
              </a>
            )}
            {speaker.links.website && (
              <a
                href={speaker.links.website}
                className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Content Info */}
      <div className="text-center px-4 max-w-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {speaker.name}
        </h3>

        <div className="flex items-center justify-center gap-2 text-primary-600 font-medium mb-3 text-sm">
          <MapPin size={14} />
          <span className="uppercase tracking-wide">{speaker.university}</span>
        </div>

        {/* Topic Badge */}
        <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4 border border-gray-200">
          Keynote: {speaker.topic}
        </div>

        <p className="text-gray-500 leading-relaxed text-sm">{speaker.bio}</p>
      </div>
    </div>
  );
};

const KeynoteSpeakersPage = () => {
  return (
    <section className="w-full py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center my-20">
          <SectionHeader headerText="Keynote Speakers" textClass="text-black" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are honored to host distinguished experts who are shaping the future of technology and engineering.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {speakersData.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakersPage;
