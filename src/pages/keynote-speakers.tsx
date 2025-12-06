import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Linkedin, Globe, MapPin } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import SpeakerCard, { Speaker } from "../components/speakerCard";

const speakersData: Speaker[] = [
  {
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
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakersPage;
