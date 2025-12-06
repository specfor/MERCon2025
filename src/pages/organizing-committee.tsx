import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import SpeakerRankGraph, { SpeakerLevel } from "../components/speakerRankGraph";

const speakerLevels: SpeakerLevel[] = [
  {
    levelName: "Conference Chair",
    rank: 1,
    speakers: [
      {
        name: "Prof. John Doe",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 1"
            className="w-full h-full object-cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Technical Program Committee Chair",
    rank: 2,
    speakers: [
      {
        name: "Dr. Sarah Smith",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 2"
            className="w-full h-full object-cover"
          />
        ),
      },
      {
        name: "Prof. A. Kumar",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 3"
            className="w-full h-full object-cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Organizing Committee Chair",
    rank: 3,
    speakers: [
      {
        name: "Dr. Emily Chen",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 4"
            className="w-full h-full object-cover"
          />
        ),
      },
      {
        name: "Prof. Michael Ross",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 5"
            className="w-full h-full object-cover"
          />
        ),
      },
      {
        name: "Dr. Yuki Tanaka",
        image: (
          <StaticImage
            src="../images/keynote-speakers/lingjia.png"
            alt="Speaker 6"
            className="w-full h-full object-cover"
          />
        ),
      },
    ],
  },
];

// --- Main Section Component ---
const OrganizingCommittee = () => {
  return (
    <section className="w-full py-24 px-4 md:px-8 mt-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Page Title */}
        <SectionHeader headerText="Organizing Committee" textClass="text-black" />

        <SpeakerRankGraph speakerLevels={speakerLevels} />
      </div>
    </section>
  );
};

export default OrganizingCommittee;
