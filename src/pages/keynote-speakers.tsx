import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import type { Speaker } from "../components/speakerCard";
import SpeakerCard from "../components/speakerCard";

const speakersData: (Speaker & { desc?: string[] })[] = [
  {
    name: "Dr. Guohong Tian",
    university:
      "Associate Professor (Reader) in Automotive Engineering, School of Engineering, University of Surrey, United Kingdom",
    desc: [
      "Dr Guohong Tian is an Associate Professor (Reader) in Automotive Engineering at the School of Engineering, University of Surrey. His research focuses on advanced internal combustion engine technologies, alternative and sustainable fuels, battery thermal management, and vehicle electrification.",
      "Dr Tian has collaborated extensively with leading organisations including Jaguar Land Rover, Cummins, BP, Shell, JCB, and Continental, bridging fundamental research with industrial applications. He leads and contributes to numerous research and development projects funded by EPSRC, Innovate UK, the EU, the Royal Society, and industry partners. Currently, he is spearheading a major demonstration project in Colombo aimed at electrifying three-wheelers.",
      "He has published widely on topics such as alternative fuel combustion and injection, advanced engine diagnostics, free-piston engines and control optimisation, battery thermal management, and waste heat recovery. In addition to his research, Dr Tian serves as Associate Editor for Frontiers in Thermal Engineering and Energy Engineering, and as Guest Editor for several leading journals.",
      "With extensive academic and industrial experience in sustainable and emerging automotive technologies, Dr Tian brings authoritative insights as a keynote speaker for MERCON 2026.",
    ],
    image: (
      <StaticImage
        src="../images/keynote-speakers/Dr.Guohong.Tian.jpg"
        alt="Dr Guohong Tian"
        objectFit="contain"
        className="w-full h-full"
        placeholder="blurred"
      />
    ),
  },
  {
    name: "Prof. Kasun Hewage",
    university:
      "FortisBC Smart Energy Chair; Associate Director, Clean Energy Research Centre (CERC), University of British Columbia (UBC), Canada",
    desc: [
      "Prof. Kasun Hewage is a Full-Professor and FortisBC Smart Energy Chair in the School of Engineering at the University of British Columbia (UBC). He is also the Associate Director of UBC’s Clean Energy Research Centre (CERC) and Director of the Life Cycle Management Laboratory (LCML).  Prof. Hewage has multidisciplinary industrial experience in Canada and internationally. Before joining UBC in 2008, Professor Hewage worked as a business management cost specialist in the oil and gas industry and as a civil engineer on hydropower and infrastructure development projects.",
      "Prof. Hewage’s research specifically focuses on integrating life cycle thinking into urban development, energy policy, and infrastructure planning. The uniqueness of his research lies in its ability to go beyond standard assessments by analyzing products and processes from material extraction through end-of-life. His research team has assisted governments and infrastructure developers in achieving low-impact, net-zero development in existing and planned communities. He currently leads collaborative research projects on the life-cycle management of built assets, green construction, and smart energy options. Dr. Hewage’s novel contributions to the body of knowledge in integrated sustainable community planning, with life cycle thinking, are defining key benchmarks and pathways for the Canadian and global construction industry. Prof. Hewage has authored/co-authored more than 300 publications in peer-reviewed academic journals, as well as numerous book chapters and conference proceedings at national/international conferences.",
      "Prof. Hewage is registered as a Professional Engineer in British Columbia, Canada. He is also a Fellow of the Canadian Society of Civil Engineering (FCSCE) and a Fellow of the Engineering Institute of Canada (FEIC).",
    ],
    image: (
      <StaticImage
        src="../images/keynote-speakers/prof.kasun.hewage.png"
        alt="Prof. Kasun Hewage"
        objectFit="contain"
        className="w-full h-full"
        placeholder="blurred"
      />
    ),
  },
];

const KeynoteSpeakersPage = () => {
  return (
    <section className="w-full py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center my-16">
          <SectionHeader headerText="Keynote Speakers" textClass="text-black" />
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We are honored to host distinguished experts who are shaping the future of technology and engineering.
          </p>
        </div>

        {/* Speakers Alternating Layout */}
        <div className="flex flex-col gap-20">
          {speakersData.map((speaker, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={speaker.name}
                className={`flex flex-col md:flex-row justify-center items-start md:items-center gap-10 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <SpeakerCard speaker={speaker} />

                {/* Description */}
                <div className="w-full md:w-1/2">
                  {speaker.desc && speaker.desc.length ? (
                    <div className="space-y-4 text-justify">
                      {speaker.desc.map((para, i) => (
                        <p key={i} className="text-gray-700 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">Details will be announced soon.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakersPage;
