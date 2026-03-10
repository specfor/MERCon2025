import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../sectionHeader";

const OrganizerSection = () => {
  const glassCardClasses = `
  group
  relative
  overflow-hidden
  rounded-2xl
  border border-white/20
  bg-white/70
  backdrop-blur-xl
  p-2
  h-64
  md:h-72
  flex items-center justify-center
  shadow-xl shadow-black/20
  transition-all duration-500 ease-out
  hover:bg-white
  hover:border-white/40
`;

  const imageProps: { className: string; objectFit: "contain"; placeholder?: "blurred" } = {
    className:
      "w-full h-full transition-all duration-500 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110",
    objectFit: "contain",
  };

  const organizers = [
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/2.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/3.png" alt="Sponsor 1 Logo" {...imageProps} /> },
  ];

  const financialSponsors = [
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
  ]

  const techSponsors = [
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
  ];

  const goldSponsors = [
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
  ];

  const getSingleItemClass = (length: number) =>
    length === 1
      ? "md:col-span-2 md:w-[calc(50%-1rem)] md:justify-self-center lg:col-span-1 lg:col-start-2 lg:w-full"
      : "";

  return (
    <section className="w-full py-24 px-6 md:px-12 relative overflow-hidden">

      

      {/* Bottom Gradient Overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none -z-10"
        style={{ background: "linear-gradient(to top, rgb(25,25,25), transparent)" }}
      ></div>

      <div className="container mx-auto relative mb-10 z-10">
        <SectionHeader headerText="Organized By" />

        {/* Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {organizers.map((org, index) => (
            <div key={index} className={`${glassCardClasses} group relative ${getSingleItemClass(organizers.length)}`}>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-30"></div>
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full rounded-xl flex items-center justify-center">{org.image}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32">
          <SectionHeader headerText="Financial Co-Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {financialSponsors.map((sponsor, index) => (
            <div key={index} className={`${glassCardClasses} relative group ${getSingleItemClass(financialSponsors.length)}`}>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-20"></div>
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full rounded-xl flex items-center justify-center">{sponsor.image}</div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-32">
          <SectionHeader headerText="Technical Co-Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {techSponsors.map((sponsor, index) => (
            <div key={index} className={`${glassCardClasses} relative group ${getSingleItemClass(techSponsors.length)}`}>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-20"></div>
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full rounded-xl flex items-center justify-center">{sponsor.image}</div>
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="mt-32">
          <SectionHeader headerText="Gold Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {goldSponsors.map((sponsor, index) => (
            <div key={index} className={`${glassCardClasses} relative group ${getSingleItemClass(goldSponsors.length)}`}>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-20"></div>
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full rounded-xl flex items-center justify-center">{sponsor.image}</div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default OrganizerSection;
