import React from "react";
import { Link } from "gatsby";
import { timelineEvents } from "../../pages/important-dates";
import SectionHeader from "../sectionHeader";

interface TimelineEventWithParsed {
  id: number;
  title: string;
  date: string;
  parsedDate: Date | null;
  isPast: boolean;
}

const crossedOutEventTitles = new Set(["Paper Submission Deadline"]);

const UpcomingTimeline: React.FC = () => {
  const now = new Date();

  // Parse dates from various formats
  const parseDate = (dateStr: string): Date | null => {
    const cleanDate = dateStr.replace(/(st|nd|rd|th)/g, "").replace(/,/g, "");
    const parts = cleanDate.split(" ").filter((p) => p.trim());

    // Month-year format: "February 2026"
    if (parts.length === 2 && isNaN(parseInt(parts[0]))) {
      return new Date(`${parts[0]} 1, ${parts[1]}`);
    }

    // Day-month-year format: "20th April 2026"
    if (parts.length === 3 && !isNaN(parseInt(parts[0]))) {
      return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
    }

    // Month-day(s)-year format: "August 13 14 2026"
    if (parts.length >= 3 && isNaN(parseInt(parts[0]))) {
      return new Date(`${parts[0]} ${parts[1]}, ${parts[parts.length - 1]}`);
    }

    return new Date(dateStr);
  };

  // Process all events
  const processedEvents: TimelineEventWithParsed[] = timelineEvents
    .map((event) => ({
      ...event,
      parsedDate: parseDate(event.date),
      isPast: parseDate(event.date) ? parseDate(event.date)! < now : false,
    }))
    .sort((a, b) => (a.parsedDate?.getTime() || 0) - (b.parsedDate?.getTime() || 0));

  // Get the last passed event and next 3 upcoming events
  const pastEvents = processedEvents.filter((e) => e.isPast);
  const upcomingEvents = processedEvents.filter((e) => !e.isPast);

  const lastPastEvent = pastEvents.length > 0 ? pastEvents[pastEvents.length - 1] : null;
  const nextThreeEvents = upcomingEvents.slice(0, 3);

  const displayEvents = lastPastEvent ? [lastPastEvent, ...nextThreeEvents] : nextThreeEvents;

  return (
    <section className="w-full py-16 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader headerText="Upcoming Dates" />

        <div className="mt-10 relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-linear-to-b from-gray-600 via-green-500 to-green-500/30 hidden sm:block" />

          <div className="space-y-0">
            {displayEvents.map((event, index) => {
              const isLast = index === displayEvents.length - 1;
              const isPastEvent = event.isPast;

              return (
                <div key={event.id} className="relative flex items-stretch group">
                  {/* Timeline Node */}
                  <div className="shrink-0 w-12 flex flex-col items-center z-10">
                    {/* Dot */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isPastEvent
                          ? "bg-gray-600 border-gray-500"
                          : "bg-linear-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/40 group-hover:scale-125"
                      }`}
                    />
                    {/* Connector Line Segment */}
                    {!isLast && (
                      <div
                        className={`w-0.5 flex-1 min-h-[60px] ${
                          isPastEvent ? "bg-gray-600" : "bg-linear-to-b from-green-500 to-green-500/50"
                        }`}
                      />
                    )}
                  </div>

                  {/* Event Card */}
                  <div className="flex-1 pb-6">
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 ${
                        isPastEvent
                          ? "bg-gray-800/30 border-gray-700/50 opacity-70"
                          : "bg-linear-to-r from-green-600/10 to-emerald-600/5 border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {isPastEvent && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-700 text-gray-400 rounded">
                              Completed
                            </span>
                          )}
                          {!isPastEvent && index === (lastPastEvent ? 1 : 0) && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded animate-pulse">
                              Next
                            </span>
                          )}
                          <h4
                            className={`text-lg font-semibold ${isPastEvent ? "text-gray-400" : "text-white"} ${
                              crossedOutEventTitles.has(event.title)
                                ? "line-through decoration-red-400 decoration-2"
                                : ""
                            }`}
                          >
                            {event.title}
                          </h4>
                        </div>

                        <div
                          className={`flex items-center gap-2 font-medium text-sm ${
                            isPastEvent ? "text-gray-500" : "text-green-400"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="whitespace-nowrap">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Link */}
          <div className="mt-6 flex justify-center relative z-10">
            <Link
              to="/important-dates"
              className="group flex items-center gap-3 px-6 py-3 bg-linear-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full text-green-400 font-semibold hover:from-green-600/30 hover:to-emerald-600/30 hover:border-green-500/50 transition-all duration-300"
            >
              <span>View All Important Dates</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTimeline;
