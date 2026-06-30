import React from "react";
import { createPageHead } from "../components/pageHead";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Paper Submission Open",
    date: "March 2026",
  },
  {
    id: 2,
    title: "Paper Submission Deadline",
    date: "20th April 2026",
  },
  { id: 3, title: "Extended Paper Submission Deadline", date: "4th May 2026" },
  {
    id: 4,
    title: "Notification of Acceptance (extended due to large number of submissions)",
    date: "5th July 2026",
  },
  {
    id: 5,
    title: "Earlybird Registration Open",
    date: "29th June 2026",
  },
  {
    id: 6,
    title: "Camera Ready Paper Deadline",
    date: "6th July 2026",
  },
  {
    id: 7,
    title: "Earlybird Registration Deadline",
    date: "15th July 2026",
  },
  {
    id: 8,
    title: "Conference Dates",
    date: "August 13, 14th 2026",
  },
];

const crossedOutEventTitles = new Set(["Paper Submission Deadline"]);

const ImportantDatesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen py-16 px-4">
      {/* Fixed Green Background */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgb(14, 46, 32) 0%,
              rgb(8, 26, 18) 45%,
              rgb(2, 6, 4) 80%
            )
          `,
        }}
      />
      <div className="max-w-6xl mx-auto pt-30">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff, #f3f4f6, #e5e7eb)" }}
          >
            Important Dates
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Mark your calendar with these key dates for MERCon 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden md:block"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(34,197,94,0.5), rgba(16,185,129,0.5), rgba(34,197,94,0.5))",
            }}
          ></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className={`relative flex items-center ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} flex-col`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                    <div
                      className="group relative backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundImage: "linear-gradient(to bottom right, rgba(22,163,74,0.1), rgba(16,185,129,0.05))",
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div
                        className="absolute inset-0 rounded-xl transition-all duration-300"
                        style={{
                          backgroundImage: "linear-gradient(to bottom right, rgba(34,197,94,0), rgba(16,185,129,0))",
                        }}
                      ></div>

                      <div className="relative z-10">
                        <h3
                          className={`text-xl md:text-2xl font-bold text-white mb-2 ${
                            crossedOutEventTitles.has(event.title) ? "line-through decoration-red-400 decoration-2" : ""
                          }`}
                        >
                          {event.title}
                        </h3>
                        <div
                          className={`flex items-center gap-2 text-green-400 font-semibold ${
                            isLeft ? "justify-start md:justify-end" : "justify-start"
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <div className="relative">
                      {/* Outer glow */}
                      <div className="absolute inset-0 bg-green-500/30 blur-xl rounded-full animate-pulse"></div>
                      {/* Dot */}
                      <div
                        className="relative w-6 h-6 rounded-full border-4 border-gray-950 shadow-lg"
                        style={{ backgroundImage: "linear-gradient(to bottom right, #22c55e, #059669)" }}
                      ></div>
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-full md:w-5/12 md:block hidden"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantDatesPage;

export const Head = createPageHead({
  title: "Important Dates - MERCon 2026",
  description:
    "Key MERCon 2026 deadlines including submission, acceptance, camera-ready, registration, and conference dates.",
});
