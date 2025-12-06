import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Link as GatsbyLink } from "gatsby";
import Gallery from "../components/homepage/gallery";
import OrganizerSection from "../components/homepage/organizer";
import SectionHeader from "../components/sectionHeader";
import UniGallery from "../components/homepage/uniGallery";

// Hero background image
const heroBackground = (
  <div className="absolute w-full h-full">
    <StaticImage
      src="../images/hero-back.png"
      alt="Hero Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
);

// Static imports for track images
const trackImages = {
  track1: (
    <StaticImage
      src="../images/tracks/1y.png"
      alt="Data Science and Artificial Intelligence"
      className="w-full h-full"
    />
  ),
  track2: <StaticImage src="../images/tracks/2y.png" alt="Biomedical Engineering" className="w-full h-full" />,
  track3: <StaticImage src="../images/tracks/3y.png" alt="Chemical Engineering" className="w-full h-full" />,
  track4: <StaticImage src="../images/tracks/4y.png" alt="Civil Engineering" className="w-full h-full" />,
  track5: <StaticImage src="../images/tracks/5y.png" alt="Environmental Engineering" className="w-full h-auto" />,
  track6: <StaticImage src="../images/tracks/6y.png" alt="Electronic Engineering" className="w-full h-full" />,
  track7: (
    <StaticImage src="../images/tracks/7y.png" alt="Engineering Mathematics & Statistics" className="w-full h-full" />
  ),
  track8: <StaticImage src="../images/tracks/8y.png" alt="Signal Processing" className="w-full h-full" />,
  track9: (
    <StaticImage src="../images/tracks/9y.png" alt="Materials Science and Engineering" className="w-full h-full" />
  ),
  track10: (
    <StaticImage src="../images/tracks/10y.png" alt="Mechanical Engineering Systems" className="w-full h-full" />
  ),
  track11: (
    <StaticImage src="../images/tracks/11y.png" alt="Micro/Nano Electro Mechanical Systems" className="w-full h-full" />
  ),
  track12: (
    <StaticImage src="../images/tracks/12y.png" alt="Mining and Mineral Exploration" className="w-full h-full" />
  ),
  track13: (
    <StaticImage
      src="../images/tracks/13y.png"
      alt="Electrical Machines & Solid State Drives"
      className="w-full h-full"
    />
  ),
  track14: (
    <StaticImage src="../images/tracks/14y.png" alt="Robotics and Intelligent Systems" className="w-full h-full" />
  ),
  track15: (
    <StaticImage
      src="../images/tracks/15y.png"
      alt="Software Engineering and Cloud Computing"
      className="w-full h-full"
    />
  ),
  track16: <StaticImage src="../images/tracks/16y.png" alt="Sustainable Energy" className="w-full h-full" />,
  track17: <StaticImage src="../images/tracks/17y.png" alt="Textile and Apparel" className="w-full h-full" />,
  track18: (
    <StaticImage src="../images/tracks/18y.png" alt="Engineering Technology Management" className="w-full h-full" />
  ),
  track19: <StaticImage src="../images/tracks/19y.png" alt="Transportation Engineering and Logistics" />,
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-dark-950">
      {/* Hero Section */}
      <section className="relative w-full h-screen z-10 overflow-\">
        {/* Background Image */}
        {heroBackground}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black -z-10"></div>

        {/* Content */}
        <div className="max-w-5xl mx-auto items-center text-center flex flex-col justify-center h-full relative z-40">
          <div className="mb-10">
            <StaticImage
              src="../images/logo2025.png"
              alt="MERCon 2025 Logo"
              className="w-full max-w-[600px] h-auto mx-auto"
            />
          </div>

          <h3 className="text-base md:text-md font-normal leading-relaxed max-w-3xl text-gray-200 mb-8">
            Moratuwa Engineering Research Conference 2025 (MERCon 2025) is the 11<sup>th</sup> international conference
            organized by the Engineering Research Unit, University of Moratuwa. MERCon solicits research papers
            describing significant and innovative research contributions in all disciplines of engineering.
          </h3>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl">
              <div className="flex items-center gap-2 text-white font-semibold">
                <i className="fas fa-calendar text-primary-500"></i>
                14<sup>th</sup> and 15<sup>th</sup> August 2025
              </div>
            </div>

            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl">
              <div className="flex items-center gap-2 text-white font-semibold">
                <i className="fas fa-map-marker-alt text-primary-500"></i>
                University of Moratuwa
              </div>
            </div>
          </div>

          <a href="#call-for-papers" className="inline-block text-primary-500 text-3xl animate-bounce">
            <i className="fas fa-arrow-down"></i>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <div className="grow w-full bg-black">
        {/* Call for Papers Section */}
        <section id="call-for-papers" className="w-full py-20 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg text-center text-gray-200 mb-12">
              MERCon 2025 solicits research papers describing significant & innovative research contributions to
              following areas of engineering. We will invite submissions on a wide range of research topics.
            </h3>

            <h3 className="text-2xl font-bold text-center text-white mb-12">
              Papers can be submitted to the conference under the following regular tracks.
            </h3>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              {[
                { title: "Data Science and Artificial Intelligence", key: "track1" },
                { title: "Biomedical Engineering", key: "track2" },
                { title: "Chemical Engineering", key: "track3" },
                { title: "Civil Engineering", key: "track4" },
                { title: "Environmental Engineering", key: "track5" },
                { title: "Electronic Engineering", key: "track6" },
                { title: "Engineering Mathematics & Statistics", key: "track7" },
                { title: "Signal Processing", key: "track8" },
                { title: "Materials Science and Engineering", key: "track9" },
                { title: "Mechanical Engineering Systems", key: "track10" },
                { title: "Micro/Nano Electro Mechanical Systems, Mechatronics, and Micromechatronics", key: "track11" },
                { title: "Mining and Mineral Exploration", key: "track12" },
                { title: "Electrical Machines & Solid State Drives", key: "track13" },
                { title: "Robotics and Intelligent Systems", key: "track14" },
                { title: "Software Engineering and Cloud Computing", key: "track15" },
                { title: "Sustainable Energy", key: "track16" },
                { title: "Textile and Apparel", key: "track17" },
                { title: "Engineering Technology Management", key: "track18" },
                { title: "Transportation Engineering and Logistics", key: "track19" },
              ].map((track, index) => (
                <GatsbyLink key={index} to="/call-for-papers" className="block">
                  <div className="bg-dark-800 border-2 w-full h-fit border-primary-700 rounded-3xl hover:border-primary-500 transition-colors">
                    <div className="w-full h-auto p-10 aspect-square rounded-4xl bg-dark-900">
                      {trackImages[track.key as keyof typeof trackImages]}
                    </div>
                  </div>
                  <p className="p-4 text-center text-gray-200 text-sm font-medium group-hover:text-primary-500 transition-colors grow flex items-start justify-center">
                    {track.title}
                  </p>
                </GatsbyLink>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Organized By Section */}
        <OrganizerSection />

        {/* Event Venue Section */}
        <section id="venue" className="w-full py-16 px-6 md:px-12 bg-dark-900">
          <div className="container mx-auto">
            <SectionHeader headerText="Event Venue" />

            <h3 className="text-3xl font-bold text-center text-primary-500 mt-12 mb-8">University Of Moratuwa</h3>

            <h3 className="text-lg text-center text-gray-300 mb-8">
              University of Moratuwa, a leading technological university in the region welcomes you to witness a truly
              unique experience!
            </h3>

            {/* Map */}
            <div className="flex w-full justify-center">
              <div className="max-w-4xl w-full mb-12 rounded-lg overflow-hidden border border-accent-gold/50">
                <iframe
                  width="100%"
                  height="500"
                  frameBorder="0"
                  src="https://maps.google.com/maps?q=university of moratuwa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>

            {/* Venue Info Card */}
            <div className="bg-dark-800 border-2 border-accent-gold rounded-lg p-6 mb-12 text-center">
              <h2 className="text-2xl font-bold text-accent-gold">Beauty of University of Moratuwa</h2>
            </div>

            <UniGallery />
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>MERCon 2025 - Home</title>;
