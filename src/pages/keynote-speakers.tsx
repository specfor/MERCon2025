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
        src="../images/keynote-speakers/Dr.Guohong.Tian.png"
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
      "Prof. Kasun Hewage is a Full-Professor and FortisBC Smart Energy Chair in the School of Engineering at the University of British Columbia (UBC). He is also the Associate Director of UBC’s Clean Energy Research Centre (CERC) and Director of the Life Cycle Management Laboratory (LCML).",
      "His research focuses on integrating life cycle thinking into urban development, energy policy, and infrastructure planning, enabling governments and infrastructure developers to achieve low-impact, net-zero development.",
      "Prof. Hewage has authored over 300 publications in peer-reviewed journals, book chapters, and international conference proceedings. He is a Professional Engineer in British Columbia, Canada, and a Fellow of multiple engineering institutions.",
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

      {/* Optional image background (commented safely) */}
      {/*
      <div className="fixed inset-0 -z-10">
        <StaticImage
          src="../images/hero-back.png"
          alt="Background"
          className="w-full h-full object-cover"
          quality={90}
          formats={["auto", "webp", "avif"]}
          placeholder="blurred"
          loading="eager"
        />
      </div>
      */}
      {/* ===== CONTENT ===== */}
      <section className="relative w-full py-24 px-6 overflow-hidden z-40">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center my-16">
            <SectionHeader headerText="Keynote Speakers" textClass="text-white" />
            <p className="text-gray-400 text-lg max-w-4xl para mx-auto mt-4">
              We are honored to host distinguished experts who are shaping the future of technology and engineering.
            </p>
          </div>

          {/* Speakers */}
          <div className="flex flex-col gap-24">
            {speakersData.map((speaker, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={speaker.name}
                  className={`flex flex-col md:flex-row gap-12 items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Speaker Card */}
                  <SpeakerCard speaker={speaker} />

                  {/* Description */}
                  <div className="w-full para md:w-1/2">
                    {speaker.desc && speaker.desc.length ? (
                      <div className="space-y-5 text-justify">
                        {speaker.desc.map((para, i) => (
                          <p
                            key={i}
                            className="text-gray-300 para leading-relaxed text-sm md:text-base"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 para leading-relaxed">
                        Details will be announced soon.
                      </p>
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

export default KeynoteSpeakersPage;
