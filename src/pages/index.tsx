import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Gallery from "../components/homepage/gallery";
import OrganizerSection from "../components/homepage/organizer";
import SectionHeader from "../components/sectionHeader";
import UniGallery from "../components/homepage/uniGallery";
import ResearchFields from "../components/homepage/fields";

// Hero background image
const heroBackground = (
  <div className="absolute w-full h-full">
    <StaticImage
      src="../images/hero-back.png"
      alt="Hero Background"
      className="absolute inset-0 w-full h-full object-cover"
      quality={90}
      formats={["auto", "webp", "avif"]}
      placeholder="blurred"
      layout="fullWidth"
      loading="eager"
    />
  </div>
);

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-dark-950">
      {/* Hero Section */}
      <section className="relative w-full h-screen z-10">
        {/* Background Image */}
        {heroBackground}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black -z-10"></div>

        {/* Content */}
        <div className="max-w-5xl mx-auto items-center text-center flex flex-col justify-center h-full relative z-40">
          <div className="mb-10 pt-10">
            <StaticImage
              src="../images/logo2026.png"
              alt="MERCon 2025 Logo"
              className="w-full max-w-64 md:max-w-[400px] lg:max-w-[600px] h-auto mx-auto"
            />
          </div>

          <h3 className="px-5 text-sm md:text-md font-normal leading-relaxed max-w-3xl text-gray-200 mb-8">
            Moratuwa Engineering Research Conference 2026 (MERCon 2026) is the 12<sup>th</sup> international conference
            organized by the Engineering Research Unit, University of Moratuwa. MERCon solicits research papers
            describing significant and innovative research contributions in all disciplines of engineering.
          </h3>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl">
              <div className="flex items-center gap-2 text-white font-semibold">
                <i className="fas fa-calendar text-primary-500"></i>
                {/* 14<sup>th</sup> and 15<sup>th</sup> August 2026 */}
                {"<Date>"} 2026
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
        <section id="call-for-papers" className="w-full py-20 px-6 md:px-12 bg-gray-300">
          <ResearchFields />
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

            <UniGallery />
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>MERCon 2025 - Home</title>;
