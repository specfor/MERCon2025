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
          <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent flex-1"></div>
          <div className="flex flex-col items-center gap-2 px-4">
            {Array.isArray(level.levelName) ? (
              level.levelName.map((name, idx) => (
                <h2
                  key={idx}
                  className="text-2xl md:text-3xl font-bold text-white uppercase topic tracking-widest text-center"
                >
                  {name}
                </h2>
              ))
            ) : (
              <h2 className="text-2xl md:text-3xl font-bold topic text-white uppercase tracking-widest text-center">
                {level.levelName}
              </h2>
            )}
          </div>
          <div className="h-px bg-gradient-to-l from-transparent via-green-500/50 to-transparent flex-1"></div>
        </div>

        {/* We use CSS grid to ensure items align vertically across rows.
            The dynamic grid-cols classes ensure that if there are 1, 2, or 3 people,
            the grid is sized exactly to fit them, keeping them centered on screen.
        */}
        <div
          className={`grid gap-x-8 md:gap-x-16 lg:gap-x-28 gap-y-16 justify-items-center items-start mx-auto w-fit ${
            level.speakers.length === 1
              ? "grid-cols-1"
              : level.speakers.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : level.speakers.length === 3
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {level.speakers.map((speaker) => (
            <div key={speaker.name} className="flex justify-center w-full max-w-[350px]">
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SpeakerRankGraph;
