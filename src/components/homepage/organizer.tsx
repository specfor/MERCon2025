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
    bg-white/40
    md:bg-white/40
    backdrop-blur-md
    p-2
    h-64
    md:h-72
    flex items-center justify-center
    shadow-xl shadow-black/20
    transition-all duration-500
    ease-out
    hover:scale-[1.02]
    hover:bg-white/80
    hover:shadow-2xl
    hover:shadow-primary-500/20
    hover:border-white/30
  `;

  const imageProps: { className: string; objectFit: "contain"; placeholder?: "blurred" } = {
    className:
      "w-full h-full transition-all duration-500 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110",
    objectFit: "contain",
    // placeholder: "blurred" as const,
  };

  const organizers = [
    { image: <StaticImage src="../../images/logos/1.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/2.png" alt="Sponsor 1 Logo" {...imageProps} /> },
    { image: <StaticImage src="../../images/logos/3.png" alt="Sponsor 1 Logo" {...imageProps} /> },
  ];

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

  return (
    <section className="w-full py-24 px-6 bg-transparent md:px-12 relative overflow-hidden">
    {/* Bottom Gradient Overlay */}
    <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-0"></div>

      {/* Colorful blurred blobs in background */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse-slow delay-1000"></div> */}

      <div className="container mx-auto relative mb-10 z-10">
        <SectionHeader headerText="Organized By" />

        {/* Glass Grid */}
        {/* Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {organizers.map((org, index) => (
        <div key={index} className={`${glassCardClasses} group relative`}>
          {/* Shimmer */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-30"></div>

          {/* White rectangle container */}
          <div className="absolute inset-0 p-3 z-10">
            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
              {org.image}
            </div>
          </div>
        </div>
      ))}
    </div>




        <div className="mt-32">
          <SectionHeader headerText="Technical Co-Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {techSponsors.map((sponsor, index) => (
            <div key={index} className={`${glassCardClasses} relative group`}>
              {/* Shimmer / overlay */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-20"></div>

              {/* White rectangle container */}
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                  {sponsor.image}
                </div>
              </div>
            </div>
          ))}
        </div>



        <div className="mt-32">
          <SectionHeader headerText="Gold Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {goldSponsors.map((sponsor, index) => (
            <div key={index} className={`${glassCardClasses} relative group`}>
              {/* Shimmer / overlay */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer rounded-3xl z-20"></div>

              {/* White rectangle container */}
              <div className="absolute inset-0 p-3 z-10">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                  {sponsor.image}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
