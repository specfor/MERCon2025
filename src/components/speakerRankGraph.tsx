import React from "react";
import SpeakerCard, { Speaker } from "./speakerCard";

export interface SpeakerLevel {
  levelName: string; // e.g. "Keynote Speakers", "Plenary Speakers"
  rank: number; // For sorting if needed
  speakers: Speaker[];
}

const SpeakerRankGraph: React.FC<{ speakerLevels: SpeakerLevel[] }> = ({ speakerLevels }) => (
  <div className="flex flex-col gap-20">
    {speakerLevels.map((level, index) => (
      <div key={index} className="w-full">
        {/* Level Header (with lines on side) */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-gray-200 flex-1"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-widest text-center px-4">
            {level.levelName}
          </h2>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Use Flexbox with justify-center. 
                  This ensures that if there is 1 person, they are centered.
                  If there are 2, they are side-by-side centered.
                  If there are 3+, they wrap nicely.
              */}
        <div className="flex flex-wrap gap-x-28 gap-y-16 justify-center items-start">
          {level.speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SpeakerRankGraph;
