import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import SpeakerRankGraph, { SpeakerLevel } from "../components/speakerRankGraph";

const speakerLevels: SpeakerLevel[] = [
  {
    levelName: "Mechanical Engineering Systems",
    rank: 1,
    speakers: [
      {
        name: "Prof. John Doe",
        university: "University of Example, USA",
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
    levelName: "Power Systems, Electrical Machines and High Voltage Engineering",
    rank: 2,
    speakers: [
      {
        name: "Dr. Sarah Smith",
        university: "University of Example, USA",
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
        university: "University of Example, USA",
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
    levelName: "Data Science and Artificial Intelligence",
    rank: 3,
    speakers: [
      {
        name: "Dr. Emily Chen",
        university: "University of Example, USA",
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
        university: "University of Example, USA",
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
        university: "University of Example, USA",
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
const TechnicalProgrammingCommittee = () => {
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

export default TechnicalProgrammingCommittee;
