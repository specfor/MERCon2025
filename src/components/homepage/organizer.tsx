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
    bg-white/20
    md:bg-white/10
    backdrop-blur-md
    p-2
    h-64
    md:h-72
    flex items-center justify-center
    shadow-xl shadow-black/20
    transition-all duration-500
    ease-out
    hover:scale-[1.02]
    hover:bg-white/20
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
    <section className="w-full py-24 px-6 md:px-12 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-green-900 to-black"></div>
      {/* Colorful blurred blobs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto relative mb-10 z-10">
        <SectionHeader headerText="Organized By" />

        {/* Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {organizers.map((org) => (
            <div className={glassCardClasses}>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>

              {org.image}
            </div>
          ))}
        </div>

        <div className="mt-32">
          <SectionHeader headerText="Technical Co-Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {techSponsors.map((sponsor) => (
            <div className={glassCardClasses}>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>

              {sponsor.image}
            </div>
          ))}
        </div>

        <div className="mt-32">
          <SectionHeader headerText="Gold Sponsors" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {goldSponsors.map((sponsor) => (
            <div className={glassCardClasses}>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>

              {sponsor.image}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
