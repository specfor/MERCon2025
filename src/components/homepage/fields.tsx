import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link as GatsbyLink } from "gatsby";

const iconClass =
  "w-full h-full filter-[invert(53%)_sepia(68%)_saturate(466%)_hue-rotate(99deg)_brightness(93%)_contrast(88%)]";

const fallbackIcon = (label: string) => (
  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 text-center text-sm font-semibold tracking-wide text-white/90">
    {label}
  </div>
);

const tracks = [
  {
    title: "Mechanical Engineering Systems",
    icon: (
      <StaticImage
        src="../../images/tracks/10y.png"
        alt="Mechanical Engineering Systems"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Power Systems, Electrical Machines and High Voltage Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/13y.png"
        alt="Power Systems, Electrical Machines and High Voltage Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Data Science and Artificial Intelligence",
    icon: (
      <StaticImage
        src="../../images/tracks/1y.png"
        alt="Data Science and Artificial Intelligence"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Natural Language Processing",
    icon: (
      <StaticImage
        src="../../images/tracks/NLP.png"
        alt="Data Science and Artificial Intelligence"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Textile and Apparel Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/17y.png"
        alt="Textile and Apparel Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Chemical and Process Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/3y.png"
        alt="Chemical and Process Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Supply Chain, Logistics and Mobility Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/19y.png"
        alt="Supply Chain, Logistics and Mobility Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Sustainable Energy & Environment",
    icon: (
      <StaticImage
        src="../../images/tracks/16y.png"
        alt="Sustainable Energy & Environment"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Robotics and Intelligent Systems",
    icon: (
      <StaticImage
        src="../../images/tracks/14y.png"
        alt="Robotics and Intelligent Systems"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Image Processing and Computer Vision",
    icon: (
      <StaticImage
        src="../../images/tracks/8y.png"
        alt="Image Processing and Computer Vision"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Materials Science and Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/9y.png"
        alt="Materials Science and Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Construction Engineering and Risk Management",
    icon: (
      <StaticImage
        src="../../images/tracks/4y.png"
        alt="Construction Engineering and Risk Management"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Mining, Earth Resources Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/12y.png"
        alt="Mining, Earth Resources Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Communication and Signal Processing",
    icon: (
      <StaticImage
        src="../../images/tracks/20y.png"
        alt="Communication and Signal Processing"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Electronics, Control, and Instrumentation",
    icon: (
      <StaticImage
        src="../../images/tracks/6y.png"
        alt="Electronics, Control, and Instrumentation"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Structural Engineering and Building Materials",
    icon: (
      <StaticImage
        src="../../images/tracks/structural.png"
        alt="Structural Engineering and Building Materials"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Hydraulics and Environmental Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/5y.png"
        alt="Hydraulics and Environmental Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Engineering Mathematics, Statistics",
    icon: (
      <StaticImage
        src="../../images/tracks/7y.png"
        alt="Engineering Mathematics, Statistics"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Transportation Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/19y.png"
        alt="Transportation Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Biomedical Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/2y.png"
        alt="Biomedical Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Geotechnical Engineering",
    icon: (
      <StaticImage
        src="../../images/tracks/geotechnical.png"
        alt="Geotechnical Engineering"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Micro/Nano Electro Mechanical Systems, Mechatronics, and Micromechatronics",
    icon: (
      <StaticImage
        src="../../images/tracks/11y.png"
        alt="Micro/Nano Electro Mechanical Systems, Mechatronics, and Micromechatronics"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Software Engineering and Cloud Computing",
    icon: (
      <StaticImage
        src="../../images/tracks/15y.png"
        alt="Software Engineering and Cloud Computing"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
  {
    title: "Technology Management",
    icon: (
      <StaticImage
        src="../../images/tracks/18y.png"
        alt="Technology Management"
        objectFit="contain"
        className={iconClass}
      />
    ),
  },
];

const ResearchFields: React.FC = () => (
  <section className="relative max-w-6xl mx-auto px-4">
    {/* Gradient BACKGROUND (behind everything) */}
    <div className="absolute inset-x-0 top-0 h-[40vh] z-0 pointer-events-none" />

    {/* CONTENT */}
    <div className="relative z-10">
      <h3 className="para text-base md:text-xl text-white text-center mb-12">
        MERCon 2026 solicits research papers describing significant & innovative research contributions to following
        areas of engineering. We will invite submissions on a wide range of research topics.
      </h3>

      <h3 className="text-2xl para font-bold text-white text-center mb-12">
        Papers can be submitted to the conference under the following regular tracks.
      </h3>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-items-center">
        {tracks.map((track) => (
          <GatsbyLink key={track.title} to="/call-for-papers" className="group">
            <div className="flex flex-col items-center">
              {/* Glass Card */}
              <div
                className="
                  w-full max-w-40 md:max-w-48
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-md
                  border border-white/20
                  shadow-lg
                  transition-all duration-500
                  group-hover:scale-105
                  group-hover:border-primary-500
                  group-hover:shadow-primary-500/30
                "
              >
                <div className="p-10 aspect-square flex items-center justify-center">{track.icon}</div>
              </div>

              <p className="mt-4 text-center text-white para font-medium group-hover:text-primary-400 transition-colors">
                {track.title}
              </p>
            </div>
          </GatsbyLink>
        ))}
      </div>
    </div>
  </section>
);

export default ResearchFields;
