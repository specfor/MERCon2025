import React from "react";
import { Link } from "gatsby";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";

export interface Workshop {
  topic: string;
  date?: string;
  icon?: React.ReactNode;
  color?: string;
  detailsLink?: string;
}

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const bgColor = workshop.color || "bg-primary-500/20";

  return (
    <div className="group relative para flex flex-col items-center w-full md:w-auto">
      {/* Modern Card Container */}
      <div className="relative w-full md:w-80 overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-primary-500/20 group-hover:-translate-y-2">
        {/* Gradient Background */}
        <div className={`absolute inset-0 ${bgColor} opacity-10`} />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-sm" />

        {/* Animated Border Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl border-2 border-primary-500/50 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-center text-center">
          {/* Icon with Glow Effect */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500">
              <div className="w-32 h-32 bg-primary-500/40 rounded-full" />
            </div>
            <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              {workshop.icon || <BookOpen size={100} className="text-primary-500" />}
            </div>
          </div>

          {/* Topic Title */}
          <h3 className="text-2xl font-bold text-white mb-4 para transition-colors group-hover:text-primary-400">
            {workshop.topic}
          </h3>

          {/* Date Badge */}
          {workshop.date && (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-primary-500/30 text-primary-400 font-medium text-sm backdrop-blur-sm">
              <Calendar size={14} />
              <span className="uppercase tracking-wide">{workshop.date}</span>
            </div>
          )}

          {/* Decorative Bottom Line */}
          <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full opacity-50 group-hover:w-24 group-hover:opacity-100 transition-all duration-500" />

          {/* More Details Button */}
          {workshop.detailsLink && (
            <Link
              to={workshop.detailsLink}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 text-xs bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-primary-500/50"
            >
              <span className="para">More Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
