import React from "react";
import SpeakerCard, { Speaker } from "./speakerCard";

export interface SpeakerLevel {
  levelName: string | string[]; // e.g. "Keynote Speakers", "Plenary Speakers"
  rank: number; // For sorting if needed
  speakers: Speaker[];
}

const SpeakerRankGraph: React.FC<{ speakerLevels: SpeakerLevel[] }> = ({ speakerLevels }) => (
  <div className="flex flex-col gap-20">
    {speakerLevels.map((level, index) => (
      <div key={index} className="w-full">
        {/* Level Header (with lines on side) */}
        <div className="flex items-center gap-4 mb-12 font-sans">
          <div className="h-px bg-gray-200 flex-1"></div>
          <div className="flex flex-col items-center gap-2 px-4">
            {Array.isArray(level.levelName) ? (
              level.levelName.map((name, idx) => (
                <h2
                  key={idx}
                  className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-widest text-center"
                >
                  {name}
                </h2>
              ))
            ) : (
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-widest text-center">
                {level.levelName}
              </h2>
            )}
          </div>
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
