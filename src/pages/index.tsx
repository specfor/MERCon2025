import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Gallery from "../components/homepage/gallery";
import OrganizerSection from "../components/homepage/organizer";
import SectionHeader from "../components/sectionHeader";
import UniGallery from "../components/homepage/uniGallery";
import ResearchFields from "../components/homepage/fields";
import UpcomingTimeline from "../components/homepage/upcomingTimeline";

const heroBackground = (
  <div className="absolute inset-0 -z-10">
    <StaticImage
      src="../images/bg1.png"
      alt="Hero Background"
      className="w-full h-full object-cover"
      quality={90}
      formats={["auto", "webp", "avif"]}
      placeholder="blurred"
      loading="eager"
    />
  </div>
);

const homeBackground = (
  <div className="absolute inset-0 -z-20">
    <StaticImage
      src="../images/bg2.jpg"
      alt="Hero Background"
      className="w-full h-full object-cover"
      quality={90}
      formats={["auto", "webp", "avif"]}
      placeholder="blurred"
      loading="eager"
    />
  </div>
);

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {heroBackground}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-[40vh] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgb(0,0,0), transparent)" }}
        />

        {/* HERO CONTENT */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-6 md:px-12">
          <div className="mb-10 pt-10">
            <StaticImage
              src="../images/logo2026.png"
              alt="MERCon 2026 Logo"
              className="w-full max-w-64 md:max-w-[400px] lg:max-w-[600px] h-auto mx-auto"
            />
          </div>

          <h3 className="px-5 text-xl font-normal leading-relaxed max-w-3xl text-gray-200 mt-4 mb-12">
            Moratuwa Engineering Research Conference 2026 (MERCon 2026) is the 12<sup>th</sup> international conference
            organized by the Engineering Research Unit, University of Moratuwa.
          </h3>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl text-white font-semibold">
              13<sup className="">th</sup> & 14<sup className="">th</sup> August 2026
            </div>

            <div className="px-6 py-4 bg-primary-500/10 border border-primary-500 rounded-4xl text-white font-semibold">
              University of Moratuwa
            </div>
          </div>

          <a href="#call-for-papers" className="text-primary-500 text-3xl animate-bounce">
            ↓
          </a>
        </div>
      </section>

      {/* CONTENT SECTION WITH BG2 */}
      <div className="relative w-full">
        {/* Background */}
        {homeBackground}

        {/* Top gradient */}
        <div
          className="absolute top-0 left-0 w-full h-[40vh] z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgb(0,0,0), transparent)" }}
        />

        <div className="relative z-20">
          <section id="call-for-papers" className="w-full py-20 px-6 md:px-12">
            <ResearchFields />
          </section>

          <UpcomingTimeline />

          <Gallery />
          <OrganizerSection />
        </div>
      </div>

      {/* VENUE */}
      <section id="venue" className="w-full py-16 px-6 md:px-12 bg-dark-900">
        <div className="container mx-auto">
          <SectionHeader headerText="Event Venue" />
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
