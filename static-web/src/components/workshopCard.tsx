import React from "react";
import { Link } from "gatsby";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";

export interface Workshop {
  topic: string;
  date?: string;
  icon?: React.ReactNode;
  banner?: React.ReactNode;
  color?: string;
  detailsLink?: string;
  registrationLink?: string;
}

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const bgColor = workshop.color || "bg-primary-500/20";

  return (
    <div className="group relative para flex flex-col items-center w-full md:w-1/2">
      {/* Modern Card Container */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-primary-500/20 group-hover:-translate-y-2 flex flex-col">
        {/* Gradient Background */}
        <div className={`absolute inset-0 ${bgColor} opacity-10`} />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-sm" />

        {/* Animated Border Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
          <div className="absolute inset-0 rounded-2xl border-2 border-primary-500/50 animate-pulse" />
        </div>

        {/* Banner */}
        {workshop.banner ? (
          <div className="relative w-full aspect-square overflow-hidden z-10 shrink-0">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
              {workshop.banner}
            </div>
          </div>
        ) : (
          <div className="relative p-12 flex flex-col items-center justify-center text-center z-10">
            {/* Icon with Glow Effect */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500">
                <div className="w-32 h-32 bg-primary-500/40 rounded-full" />
              </div>
              <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {workshop.icon || <BookOpen size={100} className="text-primary-500" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopCard;
