import React from "react";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Paper Submission Open",
    date: "January 2026",
  },
  {
    id: 2,
    title: "Paper Submission Deadline",
    date: "20th April 2026",
  },
  {
    id: 3,
    title: "Notification of Acceptance",
    date: "8th June 2026",
  },
  {
    id: 4,
    title: "Camera Ready Paper Deadline & Early Registration Date",
    date: "22nd June 2026",
  },
  {
    id: 5,
    title: "Earlybird Registration",
    date: "15th July 2026",
  },
  {
    id: 6,
    title: "Conference Dates",
    date: "August 13, 14th 2026",
  },
];

const ImportantDatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto pt-30">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
            Important Dates
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Mark your calendar with these key dates for MERCon 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500/50 via-emerald-500/50 to-green-500/50 hidden md:block"></div>

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
                    <div className="group relative bg-gradient-to-br from-green-600/10 to-emerald-600/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-105">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-xl transition-all duration-300"></div>

                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.title}</h3>
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
                      <div className="relative w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-4 border-gray-950 shadow-lg"></div>
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
