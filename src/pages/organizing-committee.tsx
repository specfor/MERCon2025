import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import SpeakerRankGraph, { SpeakerLevel } from "../components/speakerRankGraph";

const speakerLevels: SpeakerLevel[] = [
  // {
  //   levelName: "Honorary Chair",
  //   rank: 1,
  //   speakers: [
  //     {
  //       name: "",
  //       image: <StaticImage src="../images/committee/Prof..png" alt="" className="w-full h-full" objectFit="contain" />,
  //     },
  //   ],
  // },
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
    levelName: "Organizing Committee Chair",
    rank: 3,
    speakers: [
      {
        name: "Dr. Rasara Samarasinghe",
        image: (
          <StaticImage
            src="../images/committee/Dr.Rasara.Samarasinghe.png"
            alt="Dr. Rasara Samarasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Program Committee Chairs",
    rank: 4,
    speakers: [
      {
        name: "Dr. Lihil Uthpala",
        image: (
          <StaticImage
            src="../images/committee/Dr.Lihil.Uthpala.png"
            alt="Dr. Lihil Uthpala"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
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
      {
        name: "Dr. Samiru Gayan",
        image: (
          <StaticImage
            src="../images/committee/Dr.Samiru.Gayan.png"
            alt="Dr. Samiru Gayan"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Publication Committee Chairs",
    rank: 5,
    speakers: [
      {
        name: "Dr. Jayani Sudusinghe",
        image: (
          <StaticImage
            src="../images/committee/Dr.Jayani.Sudusinghe.png"
            alt="Dr. Jayani Sudusinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
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
      {
        name: "Dr. Sampath Perera",
        image: (
          <StaticImage
            src="../images/committee/Dr.Sampath.Perera.png"
            alt="Dr. Sampath Perera"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "International Relations Committee Chair",
    rank: 6,
    speakers: [
      {
        name: "Dr. Akila Wijethunge",
        image: (
          <StaticImage
            src="../images/committee/Dr.Akila.Wijethunge.png"
            alt="Dr. Akila Wijethunge"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Finance Committee Chair",
    rank: 7,
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
    rank: 8,
    speakers: [
      {
        name: "Dr. Sureka Thiruchittappalam",
        image: (
          <StaticImage
            src="../images/committee/Dr.Sureka.Thiruchittappalam.png"
            alt="Dr. Sureka Thiruchittappalam"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Special Sessions Committee Chair",
    rank: 9,
    speakers: [
      {
        name: "Dr. Wageesha Manamperi",
        image: (
          <StaticImage
            src="../images/committee/Dr.Wageesha.Manamperi.png"
            alt="Dr. Wageesha Manamperi"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Workshop Committee Chair",
    rank: 10,
    speakers: [
      {
        name: "Dr. Thushara Subasinghe",
        image: (
          <StaticImage
            src="../images/committee/Dr.Thushara.Subasinghe.png"
            alt="Dr. Thushara Subasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Local Organizing Committee Chair",
    rank: 11,
    speakers: [
      {
        name: "Dr. Jayamali De Silva",
        image: (
          <StaticImage
            src="../images/committee/Dr.Jayamali.De.Silva.png"
            alt="Dr. Jayamali De Silva"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Sunimal Rathnayake",
        image: (
          <StaticImage
            src="../images/committee/Dr.Sunimal.Rathnayake.png"
            alt="Dr. Sunimal Rathnayake"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Logeeshan",
        image: (
          <StaticImage
            src="../images/committee/Dr.Logeeshan.png"
            alt="Dr. Logeeshan"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Registration Committee Chair",
    rank: 12,
    speakers: [
      {
        name: "Ms. Terashmila Lasagani",
        image: (
          <StaticImage
            src="../images/committee/Mrs.K.A.T.Lasagani.png"
            alt="Ms. Terashmila Lasagani"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Awards Committee Chair",
    rank: 13,
    speakers: [
      {
        name: "Prof. Sanath Jayawardena",
        image: (
          <StaticImage
            src="../images/committee/Prof.Sanath.Jayawardena.png"
            alt="Prof. Sanath Jayawardena"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Conference secretary",
    rank: 14,
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
  {
    levelName: "Webmaster",
    rank: 14,
    speakers: [
      {
        name: "Mr. Vihanga Nimsara",
        image: (
          <StaticImage
            src="../images/committee/Mr.Vihanga.Nimsara.png"
            alt="Mr. Vihanga Nimsara"
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
