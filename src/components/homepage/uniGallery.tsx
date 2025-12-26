import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../sectionHeader";

// Reusable Tile Component Wrapper to handle styles and hover effects
const GridTile: React.FC<{
  children: React.ReactNode;
  title: string;
  category?: string;
  className?: string; // For grid spans (col-span-2, etc)
}> = ({ children, title, category, className = "" }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10 ${className}`}
  >
    {/* Image Container - handling zoom on hover */}
    <div className="h-full w-full transition-transform duration-700 ease-in-out group-hover:scale-110">{children}</div>

    {/* Gradient Overlay - darker at bottom for text readability */}
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

    {/* Text Content - slides up slightly on hover */}
    <div className="absolute bottom-0 left-0 p-6 translate-y-2 transform transition-transform duration-300 group-hover:translate-y-0">
      {category && (
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-primary-500 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
          {category}
        </span>
      )}
      <h3 className="text-xl font-bold text-white font-sans">{title}</h3>
    </div>
  </div>
);

const UniGallery = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <SectionHeader headerText="Explore the Campus" />
          <p className="text-white/80 para text-lg">
            A look inside our world-class facilities designed for innovation and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          <GridTile title="The Main Atrium" category="Central Hub" className="md:col-span-2 md:row-span-2">
            <StaticImage
              src="../../images/uom/img1.jpg"
              alt="Main Atrium"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>

          <GridTile title="Library Tower" category="Study" className="md:col-span-1 md:row-span-2">
            <StaticImage
              src="../../images/uom/img5.jpg"
              alt="Library"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>

          <GridTile title="Coffee Lounge" category="Relax" className="md:col-span-1 md:row-span-1">
            <StaticImage
              src="../../images/uom/img3.jpg"
              alt="Coffee Shop"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>

          <GridTile title="Tech Lab" category="Innovation" className="md:col-span-1 md:row-span-1">
            <StaticImage
              src="../../images/uom/img4.jpg"
              alt="Tech Lab"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>

          <GridTile title="Conference Hall" category="Events" className="md:col-span-2 md:row-span-1">
            <StaticImage
              src="../../images/uom/img2.jpg"
              alt="Conference Hall"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>

          <GridTile title="Rooftop Garden" category="Outdoors" className="md:col-span-2 md:row-span-1">
            <StaticImage
              src="../../images/uom/img6.jpg"
              alt="Rooftop Garden"
              className="h-full w-full"
              objectFit="cover"
              placeholder="blurred"
            />
          </GridTile>
        </div>
      </div>
    </section>
  );
};

export default UniGallery;
