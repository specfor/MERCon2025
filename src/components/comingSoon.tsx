import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  targetDate?: string;
  description?: string;
  showCountdown?: boolean;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  subtitle = "Something exciting is on the way",
  targetDate,
  description = "We're working hard to bring you something amazing. Stay tuned!",
  showCountdown = true,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!targetDate || !showCountdown) return;

    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, showCountdown]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-600/15 to-emerald-600/10 backdrop-blur-sm border border-green-500/25 rounded-2xl p-6 md:p-8 min-w-[100px] md:min-w-[120px] shadow-xl hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-6xl font-bold text-white mb-2 tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <div className={`relative w-full min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                   linear-gradient(to right, rgba(34, 197, 94, 0.08) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(34, 197, 94, 0.08) 1px, transparent 1px)
                 `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 py-12 text-center ${mounted ? "animate-fadeIn" : "opacity-0"}`}
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/25 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-full shadow-2xl">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent animate-slideDown">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slideDown delay-200">{subtitle}</p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-slideDown delay-300">
          {description}
        </p>

        {/* Countdown Timer */}
        {showCountdown && targetDate && (
          <div className="mb-12 animate-slideUp">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        )}

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-green-500"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-500"></div>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-green-500"></div>
        </div>
      </div>

      {/* Add custom animations to the page */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
