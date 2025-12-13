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
        name: "Prof. Lidula N. Widanagama Arachchige",
        image: (
          <StaticImage
            src="../images/committee/Prof.Lidula.N.Widanagama.Arachchige.png"
            alt="Prof. Lidula N. Widanagama Arachchige"
            className="w-full h-full"
            objectFit="contain"
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
        name: "Dr. Chamira Edussooriya ",
        image: (
          <StaticImage
            src="../images/committee/Dr.Chamira.Edussooriya.png"
            alt="Dr. Chamira Edussooriya "
            className="w-full h-full"
            objectFit="contain"
          />
        ),
      },
    ],
  },
  {
    levelName: "Program Committee Chairs",
    rank: 3,
    speakers: [
      {
        name: "Dr. Biman Hettiarachchi",
        image: (
          <StaticImage
            src="../images/committee/Dr.Biman.Hettiarachchi.png"
            alt="Dr. Biman Hettiarachchi"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Financial and Registration Committee Chair",
    rank: 3,
    speakers: [
      {
        name: "Dr. Aruna Bandara",
        image: (
          <StaticImage
            src="../images/committee/Dr.Aruna.Bandara.png"
            alt="Dr. Aruna Bandara"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Publicity Committee Chair",
    rank: 4,
    speakers: [
      {
        name: "Dr. Dumith Jayathilaka",
        image: (
          <StaticImage
            src="../images/committee/Dr.Dumith.Jayathilake.png"
            alt="Dr. Dumith Jayathilaka"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Conference secretary",
    rank: 5,
    speakers: [
      {
        name: "Ms. Chamodi Thisara",
        image: (
          <StaticImage
            src="../images/committee/Ms.Chamodi.Thisara.png"
            alt="Ms. Chamodi Thisara"
            className="w-full h-full"
            objectFit="cover"
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
