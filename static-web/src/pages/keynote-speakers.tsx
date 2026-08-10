import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { User, Calendar, Clock, MapPin } from "lucide-react";
import SectionHeader from "../components/sectionHeader";
import type { Speaker } from "../components/speakerCard";
import SpeakerCard from "../components/speakerCard";
import { createPageHead } from "../components/pageHead";

const speakersData: (Speaker & { 
  desc?: string[]; 
  talkTitle?: string; 
  abstract?: string;
  date?: string;
  time?: string;
  venue?: string;
})[] = [
  {
    name: "Prof. Kasun Hewage",
    university:
      "FortisBC Smart Energy Chair; Associate Director, Clean Energy Research Centre (CERC), University of British Columbia (UBC), Canada",
    talkTitle: "Life cycle thinking in Engineering Decisions and Public Policy - A Canadian Perspective.",
    date: "13th August",
    time: "11:00 am",
    venue: "TMLE Auditorium, University of Moratuwa",
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
  {
    name: "Associate Prof. Guohong Tian",
    university:
      "Associate Professor (Reader) in Automotive Engineering, School of Engineering, University of Surrey, United Kingdom",
    talkTitle: "Beyond Vehicle Retrofit: An Integrated Ecosystem for Tuk Tuk Electrification",
    date: "14th August 2026",
    time: "11:30 AM",
    venue: "Civil Auditorium, University of Moratuwa",
    desc: [
      "Associate Prof. Guohong Tian is an Associate Professor (Reader) in Automotive Engineering at the School of Engineering, University of Surrey. His research focuses on advanced internal combustion engine technologies, alternative and sustainable fuels, battery thermal management, and vehicle electrification.",
      "Associate Prof. Tian has collaborated extensively with leading organisations including Jaguar Land Rover, Cummins, BP, Shell, JCB, and Continental, bridging fundamental research with industrial applications. He leads and contributes to numerous research and development projects funded by EPSRC, Innovate UK, the EU, the Royal Society, and industry partners. Currently, he is spearheading a major demonstration project in Colombo aimed at electrifying three-wheelers.",
      "He has published widely on topics such as alternative fuel combustion and injection, advanced engine diagnostics, free-piston engines and control optimisation, battery thermal management, and waste heat recovery. In addition to his research, Associate Prof. Tian serves as Associate Editor for Frontiers in Thermal Engineering and Energy Engineering, and as Guest Editor for several leading journals.",
      "With extensive academic and industrial experience in sustainable and emerging automotive technologies, Associate Prof. Tian brings authoritative insights as a keynote speaker for MERCON 2026.",
    ],
    image: (
      <StaticImage
        src="../images/keynote-speakers/Dr.Guohong.Tian.png"
        alt="Associate Prof. Guohong Tian"
        objectFit="contain"
        className="w-full h-full"
        placeholder="blurred"
      />
    ),
  },
  {
    name: "Prof. Mahinda Vilathgamuwa",
    university:
      "Professor, Queensland University of Technology, Brisbane, Australia",
    talkTitle: "Dynamic Operating Envelopes for Unbalanced Distribution Networks: Robustness, Fairness, and Open Challenges",
    date: "14th August 2026",
    time: "1:30 PM",
    venue: "Civil Auditorium, University of Moratuwa",
    abstract: "The rapid electrification of transport, buildings, and industry, together with increasing distributed energy resource (DER) penetration, is transforming electric distribution networks. Traditional static network limits are inadequate for managing the uncertainty and phase imbalance introduced by rooftop PV, battery storage, electric vehicles, and flexible loads, particularly in low-voltage feeders with predominantly single-phase connections. Dynamic Operating Envelopes (DOEs) offer a promising framework for adaptive, uncertainty-aware capacity allocation, but existing methods largely overlook unbalanced three-phase effects and equitable allocation across customers. This talk presents a robust DOE framework for unbalanced three-phase LV networks, computing uncertainty-aware envelopes using sensitivity-based robust optimisation under box uncertainty and integrating these into a chance-constrained scheduling framework for electric vehicle charging that accounts for stochastic departure times and battery degradation. Fairness in envelope allocation across customers is also addressed. The talk concludes by discussing open challenges in DOE deployment, including network modelling assumptions and computational scalability.",
    desc: [
      "Mahinda Vilathgamuwa received the B.Sc. degree in electrical engineering from the University of Moratuwa, Moratuwa, Sri Lanka, in 1985, and the Ph.D. degree in electrical engineering from Cambridge University, Cambridge, U.K., in 1993.",
      "In 1993, he joined the School of Electrical and Electronic Engineering, Nanyang Technological University, Singapore, as a Lecturer and then became an Associate Professor.",
      "He is currently a Professor with the Queensland University of Technology, Brisbane, Australia. He is an IEEE Fellow and IEEE Power Electronic Society distinguished lecturer.",
      "His current research interests include power electronic converters, wireless power transfer systems, energy storage, electrical drives, and power quality.",
    ],
    image: (
          <StaticImage
        src="../images/keynote-speakers/Prof.Mahinda.Vilathgamuwa.png"
        alt="Prof. Kasun Hewage"
        objectFit="cover"
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
                    {speaker.talkTitle && (
                      <div className="mb-6">
                        <h4 className="text-lg md:text-xl font-bold text-emerald-400 mb-3 leading-snug">
                          {speaker.talkTitle}
                        </h4>
                        
                        {(speaker.date || speaker.time || speaker.venue) && (
                          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-gray-400 mb-5">
                            {speaker.date && (
                              <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-emerald-500" />
                                <span>{speaker.date}</span>
                              </div>
                            )}
                            {speaker.time && (
                              <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-emerald-500" />
                                <span>{speaker.time}</span>
                              </div>
                            )}
                            {speaker.venue && (
                              <div className="flex items-center gap-1.5">
                                <MapPin size={16} className="text-emerald-500" />
                                <span>{speaker.venue}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {speaker.abstract && (
                          <div className="text-gray-300 text-sm md:text-base leading-relaxed text-justify mb-6">
                            <span className="font-bold text-white">Abstract — </span>
                            {speaker.abstract}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {speaker.desc && speaker.desc.length ? (
                      <div className="space-y-5 text-justify">
                        {speaker.talkTitle && (
                          <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                            Biography
                          </h5>
                        )}
                        {speaker.desc.map((para, i) => (
                          <p key={i} className="text-gray-300 para leading-relaxed text-sm md:text-base">
                            {para}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 para leading-relaxed">Details will be announced soon.</p>
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

export const Head = createPageHead({
  title: "Keynote Speakers - MERCon 2026",
  description: "MERCon 2026 keynote speakers and speaker profiles.",
});
