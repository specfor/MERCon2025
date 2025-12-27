import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Gallery from "../components/homepage/gallery";
import OrganizerSection from "../components/homepage/organizer";
import SectionHeader from "../components/sectionHeader";
import UniGallery from "../components/homepage/uniGallery";
import ResearchFields from "../components/homepage/fields";
import bgImg2 from "../images/bg2.png";
import bgImg1 from "../images/bg1.png";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* Hero Section with bg1 */}
      <section
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6 md:px-12 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg1})` }}
      >
        {/* Optional overlay for readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
          {/* Logo */}
          <div className="mb-10 pt-10">
            <StaticImage
              src="../images/logo2026.png"
              alt="MERCon 2026 Logo"
              className="w-full max-w-64 md:max-w-[400px] lg:max-w-[600px] h-auto mx-auto"
            />
          </div>

          {/* Description */}
          <h3 className="px-5 text-xl md:text-xl font-normal leading-relaxed max-w-3xl para text-gray-200 mt-4 mb-12">
            Moratuwa Engineering Research Conference 2026 (MERCon 2026) is the 12<sup>th</sup> international conference
            organized by the Engineering Research Unit, University of Moratuwa. MERCon solicits research papers
            describing significant and innovative research contributions in all disciplines of engineering.
          </h3>

          {/* Date & Venue */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl">
              <div className="flex items-center justify-center para text-xl gap-2 text-white font-semibold">
                <i className="fas fa-calendar text-primary-500"></i>
                13<sup className="-ml-2">th</sup> and 14<sup className="-ml-2">th</sup> August 2026
              </div>
            </div>

            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl">
              <div className="flex items-center gap-2 text-white para text-xl font-semibold">
                <i className="fas fa-map-marker-alt text-primary-500"></i>
                University of Moratuwa
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <a href="#call-for-papers" className="inline-block text-primary-500 text-3xl animate-bounce">
            <i className="fas fa-arrow-down"></i>
          </a>
        </div>
      </section>

      {/* Sections with bg2 */}
      <div className="relative w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${bgImg2})` }}
        ></div>

        {/* Optional gradient overlay for blending with dark footer */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-dark-900 to-transparent pointer-events-none z-0"></div>

        <div className="relative z-10">
          {/* Call for Papers Section */}
          <section id="call-for-papers" className="w-full py-20 px-6 md:px-12">
            <ResearchFields />
          </section>

          {/* Gallery Section */}
          <Gallery />

          {/* Organized By Section */}
          <OrganizerSection />
        </div>
      </div>

      {/* Event Venue Section */}
      <section id="venue" className="w-full py-16 px-6 md:px-12 bg-dark-900">
        <div className="container mx-auto">
          <SectionHeader headerText="Event Venue" />

          <h3 className="text-3xl font-bold text-center para text-primary-500 mt-12 mb-8">
            University Of Moratuwa
          </h3>

          <h3 className="text-lg para text-center text-gray-300 mb-12">
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
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>MERCon 2026 - Home</title>;
