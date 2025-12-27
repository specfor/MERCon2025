import React from "react";
import { Linkedin, Globe, MapPin } from "lucide-react";

export interface Speaker {
  name: string;
  university?: string;
  topic?: string;
  bio?: string;
  image: React.ReactNode; // Using ReactNode to handle StaticImage
  links?: {
    linkedin?: string;
    website?: string;
  };
}

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <div className="group relative flex flex-col items-center">
      {/* 1. Image Wrapper with "Curved Sector" Background */}
      <div className="relative w-64 h-64 mb-8">
        {/* The Decorative Curved Sector (Behind) */}
        {/* This creates the yellow organic shape offset behind the image */}
        <div className="absolute top-4 -right-4 w-full h-full bg-primary-500/20 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl transform rotate-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105 z-0" />

        {/* A second darker accent shape for depth */}
        <div className="absolute -bottom-2 -left-2 w-2/3 h-2/3 border-2 border-primary-500/30 rounded-full -z-10" />

        {/* The Actual Image Container */}
        <div className="relative w-full h-full overflow-hidden rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl shadow-xl z-10 bg-gray-200">
          {/* Image Hover Zoom Effect */}
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">{speaker.image}</div>

          {/* Overlay for social icons on hover */}
          {speaker.links && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
              {speaker.links.linkedin && (
                <a
                  href={speaker.links.linkedin}
                  className="p-2 bg-white rounded-full text-blue-700 hover:scale-110 transition-transform"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {speaker.links.website && (
                <a
                  href={speaker.links.website}
                  className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Content Info */}
      <div className="text-center px-4 max-w-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {speaker.name}
        </h3>

        {speaker.university && (
          <div className="flex items-center justify-center gap-2 text-primary-600 font-medium mb-3 text-sm">
            <span className="uppercase tracking-wide">{speaker.university}</span>
          </div>
        )}

        {/* Topic Badge */}
        {speaker.topic && (
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4 border border-gray-200">
            Keynote: {speaker.topic}
          </div>
        )}

        {speaker.bio && <p className="text-gray-500 leading-relaxed text-sm">{speaker.bio}</p>}
      </div>
    </div>
  );
};

export default SpeakerCard;
